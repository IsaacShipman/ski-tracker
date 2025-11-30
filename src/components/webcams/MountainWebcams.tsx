import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Box, HStack, Image, Text, VStack, Button, IconButton, Flex } from "@chakra-ui/react"
import { X } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { MOUNTAIN_LABELS, WEBCAMS, withTimestamp, buildPanoramaUrl } from "@/utils/webcams"
import type { MountainKey, WebcamEntry } from "@/utils/webcams"

interface MountainWebcamsProps {
  mountain: MountainKey
  // Optional: provide custom webcams; if omitted, defaults from WEBCAMS are used
  webcams?: WebcamEntry[]
  // Optional: force timestamp on all provided webcams (overrides per-entry flag)
  timestampAll?: boolean
}

export function MountainWebcams({ mountain, webcams, timestampAll = false }: MountainWebcamsProps) {
  const source = webcams ?? (WEBCAMS[mountain] ?? [])
  // Stable timestamp per mountain change; use this for cache-busting when needed
  const baseTimestamp = useMemo(() => Date.now(), [mountain])
  const cameras = useMemo(() => {
    if (!source?.length) return []
    // For panorama (dynamic) we keep the base and compute per-render so we can fallback on 404
    // For static cameras, compute once here with optional cache busting
    return source.map((w) => {
      if (w.dynamic === "panorama") {
        return { ...w, url: w.url }
      }
      const baseUrl = w.url
      if (timestampAll) return { ...w, url: withTimestamp(baseUrl, baseTimestamp) }
      return { ...w, url: w.cacheBust ? withTimestamp(baseUrl, baseTimestamp) : baseUrl }
    })
  }, [source, timestampAll, baseTimestamp])
  const [index, setIndex] = useState(0)
  const [attemptsByIndex, setAttemptsByIndex] = useState<Record<number, number>>({})
  const MAX_ATTEMPTS = 8
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIndex(0)
    setAttemptsByIndex({})
  }, [mountain])

  useEffect(() => {
    // reset attempts when switching to a new camera
    setAttemptsByIndex((prev) => ({ ...prev, [index]: 0 }))
  }, [index])

  const current = useMemo(() => {
    if (!cameras.length) return undefined
    return cameras[(index + cameras.length) % cameras.length]
  }, [cameras, index])

  // navigation handlers inlined in buttons below

  const renderedUrl = useMemo(() => {
    if (!current) return undefined
    if (current.dynamic === "panorama") {
      const now = new Date()
      const attempts = attemptsByIndex[index] ?? 0
      const offsetMinutes = attempts * 15
      const date = new Date(now.getTime() - offsetMinutes * 60_000)
      const built = buildPanoramaUrl(current.url, date)
      if (timestampAll) return withTimestamp(built, baseTimestamp)
      return current.cacheBust ? withTimestamp(built, baseTimestamp) : built
    }
    return current.url
  }, [current, attemptsByIndex, index, baseTimestamp, timestampAll])

  const handleImageError = () => {
    if (current?.dynamic === "panorama") {
      setAttemptsByIndex((prev) => {
        const currentAttempts = prev[index] ?? 0
        if (currentAttempts >= MAX_ATTEMPTS) return prev
        return { ...prev, [index]: currentAttempts + 1 }
      })
    }
  }

  return (
    <GlassCard>
      <VStack alignItems="stretch" gap={4} width="100%">
        <Text
          fontSize="sm"
          color="white"
          opacity={0.7}
          textTransform="uppercase"
          fontWeight="600"
          letterSpacing="0.1em"
          textAlign="center"
          width="100%"
        >
          Live Webcams • {MOUNTAIN_LABELS[mountain]}
        </Text>

        <Box position="relative" width="100%" borderRadius="md" overflow="hidden" bg="whiteAlpha.100" border="1px solid rgba(255,255,255,0.08)">
          {current ? (
            <Image
              src={renderedUrl}
              alt={current.name}
              width="100%"
              objectFit="cover"
              maxH="260px"
              onError={handleImageError}
              onClick={() => { if (current) setIsOpen(true) }}
              cursor="zoom-in"
            />
          ) : (
            <Box p={6}>
              <Text color="white" opacity={0.8} textAlign="center">No webcams configured for this mountain.</Text>
            </Box>
          )}
        </Box>

        <HStack width="100%" justify="left" gap={3}>
                 {current && (
          <HStack width="100%" gap={3}>
            <Text color="white" opacity={0.9} fontWeight="600" textAlign="left">{current.name}  </Text>
            <Text color="white" opacity={0.6} fontSize="sm" textAlign="left">{index + 1} / {cameras.length}</Text>
          </HStack>
        )}
          <Button aria-label="Previous camera" size="sm" variant="outline" color="white" borderColor="rgba(255,255,255,0.5)" _hover={{ bg: "rgba(255,255,255,0.12)" }} onClick={() => { setIndex((i) => (i - 1 + Math.max(1, cameras.length)) % Math.max(1, cameras.length)); }}>
            ‹
          </Button>
          <Button aria-label="Next camera" size="sm" variant="outline" color="white" borderColor="rgba(255,255,255,0.5)" _hover={{ bg: "rgba(255,255,255,0.12)" }} onClick={() => { setIndex((i) => (i + 1) % Math.max(1, cameras.length)); }}>
            ›
          </Button>
        </HStack>

   
      </VStack>

      {/* Webcam Modal rendered in a portal to body for full-viewport coverage */}
      {isOpen && current && typeof document !== "undefined" &&
        createPortal(
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={10000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(10, 12, 24, 0.55)"
              backdropFilter="blur(10px)"
            />

            {/* Modal Content */}
            <Box
              position="relative"
              bg="rgba(255, 255, 255, 0.10)"
              backdropFilter="blur(18px) saturate(160%)"
              borderRadius="24px"
              boxShadow="0 20px 60px rgba(13, 16, 35, 0.45)"
              border="1px solid rgba(255, 255, 255, 0.16)"
              maxW="900px"
              w="90vw"
              maxH="90vh"
              overflowY="auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <Flex
                p={6}
                pb={4}
                borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                align="center"
                justify="space-between"
              >
                <Text color="white" fontSize="2xl" fontWeight="light">
                  {current.name}
                </Text>
                <IconButton
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
                >
                  <X size={24} />
                </IconButton>
              </Flex>

              {/* Body */}
              <Box p={6}>
                <Box width="100%" maxH="80vh" overflow="hidden" borderRadius="md" bg="black">
                  <Image
                    src={renderedUrl}
                    alt={current.name}
                    width="100%"
                    maxH="80vh"
                    objectFit="contain"
                    onError={handleImageError}
                  />
                </Box>
              </Box>
            </Box>
          </Box>,
          document.body
        )}
    </GlassCard>
  )
}

export default MountainWebcams
