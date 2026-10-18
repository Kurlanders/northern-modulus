import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { MAX_FILE_BYTES, UPLOAD_PREFIX, isAllowedFileName } from '@/lib/enquiry'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody

    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(UPLOAD_PREFIX) || pathname.includes('..') || !isAllowedFileName(pathname)) {
          throw new Error('This file type is not allowed.')
        }
        return {
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
        }
      },
    })

    return NextResponse.json(json)
  } catch (err) {
    console.error('Upload token error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 400 }
    )
  }
}
