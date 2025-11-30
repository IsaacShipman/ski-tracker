import type { MountainKey } from "./webcams"

export const MOUNTAIN_COORDS: Record<MountainKey, { latitude: number; longitude: number }> = {
  "big-white": { latitude: 49.7313, longitude: -118.9439 },
  "sun-peaks": { latitude: 50.884, longitude: -119.885 },
  panorama: { latitude: 50.460, longitude: -116.237 },
}

export function getMountainCoords(key: MountainKey) {
  return MOUNTAIN_COORDS[key]
}
