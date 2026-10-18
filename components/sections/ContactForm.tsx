'use client'

import { useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import Button from '@/components/ui/Button'
import { readAttribution } from '@/lib/attribution'
import { company } from '@/lib/company'
import {
  SERVICE_AREAS,
  MATERIALS,
  MAX_FILES,
  MAX_FILE_BYTES,
  ALLOWED_EXTENSIONS,
  UPLOAD_PREFIX,
  isAllowedFileName,
} from '@/lib/enquiry'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface UploadItem {
  id: string
  name: string
  size: number
  progress: number
  state: 'uploading' | 'done' | 'error'
  path?: string
  error?: string
  controller: AbortController
}

const inputClass =
  'w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200'
const labelClass = 'block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2'
const optionalTag = <span className="text-nm-text-t font-normal normal-case tracking-normal">(optional)</span>

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

// Keeps the original name for the download, minus path separators and control characters.
function safeFileName(name: string): string {
  // eslint-disable-next-line no-control-regex
  return name.replace(/[/\\\u0000-\u001f\u007f]+/g, '_').slice(-150)
}

export default function ContactForm({ product }: { product?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [serviceArea, setServiceArea] = useState<string>(product ? 'Shop product' : '')
  const [fileLink, setFileLink] = useState('')
  const [filesSubmitted, setFilesSubmitted] = useState(false)
  const [fileLinkError, setFileLinkError] = useState('')
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateUpload = (id: string, patch: Partial<UploadItem>) =>
    setUploads((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  async function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return
    setUploadError('')
    const files = Array.from(fileList)

    if (uploads.length + files.length > MAX_FILES) {
      setUploadError(`You can attach up to ${MAX_FILES} files.`)
      return
    }
    const invalidType = files.find((f) => !isAllowedFileName(f.name))
    if (invalidType) {
      setUploadError(`"${invalidType.name}" is not an accepted file type.`)
      return
    }
    const tooLarge = files.find((f) => f.size > MAX_FILE_BYTES)
    if (tooLarge) {
      setUploadError(`"${tooLarge.name}" is larger than ${MAX_FILE_BYTES / (1024 * 1024)} MB.`)
      return
    }

    if (fileInputRef.current) fileInputRef.current.value = ''

    let uploadPresigned: typeof import('@vercel/blob/client').uploadPresigned
    try {
      ;({ uploadPresigned } = await import('@vercel/blob/client'))
    } catch {
      setUploadError('File upload could not start. Please try again or paste a file link instead.')
      return
    }

    for (const file of files) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const controller = new AbortController()
      setUploads((items) => [
        ...items,
        { id, name: file.name, size: file.size, progress: 0, state: 'uploading', controller },
      ])

      uploadPresigned(`${UPLOAD_PREFIX}${crypto.randomUUID()}/${safeFileName(file.name)}`, file, {
        access: 'private',
        handleUploadUrl: '/api/upload',
        abortSignal: controller.signal,
        onUploadProgress: ({ percentage }) => updateUpload(id, { progress: Math.round(percentage) }),
      })
        .then((blob) => updateUpload(id, { state: 'done', progress: 100, path: blob.pathname }))
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          console.error('Upload failed:', err)
          updateUpload(id, { state: 'error', error: 'Upload failed. Remove it and try again, or paste a file link below.' })
        })
    }
  }

  function removeUpload(id: string) {
    uploads.find((item) => item.id === id)?.controller.abort()
    setUploads((items) => items.filter((item) => item.id !== id))
  }

  const uploading = uploads.some((u) => u.state === 'uploading')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (uploading) {
      setUploadError('Please wait for your files to finish uploading.')
      return
    }
    if (fileLink.trim()) {
      try {
        new URL(fileLink.trim())
        setFileLinkError('')
      } catch {
        setFileLinkError('Please enter a valid file-sharing link.')
        return
      }
    }

    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)
    const attribution = readAttribution()
    const filePaths = uploads.filter((u) => u.state === 'done' && u.path).map((u) => u.path as string)

    const payload = {
      name:        data.get('name') as string,
      company:     data.get('company') as string,
      email:       data.get('email') as string,
      phone:       data.get('phone') as string,
      serviceArea: serviceArea,
      help:        data.get('help') as string,
      description: data.get('description') as string,
      challenge:   data.get('challenge') as string,
      quantity:    data.get('quantity') as string,
      material:    data.get('material') as string,
      timeline:    data.get('timeline') as string,
      fileLink:    fileLink.trim() || '',
      filePaths,
      referral:    data.get('referral') as string,
      product:     product ?? '',
      utmSource:   attribution.utmSource,
      utmMedium:   attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      referrer:    attribution.referrer,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json().catch(() => null)

      if (res.status === 400 && json?.error) {
        setErrorMessage(json.error)
        setStatus('error')
        return
      }

      if (!res.ok || json?.success !== true) {
        setErrorMessage('')
        setStatus('error')
        return
      }

      track('quote_submitted', { serviceArea: serviceArea || 'none' })
      setFilesSubmitted(!!fileLink.trim() || filePaths.length > 0)
      setStatus('success')
      form.reset()
      setServiceArea(product ? 'Shop product' : '')
      setFileLink('')
      setUploads([])
    } catch {
      setErrorMessage('')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-16 flex flex-col items-start gap-5">
        <div className="w-12 h-12 rounded-full bg-nm-green-deep border border-nm-green-mid flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10L8 14L16 6" stroke="#4D8F6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-3">
            Message sent.
          </h2>
          <p className="text-body-md text-nm-text-s leading-relaxed max-w-[46ch]">
            We have received your enquiry and will respond within one business day.
            Check your inbox — including spam — for our reply.
          </p>
        </div>
        {filesSubmitted ? (
          <div className="p-5 bg-nm-s1 border border-nm-border-mid rounded-sm2 max-w-[46ch]">
            <p className="text-body-sm text-nm-text-s leading-relaxed">
              Your enquiry has been sent successfully. Your files were included with the submission.
            </p>
          </div>
        ) : (
          <div className="p-5 bg-nm-s1 border border-nm-border-mid rounded-sm2 space-y-3 max-w-[46ch]">
            <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em]">
              Next step
            </p>
            <p className="text-body-sm text-nm-text-s leading-relaxed">
              If needed, you can still email your files to{' '}
              <a href={`mailto:${company.email}`} className="text-nm-green-text hover:text-nm-green-bright transition-colors duration-200">
                {company.email}
              </a>
            </p>
          </div>
        )}
        <button
          onClick={() => setStatus('idle')}
          className="font-mono text-label-md uppercase tracking-[0.12em] text-nm-text-t hover:text-nm-text-s transition-colors duration-200 mt-2"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Project enquiry form">

      {/* Contact details */}
      <fieldset className="space-y-5">
        <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
          Contact Details
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-nm-green-text">*</span>
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company {optionalTag}
            </label>
            <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company name" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-nm-green-text">*</span>
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone {optionalTag}
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+371 2X XXX XXX" className={inputClass} />
          </div>
        </div>
      </fieldset>

      <div className="h-px bg-nm-border" aria-hidden="true" />

      {/* Project details */}
      <fieldset className="space-y-5">
        <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
          Project Details
        </legend>

        <div>
          <p className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-3">
            What are you enquiring about?
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service area">
            {SERVICE_AREAS.map((area) => (
              <button
                key={area}
                type="button"
                aria-pressed={serviceArea === area}
                onClick={() => setServiceArea(area === serviceArea ? '' : area)}
                className={`px-3.5 py-2 rounded-sm2 text-body-sm border transition-colors duration-200 ${
                  serviceArea === area
                    ? 'border-nm-green-accent bg-nm-green-deep text-nm-text-p'
                    : 'border-nm-border bg-nm-s1 text-nm-text-s hover:border-nm-border-mid hover:bg-nm-s2'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="help" className={labelClass}>
            What do you need? {optionalTag}
          </label>
          <input id="help" name="help" type="text" placeholder="e.g. 50 prototype brackets in PETG, functional test parts" className={inputClass} />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Project Description <span className="text-nm-green-text">*</span>
          </label>
          <textarea
            id="description" name="description" required rows={5}
            placeholder="Describe the part, application, material preferences, quantity, and any dimensional or finish requirements."
            className={`${inputClass} resize-y min-h-[120px]`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="quantity" className={labelClass}>
              Quantity {optionalTag}
            </label>
            <input id="quantity" name="quantity" type="number" min={1} max={999999} step={1} inputMode="numeric" placeholder="e.g. 10" className={inputClass} />
          </div>
          <div>
            <label htmlFor="material" className={labelClass}>
              Material {optionalTag}
            </label>
            <select id="material" name="material" defaultValue="" className={inputClass}>
              <option value="">Select a material</option>
              {MATERIALS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="challenge" className={labelClass}>
            Current Challenge or Goal {optionalTag}
          </label>
          <textarea
            id="challenge" name="challenge" rows={3}
            placeholder="What problem are you solving, or what does success look like?"
            className={`${inputClass} resize-y min-h-[90px]`}
          />
        </div>
      </fieldset>

      <div className="h-px bg-nm-border" aria-hidden="true" />

      <div>
        <label htmlFor="timeline" className={labelClass}>
          Timeline {optionalTag}
        </label>
        <input id="timeline" name="timeline" type="text" placeholder="e.g. Required within 3 weeks" className={inputClass} />
      </div>

      <div className="h-px bg-nm-border" aria-hidden="true" />

      {/* Files */}
      <div className="space-y-4">
        <p className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em]">
          Files {optionalTag}
        </p>

        <div>
          <input
            ref={fileInputRef}
            id="files"
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
            onChange={(e) => handleFilesSelected(e.target.files)}
            disabled={uploads.length >= MAX_FILES}
            className="sr-only"
          />
          <label
            htmlFor="files"
            className={`flex flex-col items-center justify-center gap-1.5 px-6 py-7 border border-dashed rounded-sm2 text-center transition-colors duration-200 ${
              uploads.length >= MAX_FILES
                ? 'border-nm-border text-nm-text-t cursor-not-allowed'
                : 'border-nm-border-mid bg-nm-s1 text-nm-text-s hover:border-nm-green-accent cursor-pointer'
            }`}
          >
            <span className="text-body-md text-nm-text-p">
              {uploads.length >= MAX_FILES ? `Maximum of ${MAX_FILES} files reached` : 'Choose files to upload'}
            </span>
            <span className="text-body-sm text-nm-text-t">
              Up to {MAX_FILES} files, {MAX_FILE_BYTES / (1024 * 1024)} MB each — {ALLOWED_EXTENSIONS.map((e) => e.toUpperCase()).join(', ')}
            </span>
          </label>
          {uploadError && <p className="mt-1.5 text-body-sm text-red-400">{uploadError}</p>}
        </div>

        {uploads.length > 0 && (
          <ul className="space-y-2" aria-label="Attached files">
            {uploads.map((u) => (
              <li key={u.id} className="p-3.5 bg-nm-s1 border border-nm-border rounded-sm2">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-body-sm text-nm-text-p truncate">{u.name}</p>
                    <p className={`text-[12px] ${u.state === 'error' ? 'text-red-400' : 'text-nm-text-t'}`}>
                      {formatSize(u.size)} ·{' '}
                      {u.state === 'uploading' ? `Uploading ${u.progress}%` : u.state === 'done' ? 'Uploaded' : u.error}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeUpload(u.id)}
                    className="flex-shrink-0 text-[12px] text-nm-text-t hover:text-nm-text-p transition-colors duration-200"
                    aria-label={`Remove ${u.name}`}
                  >
                    Remove
                  </button>
                </div>
                {u.state === 'uploading' && (
                  <div className="mt-2.5 h-1 bg-nm-s2 overflow-hidden" role="progressbar" aria-valuenow={u.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${u.name} upload progress`}>
                    <div className="h-full bg-nm-green-text transition-[width] duration-200" style={{ width: `${u.progress}%` }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div>
          <label htmlFor="fileLink" className={labelClass}>
            Or paste a file link {optionalTag}
          </label>
          <input
            id="fileLink"
            name="fileLink"
            type="url"
            value={fileLink}
            onChange={(e) => { setFileLink(e.target.value); setFileLinkError('') }}
            placeholder="https://..."
            className={`${inputClass} ${fileLinkError ? '!border-red-700 focus:!border-red-600' : ''}`}
          />
          {fileLinkError ? (
            <p className="mt-1.5 text-body-sm text-red-400">{fileLinkError}</p>
          ) : (
            <p className="mt-1.5 text-body-sm text-nm-text-t">
              For larger files or folders, paste a Google Drive, WeTransfer, Dropbox, OneDrive, or similar link.
            </p>
          )}
        </div>

        <div className="p-5 bg-nm-s1 border border-nm-border-mid rounded-sm2 space-y-3">
          <p className="text-body-sm text-nm-text-s leading-relaxed">
            Upload files directly above, or share a link if they are larger than{' '}
            {MAX_FILE_BYTES / (1024 * 1024)} MB. You can also email them to{' '}
            <a href={`mailto:${company.email}`} className="text-nm-green-text hover:text-nm-green-bright transition-colors duration-200">
              {company.email}
            </a>{' '}
            after submitting.
          </p>
          <p className="text-body-sm text-nm-text-t leading-relaxed border-t border-nm-border pt-3">
            Uploaded files are stored privately, are only accessible to Northern Modulus, and are
            used only for quote evaluation.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="referral" className={labelClass}>
          How Did You Hear About Us? {optionalTag}
        </label>
        <input id="referral" name="referral" type="text" placeholder="Referral, search, Instagram, trade event…" className={inputClass} />
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-sm2">
          <p className="text-body-sm text-red-400">
            {errorMessage || (
              <>
                Something went wrong — please email{' '}
                <a href={`mailto:${company.email}`} className="underline hover:text-red-300">
                  {company.email}
                </a>{' '}
                directly.
              </>
            )}
          </p>
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          withArrow
          disabled={status === 'loading' || uploading}
          className="w-full sm:w-auto justify-center"
        >
          {status === 'loading' ? 'Sending…' : uploading ? 'Uploading files…' : 'Send Enquiry'}
        </Button>
        <p className="mt-4 text-body-sm text-nm-text-t">
          We respond to all enquiries within one business day.
        </p>
      </div>
    </form>
  )
}
