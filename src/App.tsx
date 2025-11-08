import { Box, Heading, SimpleGrid, Text, VStack, Button } from "@chakra-ui/react"
import { mockWeatherData } from "@/utils/mockWeatherData"
import { WeatherSidebar } from "./components/weather/WeatherSidebar"
import { WeatherTimeline } from "./components/weather/weatherTimeline" 
import { GlassCard } from "./components/ui/GlassCard"
import { useState, useMemo } from "react"
import type { WeatherData } from "@/types/weather"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import sunnyBackground from '/blue-sky.jpeg'
import cloudyBackground from '/angry-cloud.jpg'

const getBackgroundImage = (weather: WeatherData) => {
  const { conditions, cloudCover } = weather
  
  // Clear skies or low cloud cover = sunny background
  if (conditions.main === 'Clear' || cloudCover < 40) {
    return sunnyBackground
  }
  
  // Otherwise cloudy background
  return cloudyBackground
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'rgba(34, 197, 94, 0.9)' // Green
  if (score >= 60) return 'rgba(234, 179, 8, 0.9)' // Yellow
  if (score >= 0) return 'rgba(249, 115, 22, 0.9)' // Orange
  return 'rgba(239, 68, 68, 0.9)' // Red
}

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent Conditions'
  if (score >= 60) return 'Good Conditions'
  if (score >= 0) return 'Bad Conditions'
  return 'Poor Conditions'
}

const getSubLabel = (score: number) => {
  if (score >= 80) return 'No friends on powder day'
  if (score >= 60) return 'Work in the morning'
  if (score >= 0) return 'Flag it'
  return 'Not recommended for skiing'
}
function App() {
  const [weatherIndex, setWeatherIndex] = useState(2)
  const currentWeather = mockWeatherData[weatherIndex]
  const backgroundImage = useMemo(() => getBackgroundImage(currentWeather), [currentWeather])
  
  const skiScore = 20 // You can calculate this dynamically based on weather conditions

  const toggleWeather = () => {
    setWeatherIndex((prev) => (prev + 1) % mockWeatherData.length)
  }

  return (
    <Box position="relative" minHeight="100vh">
      {/* Full-screen background image */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={0}
        transition="background-image 0.8s ease-in-out"
        filter="blur(5px) brightness(0.7)"
      />

      {/* Weather Toggle */}
      <Button
        onClick={toggleWeather}
        position="fixed"
        top={4}
        right={4}
        zIndex={1000}
        colorScheme="blue"
        size="sm"
      >
        Weather: Day {weatherIndex + 1}
      </Button>

      {/* Weather Sidebar - Fixed on left */}
      <WeatherSidebar weather={currentWeather} />

      {/* Main Content Area - Offset by sidebar width */}
      <Box
        padding={8}
        minHeight="100vh"
        position="relative"
        zIndex={1}
        >
        {/* Title */}
        <Heading
          size="3xl"
          mb={8}
          color="white"
          textTransform="uppercase"
          letterSpacing="wider"
          fontWeight="300"
          marginLeft={{ md: "340px" }}
          textShadow="0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.1)"
          fontFamily="system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif"
        >
          Shipman Weather Report
        </Heading>

        {/* Weather Timeline - Main Feature */}
        <Box mb={8} px={0} marginLeft={{ md: "340px" }}>
          <WeatherTimeline weatherData={mockWeatherData} currentWeather={mockWeatherData[3]} />
        </Box>

        {/* Main Cards Grid */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mb={8} marginLeft={{ md: "340px" }}>
          {/* Ski Score Card */}
          <GlassCard>
            <VStack alignItems="center" gap={4} height="100%" justifyContent="center">
              <Text 
                fontSize="sm" 
                color="white" 
                opacity={0.7}
                textTransform="uppercase" 
                fontWeight="600"
                letterSpacing="0.1em"
              >
                Overall Ski Score
              </Text>
              <Box width="180px" height="180px">
                <CircularProgressbar 
                  value={skiScore} 
                  text={`${skiScore}`}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'round',
                    textSize: '28px',
                    pathTransitionDuration: 0.5,
                    pathColor: getScoreColor(skiScore),
                    textColor: 'white',
                    trailColor: 'rgba(255, 255, 255, 0.2)',
                  })}
                />
              </Box>
              <Text color="white" opacity={0.9} fontSize="lg" fontWeight="600">
                {getScoreLabel(skiScore)}
              </Text>
              <Text fontSize="sm" color="white" opacity={0.6}>
                {getSubLabel(skiScore)}
              </Text>
            </VStack>
          </GlassCard>

          {/* Snow Conditions Card */}
          <GlassCard>
            <VStack alignItems="flex-start" gap={4} height="100%">
              <Text 
                fontSize="sm" 
                color="white" 
                opacity={0.7}
                textTransform="uppercase" 
                fontWeight="600"
                letterSpacing="0.1em"
              >
                Snow Conditions
              </Text>
              <VStack alignItems="flex-start" gap={3} flex="1" justifyContent="center">
                <Heading size="4xl" color="white" textShadow="0 2px 12px rgba(0, 0, 0, 0.3)">
                  ❄️ Powder
                </Heading>
                <Text color="white" opacity={0.9} fontSize="lg">
                  Base depth: 48 inches
                </Text>
              </VStack>
              <Text fontSize="sm" color="white" opacity={0.6}>
                Fresh: 4" in last 24h
              </Text>
            </VStack>
          </GlassCard>

          {/* Notifications Card */}
          <GlassCard>
            <VStack alignItems="flex-start" gap={4} height="100%">
              <Text 
                fontSize="sm" 
                color="white" 
                opacity={0.7}
                textTransform="uppercase" 
                fontWeight="600"
                letterSpacing="0.1em"
              >
                Daily Notifications
              </Text>
              <VStack alignItems="flex-start" gap={3} flex="1" justifyContent="center" width="100%">
               
                <VStack alignItems="flex-start" gap={2} width="100%">
                  <Text color="white" opacity={0.9} fontSize="md">
                    • Isaac Shipman
                  </Text>
                  <Text color="white" opacity={0.9} fontSize="md">
                    • John Doe
                  </Text>
                  <Text color="white" opacity={0.9} fontSize="md">
                    • Jane Smith
                  </Text>
                </VStack>
              </VStack>
              <Text fontSize="sm" color="white" opacity={0.6}>
                3 active subscribers • Morning updates at 7am
              </Text>
            </VStack>
          </GlassCard>
        </SimpleGrid>

           </Box>
    </Box>
  )
}

export default App
