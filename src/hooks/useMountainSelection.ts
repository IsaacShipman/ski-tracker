import { useState } from "react"
import { mockMountains } from "@/utils/mockData"

export function useMountainSelection() {
  const [selectedMountainId, setSelectedMountainId] = useState<string | undefined>(
    mockMountains[0]?.id
  )

  const selectedMountain = mockMountains.find((m) => m.id === selectedMountainId)

  const selectMountain = (mountainId: string) => {
    setSelectedMountainId(mountainId)
  }

  return {
    mountains: mockMountains,
    selectedMountain,
    selectedMountainId,
    selectMountain,
  }
}
