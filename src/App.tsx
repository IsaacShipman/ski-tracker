import { Box, Grid, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { WeatherCard } from "@/features/weather/WeatherCard"
import { MountainSelector } from "@/features/mountains/MountainSelector"
import { useMountainSelection } from "@/hooks/useMountainSelection"
import { mockWeatherData, mockSkiConditions } from "@/utils/mockWeatherData"
import { mockMountainStatuses } from "@/utils/mockData"

function App() {
  const { mountains, selectedMountain, selectedMountainId, selectMountain } = useMountainSelection()

  return (
    <DashboardLayout>
      <VStack gap={8} alignItems="stretch">
        {/* Welcome Section */}
        <Box>
          <Heading size="2xl" mb={2} color={{ _light: "mountain.900", _dark: "snow.100" }}>
            Welcome to Ski Weather Tracker
          </Heading>
          <Text fontSize="lg" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
            Track weather conditions across your favorite mountains to find the perfect skiing day.
          </Text>
        </Box>

        {/* Mountain Selection and Weather Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "350px 1fr" }}
          gap={6}
        >
          {/* Mountain Selector Sidebar */}
          <GridItem>
            <MountainSelector
              mountains={mountains}
              selectedMountainId={selectedMountainId}
              onSelectMountain={selectMountain}
              mountainStatuses={mockMountainStatuses}
            />
          </GridItem>

          {/* Weather Forecast Section */}
          <GridItem>
            <VStack gap={6} alignItems="stretch">
              {/* Selected Mountain Info */}
              {selectedMountain && (
                <Box>
                  <Heading size="xl" mb={2} color={{ _light: "mountain.900", _dark: "snow.100" }}>
                    {selectedMountain.name}
                  </Heading>
                  <Text fontSize="md" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                    {selectedMountain.location.city}, {selectedMountain.location.state} • 
                    Base: {selectedMountain.elevation.base}ft • Summit: {selectedMountain.elevation.summit}ft
                  </Text>
                </Box>
              )}

              {/* Weather Cards Grid */}
              <Box>
                <Heading size="lg" mb={4} color={{ _light: "mountain.900", _dark: "snow.100" }}>
                  4-Day Forecast
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                  {mockWeatherData.map((weather, index) => (
                    <WeatherCard
                      key={index}
                      weather={weather}
                      skiConditions={mockSkiConditions[index]}
                      isToday={index === 0}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              {/* Additional Info */}
              <Box
                p={6}
                borderRadius="lg"
                bg={{ _light: "brand.50", _dark: "brand.950" }}
                borderWidth="1px"
                borderColor={{ _light: "brand.200", _dark: "brand.800" }}
              >
                <Heading size="md" mb={3} color={{ _light: "brand.700", _dark: "brand.300" }}>
                  💡 Skiing Tips
                </Heading>
                <VStack alignItems="flex-start" gap={2}>
                  <Text fontSize="sm" color={{ _light: "mountain.700", _dark: "mountain.300" }}>
                    • Best skiing conditions: temperatures between 15-30°F with fresh powder
                  </Text>
                  <Text fontSize="sm" color={{ _light: "mountain.700", _dark: "mountain.300" }}>
                    • Avoid high wind speeds above 25 mph for safety
                  </Text>
                  <Text fontSize="sm" color={{ _light: "mountain.700", _dark: "mountain.300" }}>
                    • Check visibility - aim for at least 5 miles for optimal conditions
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </DashboardLayout>
  )
}

export default App
