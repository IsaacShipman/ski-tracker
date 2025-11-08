import { Box, Card, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import type { Mountain, MountainStatus } from "@/types/mountain"

interface MountainSelectorProps {
  mountains: Mountain[]
  selectedMountainId?: string
  onSelectMountain: (mountainId: string) => void
  mountainStatuses?: Record<string, MountainStatus>
}

export function MountainSelector({
  mountains,
  selectedMountainId,
  onSelectMountain,
  mountainStatuses,
}: MountainSelectorProps) {
  return (
    <Card.Root p={6} bg={{ _light: "white", _dark: "mountain.900" }}>
      <Stack gap={4}>
        <Heading size="lg" color={{ _light: "mountain.900", _dark: "snow.100" }}>
          Select Mountain
        </Heading>
        
        <Stack gap={3}>
          {mountains.map((mountain) => {
            const status = mountainStatuses?.[mountain.id]
            const isSelected = selectedMountainId === mountain.id
            
            return (
              <Box
                key={mountain.id}
                onClick={() => onSelectMountain(mountain.id)}
                cursor="pointer"
                p={4}
                borderRadius="md"
                borderWidth="2px"
                borderColor={
                  isSelected
                    ? "brand.500"
                    : { _light: "mountain.200", _dark: "mountain.700" }
                }
                bg={
                  isSelected
                    ? { _light: "brand.50", _dark: "brand.950" }
                    : { _light: "snow.300", _dark: "mountain.800" }
                }
                _hover={{
                  borderColor: "brand.400",
                  transform: "translateY(-1px)",
                  shadow: "md",
                }}
                transition="all 0.2s"
              >
                <Stack gap={3}>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Heading size="md" mb={1}>
                        {mountain.name}
                      </Heading>
                      <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                        {mountain.location.city}, {mountain.location.state}
                      </Text>
                    </Box>
                    {status && (
                      <Box
                        px={2}
                        py={1}
                        borderRadius="full"
                        bg={status.isOpen ? "green.500" : "red.500"}
                        fontSize="xs"
                        fontWeight="semibold"
                        color="white"
                      >
                        {status.isOpen ? "Open" : "Closed"}
                      </Box>
                    )}
                  </Flex>

                  {status && (
                    <HStack gap={4} flexWrap="wrap">
                      <Text fontSize="xs" color={{ _light: "mountain.700", _dark: "mountain.300" }}>
                        ❄️ Base: {status.snowDepth.base}"
                      </Text>
                      <Text fontSize="xs" color={{ _light: "mountain.700", _dark: "mountain.300" }}>
                        🏔️ Summit: {status.snowDepth.summit}"
                      </Text>
                      {status.snowfallLast24h > 0 && (
                        <Text fontSize="xs" color="brand.500" fontWeight="semibold">
                          +{status.snowfallLast24h}" (24h)
                        </Text>
                      )}
                    </HStack>
                  )}

                  <HStack gap={4}>
                    <Text fontSize="xs" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                      🎿 {mountain.trails.open || mountain.trails.total} trails
                    </Text>
                    <Text fontSize="xs" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                      🚡 {mountain.lifts.open || mountain.lifts.total} lifts
                    </Text>
                  </HStack>
                </Stack>
              </Box>
            )
          })}
        </Stack>
      </Stack>
    </Card.Root>
  )
}
