import { issueSignedToken } from '@vercel/blob'
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { MAX_FILE_BYTES } from '@/lib/enquiry'
import { isValidUploadPath } from '@/lib/file-links'

// How long the browser has to start the upload after asking for a presigned URL.
const UPLOAD_URL_TTL_MS = 30 * 60 * 1000

// Presigned uploads authenticate with BLOB_STORE_ID + Vercel OIDC, so no BLOB_READ_WRITE_TOKEN is needed.
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadPresignedBody

    const json = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, _clientPayload, multipart) => {
        if (multipart) {
          throw new Error('Multipart uploads are not supported.')
        }
        if (!isValidUploadPath(pathname)) {
          throw new Error('This file type is not allowed.')
        }
        const validUntil = Date.now() + UPLOAD_URL_TTL_MS
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          validUntil,
          maximumSizeInBytes: MAX_FILE_BYTES,
        })
        return {
          token,
          urlOptions: {
            validUntil,
            maximumSizeInBytes: MAX_FILE_BYTES,
            addRandomSuffix: false,
            allowOverwrite: false,
          },
        }
      },
    })

    return NextResponse.json(json)
  } catch (err) {
    console.error('Upload URL error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 400 }
    )
  }
}
