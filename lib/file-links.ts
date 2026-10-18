import { createHmac, timingSafeEqual } from 'node:crypto'
import { UPLOAD_PREFIX, isAllowedFileName } from '@/lib/enquiry'

export const FILE_LINK_TTL_DAYS = 30

// enquiries/<uuid>/<file name>: one random folder per upload, original name kept.
const PATH_PATTERN = new RegExp(
  `^${UPLOAD_PREFIX}[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[^/\\\\\\u0000-\\u001f\\u007f]{1,150}$`
)

export function isValidUploadPath(path: string): boolean {
  return PATH_PATTERN.test(path) && isAllowedFileName(path)
}

export function fileNameFromPath(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}

function getSecret(): string {
  const secret = process.env.FILE_LINK_SECRET
  if (!secret) throw new Error('FILE_LINK_SECRET is not set')
  return secret
}

function sign(path: string, exp: number): string {
  return createHmac('sha256', getSecret()).update(`${path}\n${exp}`).digest('hex')
}

export function createSignedFileUrl(baseUrl: string, path: string, now: number = Date.now()): string {
  const exp = Math.floor(now / 1000) + FILE_LINK_TTL_DAYS * 24 * 60 * 60
  const params = new URLSearchParams({ path, exp: String(exp), sig: sign(path, exp) })
  return `${baseUrl}/api/files?${params.toString()}`
}

export function verifyFileSignature(path: string, expRaw: string, sig: string): boolean {
  if (!/^\d{1,12}$/.test(expRaw) || !/^[0-9a-f]{64}$/.test(sig)) return false
  const exp = Number(expRaw)
  if (exp <= Math.floor(Date.now() / 1000)) return false
  const expected = Buffer.from(sign(path, exp), 'hex')
  const given = Buffer.from(sig, 'hex')
  return expected.length === given.length && timingSafeEqual(expected, given)
}
