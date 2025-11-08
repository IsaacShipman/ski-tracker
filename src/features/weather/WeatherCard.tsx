import { Box, Card, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import type { WeatherData, SkiConditions } from "@/types/weather"

interface WeatherCardProps {
  weather: Partial<WeatherData>
  skiConditions?: SkiConditions
  isToday?: boolean
}

export function WeatherCard({ weather, skiConditions, isToday = false }: WeatherCardProps) {
  const getConditionColor = (quality?: string) => {
    switch (quality) {
      case 'excellent':
        return 'green.500'
      case 'good':
        return 'blue.500'
      case 'fair':
        return 'alert.500'
      case 'poor':
        return 'red.500'
      default:
        return 'mountain.500'
    }
  }

  return (
    <Card.Root
      p={6}
      borderWidth={isToday ? "2px" : "1px"}
      borderColor={isToday ? "brand.500" : { _light: "mountain.200", _dark: "mountain.700" }}
      bg={{ _light: "white", _dark: "mountain.900" }}
      shadow={isToday ? "lg" : "md"}
      _hover={{
        shadow: "xl",
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
    >
      <Stack gap={4}>
        {/* Header */}
        <HStack justifyContent="space-between">
          <Box>
            <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
              {weather.date || "Today"}
            </Text>
            {isToday && (
              <Text fontSize="xs" color="brand.500" fontWeight="semibold">
                Current
              </Text>
            )}
          </Box>
          <Text fontSize="3xl" role="img" aria-label="Weather condition">
            {weather.conditions?.icon || "🌤️"}
          </Text>
        </HStack>

        {/* Temperature */}
        <VStack gap={1} alignItems="flex-start">
          <Heading size="3xl" color={{ _light: "mountain.900", _dark: "snow.100" }}>
            {weather.temperature?.current || "--"}°
          </Heading>
          <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
            {weather.conditions?.description || "No data"}
          </Text>
          {weather.temperature?.min !== undefined && weather.temperature?.max !== undefined && (
            <Text fontSize="xs" color={{ _light: "mountain.500", _dark: "mountain.500" }}>
              H: {weather.temperature.max}° L: {weather.temperature.min}°
            </Text>
          )}
        </VStack>

        {/* Weather Details */}
        <Stack gap={2} pt={2} borderTopWidth="1px" borderColor={{ _light: "mountain.200", _dark: "mountain.700" }}>
          {weather.snow && Object.values(weather.snow).some(v => v !== undefined && v > 0) && (
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                ❄️ Snowfall
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.snow.last24h || weather.snow.last3h || weather.snow.last1h || 0}"
              </Text>
            </HStack>
          )}
          
          {weather.wind && (
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                💨 Wind
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.wind.speed} mph
              </Text>
            </HStack>
          )}
          
          {weather.humidity !== undefined && (
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                💧 Humidity
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.humidity}%
              </Text>
            </HStack>
          )}
        </Stack>

        {/* Ski Conditions Rating */}
        {skiConditions && (
          <Box
            p={3}
            borderRadius="md"
            bg={{ _light: "mountain.50", _dark: "mountain.800" }}
            borderWidth="1px"
            borderColor={getConditionColor(skiConditions.quality)}
          >
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                Ski Conditions
              </Text>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={getConditionColor(skiConditions.quality)}
                textTransform="uppercase"
              >
                {skiConditions.quality}
              </Text>
            </HStack>
          </Box>
        )}
      </Stack>
    </Card.Root>
  )
}
