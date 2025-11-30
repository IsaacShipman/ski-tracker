import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Grid,
  Spinner,
  IconButton,
} from "@chakra-ui/react"
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  CloudFog,
  CloudDrizzle,
  Zap,
  Sunrise,
  Sunset,
  Droplet,
  Gauge,
  Navigation,
  AlertCircle,
  CloudOff,
  Eye,
  X,
} from "lucide-react"
import { getWeatherCondition } from "@/utils/weatherCodeMapper"
import type { DetailedDailyWeatherData } from "@/hooks/useDayWeather"

interface DayWeatherModalProps {
  isOpen: boolean
  onClose: () => void
  weatherData: DetailedDailyWeatherData | null
  loading: boolean
}

const getWeatherIcon = (weatherCode: number, size = 64) => {
  const iconProps = { size, strokeWidth: 1.5 }
  const condition = getWeatherCondition(weatherCode)

  switch (condition.main.toLowerCase()) {
    case "clear":
      return <Sun {...iconProps} />
    case "clouds":
      return <Cloud {...iconProps} />
    case "rain":
      return <CloudRain {...iconProps} />
    case "drizzle":
      return <CloudDrizzle {...iconProps} />
    case "snow":
      return <CloudSnow {...iconProps} />
    case "fog":
      return <CloudFog {...iconProps} />
    case "thunderstorm":
      return <Zap {...iconProps} />
    case "wind":
      return <Wind {...iconProps} />
    default:
      return <Cloud {...iconProps} />
  }
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

const getWindDirection = (degrees: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

const getUVLevel = (uvIndex: number) => {
  if (uvIndex <= 2) return { level: "Low", color: "green.400" }
  if (uvIndex <= 5) return { level: "Moderate", color: "yellow.400" }
  if (uvIndex <= 7) return { level: "High", color: "orange.400" }
  if (uvIndex <= 10) return { level: "Very High", color: "red.400" }
  return { level: "Extreme", color: "purple.400" }
}

const StatCard = ({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
}) => (
  <Box
    bg="rgba(255, 255, 255, 0.1)"
    backdropFilter="blur(12px)"
    borderRadius="16px"
    p={4}
    transition="all 0.3s"
    _hover={{
      bg: "rgba(255, 255, 255, 0.15)",
      transform: "translateY(-2px)",
    }}
  >
    <VStack gap={2} align="center">
      <Box color="rgba(255, 255, 255, 0.8)">{icon}</Box>
      <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)" textAlign="center">
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="semibold" color="white">
        {value}
      </Text>
      {subValue && (
        <Text fontSize="xs" color="rgba(255, 255, 255, 0.5)">
          {subValue}
        </Text>
      )}
    </VStack>
  </Box>
)

export const DayWeatherModal = ({
  isOpen,
  onClose,
  weatherData,
  loading,
}: DayWeatherModalProps) => {
  if (!isOpen) return null
  if (!weatherData && !loading) return null

  const condition = weatherData
    ? getWeatherCondition(weatherData.weather_code)
    : null
  const uvInfo = weatherData ? getUVLevel(weatherData.uv_index_max) : null
  const avgTemp = weatherData
    ? (weatherData.temperature_2m_max + weatherData.temperature_2m_min) / 2
    : 0

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={2000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
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
            {weatherData
              ? new Date(weatherData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              : "Loading..."}
          </Text>
          <IconButton
            aria-label="Close"
            onClick={onClose}
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
          >
            <X size={24} />
          </IconButton>
        </Flex>

        {/* Body */}
        <Box p={6}>
          {loading ? (
            <Flex justify="center" align="center" minH="400px">
              <Spinner size="xl" color="white" />
            </Flex>
          ) : weatherData ? (
            <VStack gap={6} align="stretch">
              {/* Hero Section */}
              <Flex
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="20px"
                p={8}
                align="center"
                justify="space-between"
                backdropFilter="blur(14px)"
              >
                <VStack align="start" gap={2}>
                  <Text fontSize="6xl" fontWeight="light" color="white">
                    {Math.round(avgTemp)}°
                  </Text>
                  <HStack gap={3}>
                    <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
                      H: {Math.round(weatherData.temperature_2m_max)}°
                    </Text>
                    <Text fontSize="lg" color="rgba(255, 255, 255, 0.6)">
                      L: {Math.round(weatherData.temperature_2m_min)}°
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                    Feels like {Math.round(weatherData.apparent_temperature_max)}° / {Math.round(weatherData.apparent_temperature_min)}°
                  </Text>
                </VStack>

                <VStack gap={2} align="center">
                  <Box color="white">{getWeatherIcon(weatherData.weather_code, 80)}</Box>
                  <Text fontSize="xl" color="white" fontWeight="medium">
                    {condition?.description}
                  </Text>
                </VStack>
              </Flex>

              {/* Precipitation Section */}
              <Box
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="20px"
                p={6}
                backdropFilter="blur(14px)"
              >
                <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>
                  Precipitation
                </Text>
                <Grid templateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap={4}>
                  <StatCard
                    icon={<CloudSnow size={24} />}
                    label="Snowfall"
                    value={`${weatherData.snowfall_sum.toFixed(1)}"`}
                  />
                  <StatCard
                    icon={<CloudRain size={24} />}
                    label="Rain"
                    value={`${weatherData.rain_sum.toFixed(1)} mm`}
                  />
                  <StatCard
                    icon={<Droplet size={24} />}
                    label="Total Precipitation"
                    value={`${weatherData.precipitation_sum.toFixed(1)} mm`}
                    subValue={`${weatherData.precipitation_hours.toFixed(0)}h`}
                  />
                  <StatCard
                    icon={<Gauge size={24} />}
                    label="Probability"
                    value={`${Math.round(weatherData.precipitation_probability_max)}%`}
                  />
                </Grid>
              </Box>

              {/* Wind & Sun Section */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box
                  bg="rgba(255, 255, 255, 0.08)"
                  borderRadius="20px"
                  p={6}
                  backdropFilter="blur(14px)"
                >
                  <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>
                    Wind
                  </Text>
                  <VStack gap={3} align="stretch">
                    <StatCard
                      icon={<Wind size={24} />}
                      label="Wind Speed"
                      value={`${weatherData.wind_speed_10m_max.toFixed(1)} km/h`}
                    />
                    <StatCard
                      icon={<AlertCircle size={24} />}
                      label="Gusts"
                      value={`${weatherData.wind_gusts_10m_max.toFixed(1)} km/h`}
                    />
                    <StatCard
                      icon={<Navigation size={24} />}
                      label="Direction"
                      value={getWindDirection(weatherData.wind_direction_10m_dominant)}
                      subValue={`${Math.round(weatherData.wind_direction_10m_dominant)}°`}
                    />
                  </VStack>
                </Box>

                <Box
                  bg="rgba(255, 255, 255, 0.08)"
                  borderRadius="20px"
                  p={6}
                  backdropFilter="blur(14px)"
                >
                  <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>
                    Sun & UV
                  </Text>
                  <VStack gap={3} align="stretch">
                    <StatCard
                      icon={<Sunrise size={24} />}
                      label="Sunrise"
                      value={formatTime(weatherData.sunrise)}
                    />
                    <StatCard
                      icon={<Sunset size={24} />}
                      label="Sunset"
                      value={formatTime(weatherData.sunset)}
                    />
                    <StatCard
                      icon={<Sun size={24} />}
                      label="UV Index"
                      value={weatherData.uv_index_max.toFixed(1)}
                      subValue={uvInfo?.level}
                    />
                  </VStack>
                </Box>
              </Grid>

              {/* Daylight Information */}
              <Box
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="20px"
                p={6}
                backdropFilter="blur(14px)"
              >
                <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>
                  Daylight
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <StatCard
                    icon={<Eye size={24} />}
                    label="Total Daylight"
                    value={formatDuration(weatherData.daylight_duration)}
                  />
                  <StatCard
                    icon={<CloudOff size={24} />}
                    label="Sunshine Duration"
                    value={formatDuration(weatherData.sunshine_duration)}
                  />
                </Grid>
              </Box>
            </VStack>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
