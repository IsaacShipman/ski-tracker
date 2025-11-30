export type MountainKey = "big-white" | "sun-peaks" | "panorama" 

export interface WebcamEntry {
  id: string
  name: string
  url: string
  // When true, append a cache-busting timestamp to the URL when rendering
  cacheBust?: boolean
  // Optional: mark entries whose URL must be dynamically built at render time
  dynamic?: "panorama"
}

// Base URL for backend API that can resolve dynamic webcams (e.g., Big White)
// Configure via VITE_API_URL="http://localhost:8000" in .env if needed

export const WEBCAMS: Record<MountainKey, WebcamEntry[]> = {
  "big-white": [
    { id: "village", name: "The Village", url: "https://www.bigwhite.com/images/webcams/full/village.jpg", cacheBust: true },
    { id: "cliff", name: "The Cliff", url: "https://www.bigwhite.com/images/webcams/full/cliff.jpg", cacheBust: true },
    { id: "hwy33", name: "High Way 33", url: "https://www.bigwhite.com/images/webcams/full/hwy33.jpg", cacheBust: true },
    { id: "powpow", name: "Pow Cam", url: "https://www.bigwhite.com/images/webcams/full/powpow.jpg", cacheBust: true },
    { id: "happyvalley", name: "Happy Valley", url: "https://www.bigwhite.com/images/webcams/full/happyvalley.jpg", cacheBust: true },
    { id: "snowghost", name: "Snow Ghost", url: "https://www.bigwhite.com/images/webcams/full/snowghost.jpg", cacheBust: true },
    { id: "bulletchair", name: "Bullet Chair", url: "https://www.bigwhite.com/images/webcams/full/bullet.jpg", cacheBust: true },
    { id: "tubepark", name: "Tube Park", url: "https://www.bigwhite.com/images/webcams/full/tubepark.jpg", cacheBust: true },
    { id: "teluspark", name: "Telus Park", url: "https://www.bigwhite.com/images/webcams/full/teluspark.jpg", cacheBust: true },
    { id: "blackforest", name: "Black Forest", url: "https://www.bigwhite.com/images/webcams/full/blackforest.jpg", cacheBust: true },
    { id: "westridge", name: "West Ridge", url: "https://www.bigwhite.com/images/webcams/full/westridge.jpg", cacheBust: true },
  ],
  "sun-peaks": [
    { id: "village", name: "Village", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/sundance.jpg", cacheBust: true },
    { id: "mt-todd", name: "View of Mt Todd", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/view%20of%20mt%20todd.jpg", cacheBust: true },
    { id: "westbowl", name: "West Bowl", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/westbowl-totw.jpg", cacheBust: true },
    { id: "westbowl2", name: "West Bowl 2", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/westbowl.jpg", cacheBust: true },
    { id: "morrisey", name: "View of Morrisey", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/ele_view_of_morrisey.jpg", cacheBust: true },
    { id: "osv", name: "View of OSV", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/ele_view_of_OSV.jpg", cacheBust: true },
    { id: "valley", name: "Valley", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/Valley.jpg", cacheBust: true },
    { id: "village-day-lodge", name: "Village Day Lodge Slopeside", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/Village%20Day%20Lodge%20Slopeside.jpg", cacheBust: true },
    { id: "village-clock-tower", name: "Village Clock Tower", url: "https://www.sunpeaksresort.com/sites/default/files/spr_website_data/webcams/Village%20Clock%20Tower.jpg", cacheBust: true },

  ],
  panorama: [
    // For Panorama, store the base (without _YYYYMMDD_HHMM.jpg) and mark dynamic
    { id: "main", name: "Summit Cam", url: "https://www.panoramaresort.com/assets/webcams/summit-west/summit-west", dynamic: "panorama", cacheBust: false },
    { id: "summit", name: "Summit Cam West", url: "https://www.panoramaresort.com/assets/webcams/summit/summit", dynamic: "panorama", cacheBust: false },
    { id: "champagne", name: "Champagne Express", url: "https://www.panoramaresort.com/assets/webcams/champagne/champagne", dynamic: "panorama", cacheBust: false },
    { id: "mile1quad", name: "Mile 1 Quad", url: "https://www.panoramaresort.com/assets/webcams/mile1quad/mile1quad", dynamic: "panorama", cacheBust: false },
    { id: "plateau-e", name: "Plateau E", url: "https://www.panoramaresort.com/assets/webcams/plateau-e/plateau-e", dynamic: "panorama", cacheBust: false },
    { id: "plateau-w", name: "Plateau W", url: "https://www.panoramaresort.com/assets/webcams/plateau-w/plateau-w", dynamic: "panorama", cacheBust: false },
    { id: "plateau-s", name: "Plateau S", url: "https://www.panoramaresort.com/assets/webcams/plateau-s/plateau-s", dynamic: "panorama", cacheBust: false },
    { id: "village", name: "Village", url: "https://www.panoramaresort.com/assets/webcams/village/village", dynamic: "panorama", cacheBust: false },
    { id: "showoff", name: "Showoff", url: "https://www.panoramaresort.com/assets/webcams/showoff/showoff", dynamic: "panorama", cacheBust: false },
  ]
}

// Append a cache-busting timestamp query param to any webcam URL
export function withTimestamp(url: string, timestamp: number | string = Date.now()): string {
  try {
    const u = new URL(url)
    u.searchParams.set("timestamp", String(timestamp))
    return u.toString()
  } catch {
    const sep = url.includes("?") ? "&" : "?"
    return `${url}${sep}timestamp=${timestamp}`
  }
}

// Panorama helpers: build URL with snapped time (10,25,40,55) in a specific timezone
function fmt2(n: number): string { return n.toString().padStart(2, "0") }

function getZonedParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const parts = fmt.formatToParts(date)
  const map: Record<string, number> = {}
  for (const p of parts) {
    if (p.type === "literal") continue
    map[p.type] = Number(p.value)
  }
  return {
    year: map.year,
    month: map.month,
    day: map.day,
    hour: map.hour,
    minute: map.minute,
  }
}

function daysInMonth(year: number, month1to12: number): number {
  return new Date(year, month1to12, 0).getDate()
}

function snapPanoramaParts(date: Date, timeZone: string) {
  const allowed = [10, 25, 40, 55]
  let { year, month, day, hour, minute } = getZonedParts(date, timeZone)

  // Find the largest allowed value strictly less than or equal to minute
  let chosen = -1
  for (let i = 0; i < allowed.length; i++) {
    if (allowed[i] <= minute) chosen = allowed[i]
  }
  if (chosen === -1) {
    // If before the first slot, use previous hour at :55 (handle day/month/year rollbacks)
    minute = 55
    if (hour > 0) {
      hour = hour - 1
    } else {
      hour = 23
      if (day > 1) {
        day = day - 1
      } else {
        if (month > 1) {
          month = month - 1
        } else {
          month = 12
          year = year - 1
        }
        day = daysInMonth(year, month)
      }
    }
  } else {
    minute = chosen
  }

  return { year, month, day, hour, minute }
}

export function buildPanoramaUrl(
  base: string,
  date: Date = new Date(),
  timeZone: string = "America/Edmonton"
): string {
  const { year, month, day, hour, minute } = snapPanoramaParts(date, timeZone)
  const yyyy = year
  const MM = fmt2(month)
  const dd = fmt2(day)
  const HH = fmt2(hour)
  const mm = fmt2(minute)
  const stamp = `${yyyy}${MM}${dd}_${HH}${mm}`
  return `${base}_${stamp}.jpg`
}

// Convenience: get webcams for a mountain with timestamp applied
export function getWebcamsWithTimestamp(
  mountain: MountainKey,
  timestamp: number | string = Date.now()
): WebcamEntry[] {
  return WEBCAMS[mountain].map((w) => ({ ...w, url: withTimestamp(w.url, timestamp) }))
}

export const MOUNTAIN_LABELS: Record<MountainKey, string> = {
  "big-white": "Big White",
  "sun-peaks": "Sun Peaks",
  panorama: "Panorama",
}
