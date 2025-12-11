import { useState, useCallback } from 'react'
import { API_BASE_URL } from '@/config/api'

export interface DetailedDailyWeatherData {
  date: string
  weather_code: number
  temperature_2m_max: number
  temperature_2m_min: number
  snowfall_sum: number
  precipitation_probability_max: number
  wind_speed_10m_max: number
  apparent_temperature_max: number
  apparent_temperature_min: number
  wind_gusts_10m_max: number
  wind_direction_10m_dominant: number
  sunrise: number
  sunset: number
  daylight_duration: number
  sunshine_duration: number
  uv_index_max: number
  uv_index_clear_sky_max: number
  rain_sum: number
  showers_sum: number
  precipitation_sum: number
  precipitation_hours: number
}

interface DetailedWeatherResponse {
  latitude: number
  longitude: number
  elevation: number
  timezone: string
  timezone_abbreviation: string
  timezone_offset_seconds: number
  daily_data: DetailedDailyWeatherData[]
}

export const useDayWeather = () => {
  const [data, setData] = useState<DetailedWeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDayWeather = useCallback(async (
    date: string,
    latitude: number = 49.7236,
    longitude: number = -118.929
  ) => {
    try {
      setLoading(true)
      setError(null)
      
      // Extract just the date part (YYYY-MM-DD) from ISO string
      const dateOnly = date.split('T')[0]
      
      const response = await fetch(
        `${API_BASE_URL}/api/ski-tracker/weather/day?latitude=${latitude}&longitude=${longitude}&start_date=${dateOnly}&end_date=${dateOnly}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch detailed weather data')
      }
      
      const weatherData = await response.json()
      setData(weatherData)
      return weatherData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Error fetching day weather:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchDayWeather }
}
