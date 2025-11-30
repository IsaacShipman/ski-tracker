import { Box, Flex, Text, VStack, Spinner } from "@chakra-ui/react"
import { Cloud, CloudRain, CloudSnow, Sun, Wind, CloudFog, CloudDrizzle, Zap, Snowflake } from "lucide-react"
import { useState } from "react"
import { useWeatherForecast } from "@/hooks/useWeatherForecast"
import { useDayWeather } from "@/hooks/useDayWeather"
import { getWeatherCondition } from "@/utils/weatherCodeMapper"
import { DayWeatherModal } from "./DayWeatherModal"

interface WeatherTimelineProps {
  latitude?: number
  longitude?: number
}

const TIME_ZONE = "America/Vancouver" // Big White (Pacific Time)

// Map weather conditions to Lucide icons
const getWeatherIcon = (weatherCode: number) => {
  const iconProps = { size: 48, strokeWidth: 1.5 }
  const condition = getWeatherCondition(weatherCode)
  
  switch (condition.main.toLowerCase()) {
    case 'clear':
      return <Sun {...iconProps} />
    case 'clouds':
      return <Cloud {...iconProps} />
    case 'rain':
      return <CloudRain {...iconProps} />
    case 'drizzle':
      return <CloudDrizzle {...iconProps} />
    case 'snow':
      return <CloudSnow {...iconProps} />
    case 'fog':
      return <CloudFog {...iconProps} />
    case 'thunderstorm':
      return <Zap {...iconProps} />
    case 'wind':
      return <Wind {...iconProps} />
    default:
      return <Cloud {...iconProps} />
  }
}

function getZonedParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  })
  const parts = fmt.formatToParts(date)
  const map: Record<string, number> = {}
  for (const p of parts) {
    if (p.type === "literal") continue
    map[p.type] = Number(p.value)
  }
  return { year: map.year, month: map.month, day: map.day }
}

function daysInMonth(year: number, month1to12: number): number {
  return new Date(year, month1to12, 0).getDate()
}

const getDayName = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()

  const { year: dy, month: dm, day: dd } = getZonedParts(date, TIME_ZONE)
  const { year: ty, month: tm, day: td } = getZonedParts(now, TIME_ZONE)

  if (dy === ty && dm === tm && dd === td) return 'Today'

  // compute tomorrow in target timezone
  let tdy = td + 1
  let tdm = tm
  let tyy = ty
  const dim = daysInMonth(tyy, tdm)
  if (tdy > dim) {
    tdy = 1
    tdm = tm === 12 ? 1 : tm + 1
    tyy = tm === 12 ? ty + 1 : ty
  }
  if (dy === tyy && dm === tdm && dd === tdy) return 'Tomorrow'

  // Otherwise return day of week in the target timezone
  return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: TIME_ZONE })
}

export const WeatherTimeline = ({ latitude, longitude }: WeatherTimelineProps) => {
  const { data, loading, error } = useWeatherForecast(latitude, longitude)
  const { data: dayData, loading: dayLoading, fetchDayWeather } = useDayWeather()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDayClick = async (date: string) => {
    setIsModalOpen(true)
    await fetchDayWeather(date, latitude, longitude)
  }

  if (loading) {
    return (
      <Box w="full" display="flex" justifyContent="center" alignItems="center" minH="300px">
        <Spinner size="xl" color="white" />
      </Box>
    )
  }

  if (error || !data) {
    return (
      <Box w="full" display="flex" justifyContent="center" alignItems="center" minH="300px">
        <Text color="white" fontSize="lg">Failed to load weather data</Text>
      </Box>
    )
  }

  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
    >
      {/* Glassmorphic Container */}
      <Box
        bg="whiteAlpha.100" 
        backdropFilter="blur(18px) saturate(160%)"
        css={{
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
        }}
        borderRadius="24px"
        boxShadow="0 8px 32px 0 rgba(13, 16, 35, 0.35)"
        border="1px solid rgba(255, 255, 255, 0.14)"
        p={8}
        position="relative"
        overflow="hidden"
       
      >
        {/* Header */}
        <Text
          fontSize="3xl"
          fontWeight="light"
          color="white"
          mb={8}
          letterSpacing="wide"
        >
          7-Day Forecast
        </Text>

        {/* Timeline Grid */}
        <Flex
          gap={3}
          alignItems="stretch"
          width="100%"
        >
          {data.daily_data.map((day) => {
            const avgTemp = (day.temperature_2m_max + day.temperature_2m_min) / 2
            
            return (
              <Box
                key={day.date}
                flex="1"
                minW="0"
                borderRadius="16px"
                backdropFilter="blur(14px)"
                css={{
                  WebkitBackdropFilter: "blur(14px)",
                }}
                bg="whiteAlpha.80" 
                boxShadow="0 4px 18px rgba(13, 16, 35, 0.25)"
                border="1px solid rgba(255, 255, 255, 0.14)"
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                transition="all 0.3s ease-out"
                cursor="pointer"
                onClick={() => handleDayClick(day.date)}
                _hover={{
                  transform: "scale(1.05) translateY(-8px)",
                  boxShadow: "0 12px 30px rgba(13, 16, 35, 0.35)",
                }}
              >
                {/* Day Name */}
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color="rgba(255, 255, 255, 0.9)"
                  letterSpacing="wide"
                  mb={3}
                  transition="color 0.3s"
                  _groupHover={{
                    color: "white",
                  }}
                >
                  {getDayName(day.date)}
                </Text>

                {/* Weather Icon */}
                <Box
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  transition="transform 0.3s"
                  _groupHover={{
                    transform: "scale(1.1)",
                  }}
                >
                  {getWeatherIcon(day.weather_code)}
                </Box>

                {/* Temperature */}
                <VStack gap={1} mt={3}>
                  <Text
                    fontSize="2xl"
                    fontWeight="light"
                    color="white"
                    lineHeight="1"
                    transition="transform 0.3s"
                    _groupHover={{
                      transform: "scale(1.1)",
                    }}
                  >
                    {Math.round(avgTemp)}°
                  </Text>
                  <Flex gap={2} fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                    <Text>{Math.round(day.temperature_2m_max)}°</Text>
                    <Text color="rgba(255, 255, 255, 0.4)">/</Text>
                    <Text>{Math.round(day.temperature_2m_min)}°</Text>
                  </Flex>
                </VStack>

                {/* Snowfall indicator */}
                <Text fontSize="xs" color="rgba(255, 255, 255, 0.7)" mt={2}>
                  <Snowflake size={20} style={{ display: "inline", marginRight: 4 }} /> {day.snowfall_sum.toFixed(1)}"
                </Text>
              </Box>
            )
          })}
        </Flex>
      </Box>
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }
        `}
      </style>

      {/* Day Weather Modal */}
      <DayWeatherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weatherData={dayData?.daily_data[0] || null}
        loading={dayLoading}
      />
    </Box>
  )
}
