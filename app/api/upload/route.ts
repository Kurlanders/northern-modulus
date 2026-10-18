import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { MAX_FILE_BYTES } from '@/lib/enquiry'
import { isValidUploadPath } from '@/lib/file-links'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody

    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isValidUploadPath(pathname)) {
          throw new Error('This file type is not allowed.')
        }
        return {
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: false,
          allowOverwrite: false,
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
