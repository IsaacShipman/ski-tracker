export interface Mountain {
  id: string
  name: string
  location: {
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lon: number
    }
  }
  elevation: {
    base: number
    summit: number
  }
  trails: {
    total: number
    open: number
    difficulty: {
      beginner: number
      intermediate: number
      advanced: number
      expert: number
    }
  }
  lifts: {
    total: number
    open: number
  }
  website?: string
  phoneNumber?: string
}

export interface MountainStatus {
  mountainId: string
  isOpen: boolean
  lastUpdated: string
  snowDepth: {
    base: number
    summit: number
  }
  snowfallLast24h: number
  snowfallLast7d: number
  seasonTotal: number
}
