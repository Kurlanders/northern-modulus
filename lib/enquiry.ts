export const SERVICE_AREAS = [
  'Custom 3D print',
  'Jig / fixture / tooling',
  'Mould',
  'Shop product',
  'Other',
] as const

export const MATERIALS = ['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'PC', 'Not sure'] as const

export const MAX_FILES = 5
export const MAX_FILE_BYTES = 50 * 1024 * 1024
export const ALLOWED_EXTENSIONS = [
  'stl', 'step', 'stp', '3mf', 'obj', 'dxf', 'dwg', 'pdf', 'zip', 'jpg', 'png',
] as const

export const UPLOAD_PREFIX = 'enquiries/'

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}

export function isAllowedFileName(name: string): boolean {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(name))
}
