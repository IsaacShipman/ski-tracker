// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs

export interface WeatherCondition {
  main: string
  description: string
}

export const getWeatherCondition = (code: number): WeatherCondition => {
  const weatherMap: Record<number, WeatherCondition> = {
    0: { main: 'Clear', description: 'Clear sky' },
    1: { main: 'Clear', description: 'Mainly clear' },
    2: { main: 'Clouds', description: 'Partly cloudy' },
    3: { main: 'Clouds', description: 'Overcast' },
    45: { main: 'Fog', description: 'Fog' },
    48: { main: 'Fog', description: 'Depositing rime fog' },
    51: { main: 'Drizzle', description: 'Light drizzle' },
    53: { main: 'Drizzle', description: 'Moderate drizzle' },
    55: { main: 'Drizzle', description: 'Dense drizzle' },
    56: { main: 'Drizzle', description: 'Light freezing drizzle' },
    57: { main: 'Drizzle', description: 'Dense freezing drizzle' },
    61: { main: 'Rain', description: 'Slight rain' },
    63: { main: 'Rain', description: 'Moderate rain' },
    65: { main: 'Rain', description: 'Heavy rain' },
    66: { main: 'Rain', description: 'Light freezing rain' },
    67: { main: 'Rain', description: 'Heavy freezing rain' },
    71: { main: 'Snow', description: 'Slight snow fall' },
    73: { main: 'Snow', description: 'Moderate snow fall' },
    75: { main: 'Snow', description: 'Heavy snow fall' },
    77: { main: 'Snow', description: 'Snow grains' },
    80: { main: 'Rain', description: 'Slight rain showers' },
    81: { main: 'Rain', description: 'Moderate rain showers' },
    82: { main: 'Rain', description: 'Violent rain showers' },
    85: { main: 'Snow', description: 'Slight snow showers' },
    86: { main: 'Snow', description: 'Heavy snow showers' },
    95: { main: 'Thunderstorm', description: 'Thunderstorm' },
    96: { main: 'Thunderstorm', description: 'Thunderstorm with slight hail' },
    99: { main: 'Thunderstorm', description: 'Thunderstorm with heavy hail' },
  }

  return weatherMap[code] || { main: 'Unknown', description: 'Unknown conditions' }
}

export const getWeatherIcon = (code: number): string => {
  if (code === 0 || code === 1) return '☀️'
  if (code === 2) return '⛅'
  if (code === 3) return '☁️'
  if (code === 45 || code === 48) return '🌫️'
  if (code >= 51 && code <= 57) return '🌧️'
  if (code >= 61 && code <= 67) return '🌧️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 80 && code <= 82) return '🌧️'
  if (code >= 85 && code <= 86) return '🌨️'
  if (code >= 95 && code <= 99) return '⛈️'
  return '❓'
}
