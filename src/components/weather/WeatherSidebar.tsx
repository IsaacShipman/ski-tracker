import { Box, Text, VStack, HStack } from "@chakra-ui/react"
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react"
import type { WeatherData } from "@/types/weather"

interface WeatherSidebarProps {
  weather: WeatherData
}

const getWeatherIcon = (conditions: WeatherData['conditions']) => {
  const iconProps = { size: 220, strokeWidth: 1.5 }
  
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
    default:
      return <Cloud {...iconProps} />
  }
}

export function WeatherSidebar({ weather }: WeatherSidebarProps) {

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width={{ base: "100%", md: "330px", lg: "340px" }}
      color="white"
      zIndex={10}
      overflow="hidden"
    >
      {/* Glassmorphic overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px) saturate(180%)"
        css={{
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        borderTopRightRadius="24px"
        borderBottomRightRadius="24px"
        border="1px solid rgba(255, 255, 255, 0.3)"
        borderLeft="none"
        boxShadow="4px 0 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
        zIndex={1}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          borderTopRightRadius: "24px",
          borderBottomRightRadius: "24px",
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
      />

      {/* Main Content Container */}
      <VStack
        position="relative"
        height="100%"
        padding={{ base: 6, md: 8 }}
        gap={6}
        justifyContent="center"
        zIndex={2}
      >
        {/* Large Weather Icon at Top */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          opacity={0.9}
          filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))"
        >
          {getWeatherIcon(weather.conditions)}
        </Box>

        {/* Bottom Content */}
        <VStack gap={6} width="100%">
          {/* Today Label */}
          <Text
            fontSize="sm"
            fontWeight="600"
            opacity={0.7}
            textTransform="uppercase"
            letterSpacing="0.15em"
            textShadow="0 1px 4px rgba(0, 0, 0, 0.2)"
          >
            Today
          </Text>

          <Text
            fontSize="8xl"
            fontWeight="200"
            lineHeight="0.9"
            letterSpacing="-0.04em"
            textShadow="0 2px 20px rgba(0, 0, 0, 0.3)"
          >
            {weather.temperature.current}°
          </Text>
          <Text
            fontSize="xl"
            fontWeight="300"
            opacity={0.95}
            textTransform="uppercase"
            letterSpacing="0.1em"
            textShadow="0 1px 10px rgba(0, 0, 0, 0.2)"
          >
            {weather.conditions.description}
          </Text>

        {/* Stats Grid with Glass Cards */}
        <HStack
          width="100%"
          gap={3}
          justifyContent="center"
        >
          <VStack 
            gap={1.5} 
            flex={1}
            padding={4}
            borderRadius="2xl"
            background="rgba(255, 255, 255, 0.06)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            transition="all 0.3s ease"
            alignItems="center"
            _hover={{
              background: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px)"
            }}
          >
            <Text fontSize="2xs" opacity={0.7} textTransform="uppercase" letterSpacing="0.08em" fontWeight="500">
              High
            </Text>
            <Text fontSize="2xl" fontWeight="400" textShadow="0 1px 8px rgba(0, 0, 0, 0.2)">
              {weather.temperature.max}°
            </Text>
          </VStack>

          <VStack 
            gap={1.5} 
            flex={1}
            padding={4}
            borderRadius="2xl"
            background="rgba(255, 255, 255, 0.06)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            transition="all 0.3s ease"
            alignItems="center"
            _hover={{
              background: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px)"
            }}
          >
            <Text fontSize="2xs" opacity={0.7} textTransform="uppercase" letterSpacing="0.08em" fontWeight="500">
              Low
            </Text>
            <Text fontSize="2xl" fontWeight="400" textShadow="0 1px 8px rgba(0, 0, 0, 0.2)">
              {weather.temperature.min}°
            </Text>
          </VStack>

          <VStack 
            gap={1.5} 
            flex={1}
            padding={4}
            borderRadius="2xl"
            background="rgba(255, 255, 255, 0.06)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            transition="all 0.3s ease"
            alignItems="center"
            _hover={{
              background: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px)"
            }}
          >
            <Text fontSize="2xs" opacity={0.7} textTransform="uppercase" letterSpacing="0.08em" fontWeight="500">
              Wind
            </Text>
            <Text fontSize="2xl" fontWeight="400" textShadow="0 1px 8px rgba(0, 0, 0, 0.2)">
              {weather.wind.speed}
            </Text>
          </VStack>
        </HStack>

        {/* Additional Info Pills */}
      

        {/* Snowfall indicator if applicable */}
        {weather.snow && (weather.snow.last1h || weather.snow.last3h || weather.snow.last24h) && (
          <Box
            width="100%"
            padding={5}
            borderRadius="2xl"
            background="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(30px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            boxShadow="0 4px 24px 0 rgba(0, 0, 0, 0.25)"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
              background: "rgba(255, 255, 255, 0.14)",
              transform: "translateY(-2px)"
            }}
          >
            <Text fontSize="sm" opacity={0.85} fontWeight="500" letterSpacing="0.05em" marginBottom={2}>
            SNOWFALL (24H)
            </Text>
            <Text fontSize="3xl" fontWeight="300" textShadow="0 2px 15px rgba(0, 0, 0, 0.3)">
              {weather.snow.last24h || weather.snow.last3h || weather.snow.last1h}"
            </Text>
          </Box>
        )}
        </VStack>
      </VStack>
    </Box>
  )
}