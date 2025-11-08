import type { Mountain, MountainStatus } from "@/types/mountain"

export const mockMountains: Mountain[] = [
  {
    id: "whistler",
    name: "Whistler Blackcomb",
    location: {
      city: "Whistler",
      state: "BC",
      country: "Canada",
      coordinates: {
        lat: 50.1163,
        lon: -122.9574,
      },
    },
    elevation: {
      base: 2214,
      summit: 7494,
    },
    trails: {
      total: 200,
      open: 180,
      difficulty: {
        beginner: 40,
        intermediate: 80,
        advanced: 60,
        expert: 20,
      },
    },
    lifts: {
      total: 37,
      open: 35,
    },
    website: "https://www.whistlerblackcomb.com",
  },
  {
    id: "vail",
    name: "Vail Mountain",
    location: {
      city: "Vail",
      state: "CO",
      country: "USA",
      coordinates: {
        lat: 39.6403,
        lon: -106.3742,
      },
    },
    elevation: {
      base: 8120,
      summit: 11570,
    },
    trails: {
      total: 195,
      open: 150,
      difficulty: {
        beginner: 35,
        intermediate: 90,
        advanced: 50,
        expert: 20,
      },
    },
    lifts: {
      total: 31,
      open: 28,
    },
    website: "https://www.vail.com",
  },
  {
    id: "park-city",
    name: "Park City Mountain",
    location: {
      city: "Park City",
      state: "UT",
      country: "USA",
      coordinates: {
        lat: 40.6514,
        lon: -111.5081,
      },
    },
    elevation: {
      base: 6800,
      summit: 10026,
    },
    trails: {
      total: 348,
      open: 300,
      difficulty: {
        beginner: 70,
        intermediate: 160,
        advanced: 90,
        expert: 28,
      },
    },
    lifts: {
      total: 43,
      open: 40,
    },
    website: "https://www.parkcitymountain.com",
  },
]

export const mockMountainStatuses: Record<string, MountainStatus> = {
  whistler: {
    mountainId: "whistler",
    isOpen: true,
    lastUpdated: new Date().toISOString(),
    snowDepth: {
      base: 68,
      summit: 142,
    },
    snowfallLast24h: 6,
    snowfallLast7d: 18,
    seasonTotal: 285,
  },
  vail: {
    mountainId: "vail",
    isOpen: true,
    lastUpdated: new Date().toISOString(),
    snowDepth: {
      base: 52,
      summit: 98,
    },
    snowfallLast24h: 3,
    snowfallLast7d: 12,
    seasonTotal: 210,
  },
  "park-city": {
    mountainId: "park-city",
    isOpen: true,
    lastUpdated: new Date().toISOString(),
    snowDepth: {
      base: 45,
      summit: 88,
    },
    snowfallLast24h: 0,
    snowfallLast7d: 8,
    seasonTotal: 195,
  },
}
