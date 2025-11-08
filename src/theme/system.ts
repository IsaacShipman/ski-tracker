import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Ski-themed brand colors - cool blues and whites representing snow and sky
        brand: {
          50: { value: "#e6f4ff" },
          100: { value: "#cce8ff" },
          200: { value: "#99d1ff" },
          300: { value: "#66baff" },
          400: { value: "#33a3ff" },
          500: { value: "#0088ff" },
          600: { value: "#006dcc" },
          700: { value: "#005299" },
          800: { value: "#003766" },
          900: { value: "#001c33" },
          950: { value: "#000e1a" },
        },
        // Mountain/Slate colors for UI elements
        mountain: {
          50: { value: "#f8f9fa" },
          100: { value: "#f1f3f5" },
          200: { value: "#e9ecef" },
          300: { value: "#dee2e6" },
          400: { value: "#ced4da" },
          500: { value: "#adb5bd" },
          600: { value: "#868e96" },
          700: { value: "#495057" },
          800: { value: "#343a40" },
          900: { value: "#212529" },
          950: { value: "#16191d" },
        },
        // Snow white accent
        snow: {
          50: { value: "#ffffff" },
          100: { value: "#fefefe" },
          200: { value: "#fcfcfc" },
          300: { value: "#fafafa" },
          400: { value: "#f7f7f7" },
          500: { value: "#f5f5f5" },
          600: { value: "#e8e8e8" },
          700: { value: "#d1d1d1" },
          800: { value: "#bababa" },
          900: { value: "#a3a3a3" },
        },
        // Warning colors for weather alerts
        alert: {
          50: { value: "#fff8e6" },
          100: { value: "#ffefcc" },
          200: { value: "#ffe099" },
          300: { value: "#ffd066" },
          400: { value: "#ffc133" },
          500: { value: "#ffb100" },
          600: { value: "#cc8e00" },
          700: { value: "#996a00" },
          800: { value: "#664700" },
          900: { value: "#332300" },
        },
      },
      fonts: {
        heading: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
        body: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
      },
      radii: {
        sm: { value: "0.25rem" },
        md: { value: "0.5rem" },
        lg: { value: "0.75rem" },
        xl: { value: "1rem" },
        "2xl": { value: "1.5rem" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.50}" },
          fg: { 
            value: { 
              _light: "{colors.brand.700}", 
              _dark: "{colors.brand.300}" 
            } 
          },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.600}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        mountain: {
          solid: { value: "{colors.mountain.600}" },
          contrast: { value: "{colors.mountain.50}" },
          fg: { 
            value: { 
              _light: "{colors.mountain.800}", 
              _dark: "{colors.mountain.200}" 
            } 
          },
          muted: { value: "{colors.mountain.100}" },
          subtle: { value: "{colors.mountain.200}" },
          emphasized: { value: "{colors.mountain.700}" },
          focusRing: { value: "{colors.mountain.500}" },
        },
        alert: {
          solid: { value: "{colors.alert.500}" },
          contrast: { value: "{colors.alert.50}" },
          fg: { 
            value: { 
              _light: "{colors.alert.800}", 
              _dark: "{colors.alert.300}" 
            } 
          },
          muted: { value: "{colors.alert.100}" },
          subtle: { value: "{colors.alert.200}" },
          emphasized: { value: "{colors.alert.600}" },
          focusRing: { value: "{colors.alert.500}" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: { _light: "snow.500", _dark: "mountain.950" },
      color: { _light: "mountain.900", _dark: "snow.100" },
    },
  },
})

export const system = createSystem(defaultConfig, config)
