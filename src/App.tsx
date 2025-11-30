import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { WeatherSidebar } from "./components/weather/WeatherSidebar"
import { WeatherTimeline } from "./components/weather/weatherTimeline" 
import { GlassCard } from "./components/ui/GlassCard"
import Snowfall from "./components/ui/Snowfall"
import { useEffect, useMemo, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import type { WeatherData } from "@/types/weather"
import { useWeatherForecast } from "@/hooks/useWeatherForecast"
import { getWeatherCondition } from "@/utils/weatherCodeMapper"
import MountainWebcams from "@/components/webcams/MountainWebcams"
import { MOUNTAIN_LABELS } from "@/utils/webcams"
import type { MountainKey } from "@/utils/webcams"
import { getMountainCoords } from "@/utils/mountains"


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
  // Selected mountain for webcams and context
  const [selectedMountain, setSelectedMountain] = useState<MountainKey>("big-white")
  // Background picked via gradient; image helper kept for future use
  const coords = useMemo(() => getMountainCoords(selectedMountain), [selectedMountain])
  const { data: forecast } = useWeatherForecast(coords.latitude, coords.longitude)
  
  const todayIso = useMemo(() => new Date().toISOString().slice(0,10), [])
  const cmToIn = (cm: number) => cm / 2.54
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
  const scaleScore = (value: number, maxValue: number) => clamp((value / maxValue) * 100, 0, 100)
  
  const derived = useMemo(() => {
    const daily = forecast?.daily_data ?? []
    const parsed = daily.map(d => ({
      ...d,
      _date: d.date,
    }))
    const todayEntry = parsed.find(d => d._date === todayIso) ?? parsed[0]
    const pastDays = parsed.filter(d => d._date < todayIso).sort((a,b) => (a._date < b._date ? 1 : -1))
    const futureDays = parsed.filter(d => d._date > todayIso).sort((a,b) => (a._date < b._date ? -1 : 1))

    const fresh24Cm = todayEntry?.snowfall_sum ?? 0
    const past72Cm = pastDays.slice(0, 3).reduce((s,d) => s + (d.snowfall_sum ?? 0), 0)
    const next72Cm = futureDays.slice(0, 3).reduce((s,d) => s + (d.snowfall_sum ?? 0), 0)
    const total7dCm = parsed.reduce((s,d) => s + (d.snowfall_sum ?? 0), 0)

    const tempAvg = todayEntry ? (todayEntry.temperature_2m_max + todayEntry.temperature_2m_min) / 2 : 0
    const windMax = todayEntry?.wind_speed_10m_max ?? 0
    const precipProb = todayEntry?.precipitation_probability_max ?? 0

    const freshScore = scaleScore(fresh24Cm, 30)
    const futureScore = scaleScore(next72Cm, 45)
    const tempScore = (() => {
      const ideal = -6
      const spanLow = -20
      const spanHigh = 2
      if (tempAvg <= spanLow || tempAvg >= 8) return 10
      const dist = Math.abs(tempAvg - ideal)
      const worst = Math.max(ideal - spanLow, spanHigh - ideal)
      return clamp(100 - (dist / worst) * 100, 0, 100)
    })()
    const windScore = clamp(100 - (windMax / 60) * 100, 0, 100)
    const precipScore = tempAvg <= 0 ? precipProb : (100 - precipProb)

    const skiScore = Math.round(
      0.4 * freshScore +
      0.4 * futureScore +
      0.4 * tempScore +
      0.4 * windScore +
      0.4 * precipScore
    )

    const fresh24In = cmToIn(fresh24Cm)
    const past72In = cmToIn(past72Cm)
    const next72In = cmToIn(next72Cm)
    const total7dIn = cmToIn(total7dCm)

    const conditionLabel = (() => {
      if (fresh24In >= 8) return 'Powder'
      if (fresh24In >= 4) return 'Packed Powder'
      if (fresh24In >= 1) return 'Fresh on Groomers'
      if (tempAvg > 2) return 'Spring / Slushy'
      return 'Groomers'
    })()
    const conditionEmoji = (() => {
      if (conditionLabel === 'Powder') return '❄️'
      if (conditionLabel === 'Packed Powder') return '🌨️'
      if (conditionLabel === 'Fresh on Groomers') return '🌬️'
      if (conditionLabel === 'Spring / Slushy') return '🌤️'
      return '⛷️'
    })()

    const hasPastData = pastDays.length > 0

    return {
      skiScore: clamp(skiScore, 0, 100),
      fresh24In,
      past72In,
      next72In,
      total7dIn,
      tempAvg,
      windMax,
      precipProb,
      conditionLabel,
      conditionEmoji,
      hasPastData,
    }
  }, [forecast, todayIso])

  // Decide default theme from today's condition
  const defaultIsBlue = useMemo(() => {
    const code = forecast?.daily_data?.[0]?.weather_code
    if (typeof code !== 'number') return true
    const cond = getWeatherCondition(code)
    const main = cond.main.toLowerCase()
    // Treat clear as blue sky; otherwise cloudy theme
    return main === 'clear'
  }, [forecast])

  useEffect(() => {
    // keep for potential future theme logic; no-op for now
  }, [defaultIsBlue])
  
  // Map backend daily forecast for "today" to WeatherData for the sidebar
  const sidebarWeather: WeatherData | null = (() => {
    if (!forecast || !forecast.daily_data?.length) return null
    const today = forecast.daily_data[0]
    const avgTemp = (today.temperature_2m_max + today.temperature_2m_min) / 2
    const cond = getWeatherCondition(today.weather_code)
    return {
      date: today.date,
      temperature: {
        current: Math.round(avgTemp),
        min: Math.round(today.temperature_2m_min),
        max: Math.round(today.temperature_2m_max),
        feelsLike: Math.round(avgTemp),
      },
      conditions: {
        id: today.weather_code,
        main: cond.main,
        description: cond.description,
        icon: "",
      },
      wind: {
        speed: today.wind_speed_10m_max,
        direction: 0,
        gust: undefined,
      },
      snow: {
        last24h: today.snowfall_sum,
      },
      visibility: 0,
      humidity: 0,
      pressure: 0,
      cloudCover: 0,
    }
  })()
  
  const skiScore = derived.skiScore

  return (
    <Box position="relative" minHeight="100vh">
      {/* Full-screen background gradient */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background={
          "linear-gradient(135deg, #0f172a 0%, #1f2937 45%, #334155 100%)"

        }
        zIndex={0}
      />

      {/* Soft snowfall above gradient, below all content */}
      <Snowfall density={1} speed={1} wind={0.05} opacity={0.8} />

      {/* Mountain Selector (replaces debug sky toggle) */}
      <Box position="fixed" top={4} right={9} zIndex={1000}>
        <select
          value={selectedMountain}
          onChange={(e) => setSelectedMountain(e.target.value as MountainKey)}
          style={{
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.5)',
            padding: '6px 10px',
            borderRadius: 6,
            WebkitAppearance: 'none' as any,
            appearance: 'none',
            backdropFilter: 'blur(8px)',
            marginTop: 20,

          }}
        >
          {Object.entries(MOUNTAIN_LABELS).map(([key, label]) => (
            <option key={key} value={key} style={{ color: '#111827' }}>
              {label}
            </option>
          ))}
        </select>
      </Box>

      {/* Weather Sidebar - Fixed on left (uses live backend data) */}
      {sidebarWeather && <WeatherSidebar weather={sidebarWeather} />}

      {/* Main Content Area - Offset by sidebar width */}
      <Box
        padding={8}
        minHeight="100vh"
        position="relative"
        zIndex={1}
        >
        {/* Title */}
        <Heading
          size="4xl"
          mb={8}
          color="white"
          textTransform="uppercase"
          letterSpacing="wider"
          fontWeight="600"
          marginLeft={{ md: "340px" }}
          textShadow="0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.1)"
          fontFamily="system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif"
        >
          Shipman Weather Report
        </Heading>

        {/* Weather Timeline - Main Feature */}
        <Box mb={8} px={0} marginLeft={{ md: "340px" }}>
          <WeatherTimeline latitude={coords.latitude} longitude={coords.longitude} />
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
              <VStack alignItems="center" gap={4} height="100%" justifyContent="center">
              <Text 
                fontSize="sm" 
                color="white" 
                opacity={0.7}
                textTransform="uppercase" 
                fontWeight="600"
                letterSpacing="0.1em"
              >
                Current Snow Conditions
              </Text>
              <VStack alignItems="flex-start" gap={2} flex="1" justifyContent="center" width="100%">
             
           

                <SimpleGrid columns={{ base: 2, md: 2 }} gap={3} width="100%" mt={2}>
                  <Box bg="whiteAlpha.100" borderRadius="md" px={3} py={3} border="1px solid rgba(255,255,255,0.08)">
                    <Text color="white" fontWeight="700" fontSize="2xl" lineHeight={1.1}>
                      {derived.fresh24In.toFixed(1)}
                    </Text>
                    <Text fontSize="xs" color="white" opacity={0.75} textTransform="uppercase" letterSpacing="0.08em">
                      Fresh 24h
                    </Text>
                  </Box>
                  <Box bg="whiteAlpha.100" borderRadius="md" px={3} py={3} border="1px solid rgba(255,255,255,0.08)">
                    <Text color="white" fontWeight="700" fontSize="2xl" lineHeight={1.1}>
                      {derived.hasPastData ? `${derived.past72In.toFixed(1)}` : 'N/A'}
                    </Text>
                    <Text fontSize="xs" color="white" opacity={0.75} textTransform="uppercase" letterSpacing="0.08em">
                      Past 72h
                    </Text>
                  </Box>
                  <Box bg="whiteAlpha.100" borderRadius="md" px={3} py={3} border="1px solid rgba(255,255,255,0.08)">
                    <Text color="white" fontWeight="700" fontSize="2xl" lineHeight={1.1}>
                      {derived.next72In.toFixed(1)}
                    </Text>
                    <Text fontSize="xs" color="white" opacity={0.75} textTransform="uppercase" letterSpacing="0.08em">
                      Next 72h (fcst)
                    </Text>
                  </Box>
                  <Box bg="whiteAlpha.100" borderRadius="md" px={3} py={3} border="1px solid rgba(255,255,255,0.08)">
                    <Text color="white" fontWeight="700" fontSize="2xl" lineHeight={1.1}>
                      {derived.total7dIn.toFixed(1)}
                    </Text>
                    <Text fontSize="xs" color="white" opacity={0.75} textTransform="uppercase" letterSpacing="0.08em">
                      7‑day total
                    </Text>
                  </Box>
                </SimpleGrid>

                <Text fontSize="sm" color="white" opacity={0.7} mt={2}>
                  Avg {Math.round(derived.tempAvg)}°C • Wind {Math.round(derived.windMax)} km/h • Precip {Math.round(derived.precipProb)}%
                </Text>
              </VStack>
            </VStack>
          </GlassCard>

          {/* Webcams Card */}
          <MountainWebcams mountain={selectedMountain} />
        </SimpleGrid>

           </Box>
    </Box>
  )
}

export default App
