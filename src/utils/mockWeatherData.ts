import type { WeatherData, SkiConditions } from "@/types/weather"

export const mockWeatherData: WeatherData[] = [
  {
    date: "Monday",
    temperature: {
      current: 28,
      min: 22,
      max: 32,
      feelsLike: 20,
    },
    conditions: {
      id: 600,
      main: "Snow",
      description: "Light snow",
      icon: "🌨️",
    },
    wind: {
      speed: 12,
      direction: 270,
      gust: 18,
    },
    snow: {
      last24h: 4,
    },
    visibility: 5,
    humidity: 85,
    pressure: 1013,
    cloudCover: 90,
  },
  {
    date: "Tuesday",
    temperature: {
      current: 25,
      min: 18,
      max: 28,
      feelsLike: 18,
    },
    conditions: {
      id: 601,
      main: "Snow",
      description: "Moderate snow",
      icon: "❄️",
    },
    wind: {
      speed: 15,
      direction: 280,
      gust: 22,
    },
    snow: {
      last24h: 8,
    },
    visibility: 3,
    humidity: 88,
    pressure: 1011,
    cloudCover: 95,
  },
  {
    date: "Wednesday",
    temperature: {
      current: 30,
      min: 24,
      max: 35,
      feelsLike: 26,
    },
    conditions: {
      id: 803,
      main: "Clouds",
      description: "Partly cloudy",
      icon: "⛅",
    },
    wind: {
      speed: 8,
      direction: 220,
      gust: 12,
    },
    snow: {
      last24h: 0,
    },
    visibility: 10,
    humidity: 70,
    pressure: 1015,
    cloudCover: 60,
  },
  {
    date: "Thursday",
    temperature: {
      current: 32,
      min: 28,
      max: 36,
      feelsLike: 30,
    },
    conditions: {
      id: 800,
      main: "Clear",
      description: "Clear sky",
      icon: "☀️",
    },
    wind: {
      speed: 6,
      direction: 180,
      gust: 10,
    },
    snow: {
      last24h: 0,
    },
    visibility: 10,
    humidity: 65,
    pressure: 1018,
    cloudCover: 10,
  },
  {
    date: "Friday",
    temperature: {
      current: 26,
      min: 20,
      max: 30,
      feelsLike: 22,
    },
    conditions: {
      id: 802,
      main: "Clouds",
      description: "Scattered clouds",
      icon: "☁️",
    },
    wind: {
      speed: 10,
      direction: 250,
      gust: 15,
    },
    snow: {
      last24h: 0,
    },
    visibility: 8,
    humidity: 75,
    pressure: 1016,
    cloudCover: 50,
  },
  {
    date: "Saturday",
    temperature: {
      current: 22,
      min: 16,
      max: 26,
      feelsLike: 15,
    },
    conditions: {
      id: 600,
      main: "Snow",
      description: "Heavy snow",
      icon: "❄️",
    },
    wind: {
      speed: 18,
      direction: 290,
      gust: 25,
    },
    snow: {
      last24h: 12,
    },
    visibility: 2,
    humidity: 92,
    pressure: 1008,
    cloudCover: 100,
  },
  {
    date: "Sunday",
    temperature: {
      current: 20,
      min: 14,
      max: 24,
      feelsLike: 12,
    },
    conditions: {
      id: 601,
      main: "Snow",
      description: "Light snow",
      icon: "🌨️",
    },
    wind: {
      speed: 14,
      direction: 275,
      gust: 20,
    },
    snow: {
      last24h: 6,
    },
    visibility: 4,
    humidity: 88,
    pressure: 1010,
    cloudCover: 85,
  },
]

export const mockSkiConditions: SkiConditions[] = [
  {
    quality: "good",
    score: 75,
    factors: {
      snowfall: 80,
      temperature: 85,
      wind: 70,
      visibility: 65,
    },
  },
  {
    quality: "excellent",
    score: 90,
    factors: {
      snowfall: 95,
      temperature: 90,
      wind: 85,
      visibility: 90,
    },
  },
  {
    quality: "excellent",
    score: 85,
    factors: {
      snowfall: 70,
      temperature: 90,
      wind: 95,
      visibility: 100,
    },
  },
  {
    quality: "good",
    score: 80,
    factors: {
      snowfall: 60,
      temperature: 85,
      wind: 90,
      visibility: 100,
    },
  },
]
