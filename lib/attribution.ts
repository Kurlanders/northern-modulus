const STORAGE_KEY = 'nm_attribution'

export interface Attribution {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  referrer: string
}

const EMPTY: Attribution = { utmSource: '', utmMedium: '', utmCampaign: '', referrer: '' }

// Stores the first landing's campaign data once per browser session; later pages never overwrite it.
export function captureAttribution(): void {
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const attribution: Attribution = {
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      referrer: document.referrer,
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // sessionStorage can be unavailable (private mode, blocked storage); attribution is optional.
  }
}

export function readAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}
