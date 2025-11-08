import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"
import type { WeatherData } from "@/types/weather"
import LiquidGlass from 'liquid-glass-react'

interface WeatherTimelineProps {
  weatherData: WeatherData[]
  currentWeather: WeatherData
}

type WeatherType = 'bluebird' | 'cloudy'

const getWeatherType = (weather: WeatherData): WeatherType => {
  const { conditions, cloudCover } = weather
  
  // Clear skies or low cloud cover = bluebird
  if (conditions.main === 'Clear' || cloudCover < 40) {
    return 'bluebird'
  }
  
  // Otherwise cloudy
  return 'cloudy'
}

const weatherGradients: Record<WeatherType, string> = {
  bluebird: 'linear-gradient(180deg, #82b8d1ff 0%, #8bc3dbff 50%, #90b9ccff 100%)',
  cloudy: 'linear-gradient(180deg, #475569 0%, #64748B 50%, #94A3B8 100%)',
}

// Map weather conditions to Lucide icons
const getWeatherIcon = (conditions: WeatherData['conditions']) => {
  const iconProps = { size: 48, strokeWidth: 1.5 }
  
  switch (conditions.main.toLowerCase()) {
    case 'clear':
      return <Sun {...iconProps} />
    case 'clouds':
      return <Cloud {...iconProps} />
    case 'rain':
    case 'drizzle':
      return <CloudRain {...iconProps} />
    case 'snow':
      return <CloudSnow {...iconProps} />
    case 'wind':
      return <Wind {...iconProps} />
    default:
      return <Cloud {...iconProps} />
  }
}

export const WeatherTimeline = ({ weatherData }: WeatherTimelineProps) => {
  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
    >
      {/* Glassmorphic Container */}
      <Box
        background="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px) saturate(180%)"
        css={{
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        borderRadius="24px"
        border="1px solid rgba(255, 255, 255, 0.3)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
        p={8}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
        _after={{
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          bg: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          opacity: 0.5,
        }}
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
          {weatherData.map((day) => (
            <Box
              key={day.date}
              flex="1"
              minW="0"
              borderRadius="16px"
              backdropFilter="blur(12px)"
              css={{
                WebkitBackdropFilter: "blur(12px)",
              }}
              bg="rgba(255, 255, 255, 0.15)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
              p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              transition="all 0.3s ease-out"
              cursor="pointer"
              _hover={{
                bg: "rgba(255, 255, 255, 0.25)",
                transform: "scale(1.05) translateY(-8px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
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
                {day.date}
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
                {getWeatherIcon(day.conditions)}
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
                  {Math.round(day.temperature.current)}°
                </Text>
                <Flex gap={2} fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                  <Text>{Math.round(day.temperature.max)}°</Text>
                  <Text color="rgba(255, 255, 255, 0.4)">/</Text>
                  <Text>{Math.round(day.temperature.min)}°</Text>
                </Flex>
              </VStack>
            </Box>
          ))}
        </Flex>

        {/* Shimmer effect */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          opacity={0.3}
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)"
            transform="translateX(-100%) skewX(-12deg)"
            animation="shimmer 8s infinite"
          />
        </Box>
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
    </Box>
  )
}
