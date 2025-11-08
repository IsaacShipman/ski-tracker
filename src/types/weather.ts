export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherData {
  date: string
  temperature: {
    current: number
    min: number
    max: number
    feelsLike: number
  }
  conditions: WeatherCondition
  wind: {
    speed: number
    direction: number
    gust?: number
  }
  snow: {
    last1h?: number
    last3h?: number
    last24h?: number
  }
  visibility: number
  humidity: number
  pressure: number
  cloudCover: number
}

export interface WeatherForecast {
  daily: WeatherData[]
  hourly: WeatherData[]
}

export type WeatherQuality = 'excellent' | 'good' | 'fair' | 'poor'

export interface SkiConditions {
  quality: WeatherQuality
  score: number
  factors: {
    snowfall: number
    temperature: number
    wind: number
    visibility: number
  }
}
