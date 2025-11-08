import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ColorMode = "light" | "dark"

interface ColorModeContextType {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export interface ColorModeProviderProps {
  children?: ReactNode
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("chakra-ui-color-mode")
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(colorMode)
    localStorage.setItem("chakra-ui-color-mode", colorMode)
  }, [colorMode])

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode)
  }

  const toggleColorMode = () => {
    setColorModeState((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within ColorModeProvider")
  }
  return context
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? light : dark
}
