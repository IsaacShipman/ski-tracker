import { useState, useEffect } from 'react'

interface DailyWeatherData {
  date: string
  weather_code: number
  temperature_2m_max: number
  temperature_2m_min: number
  snowfall_sum: number
  precipitation_probability_max: number
  wind_speed_10m_max: number
}

interface WeatherDailyResponse {
  latitude: number
  longitude: number
  elevation: number
  timezone: string
  timezone_abbreviation: string
  timezone_offset_seconds: number
  daily_data: DailyWeatherData[]
}

export const useWeatherForecast = (latitude: number = 49.7236, longitude: number = -118.929) => {
  const [data, setData] = useState<WeatherDailyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:8000/api/ski-tracker/weather/7days?latitude=${latitude}&longitude=${longitude}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        
        const weatherData = await response.json()
        setData(weatherData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching weather:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [latitude, longitude])

  return { data, loading, error }
}
