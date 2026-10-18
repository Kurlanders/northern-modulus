import { get } from '@vercel/blob'
import { fileNameFromPath, isValidUploadPath, verifyFileSignature } from '@/lib/file-links'

export const dynamic = 'force-dynamic'

function contentDisposition(fileName: string): string {
  const asciiFallback = fileName.replace(/[^\x20-\x7e]|["\\]/g, '_')
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const path = params.get('path') ?? ''
  const exp = params.get('exp') ?? ''
  const sig = params.get('sig') ?? ''

  let valid = false
  try {
    valid = isValidUploadPath(path) && verifyFileSignature(path, exp, sig)
  } catch (err) {
    console.error('File link verification error:', err)
  }
  if (!valid) {
    return new Response('This download link is invalid or has expired.', { status: 403 })
  }

  try {
    const result = await get(path, { access: 'private' })
    if (!result || result.statusCode !== 200) {
      return new Response('File not found.', { status: 404 })
    }

    return new Response(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType || 'application/octet-stream',
        'Content-Length': String(result.blob.size),
        'Content-Disposition': contentDisposition(fileNameFromPath(path)),
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('File download error:', err)
    return new Response('File could not be retrieved.', { status: 502 })
  }
}
