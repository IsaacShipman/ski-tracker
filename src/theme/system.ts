import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Sky-inspired blues from the weather theme
        sky: {
          50: { value: "#F0F7FF" },
          100: { value: "#E8F3FC" },
          200: { value: "#D1E7F8" },
          300: { value: "#A8C9E8" },
          400: { value: "#7BA7D6" },
          500: { value: "#5B8EC4" },
          600: { value: "#4A75A8" },
          700: { value: "#3A5C86" },
          800: { value: "#2D4664" },
          900: { value: "#1E2F42" },
        },
        // Cloud whites for glassmorphic elements
        cloud: {
          50: { value: "#FFFFFF" },
          100: { value: "#F8FBFF" },
          200: { value: "#F0F6FC" },
          300: { value: "#E5EFF8" },
          400: { value: "#D8E8F5" },
          500: { value: "#C5DCF0" },
          600: { value: "#B0CFEA" },
          700: { value: "#98BCE0" },
          800: { value: "#7FA9D6" },
          900: { value: "#6696CC" },
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
        heading: { value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" },
        body: { value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" },
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
        sm: { value: "0.5rem" },
        md: { value: "0.75rem" },
        lg: { value: "1rem" },
        xl: { value: "1.5rem" },
        "2xl": { value: "1.5rem" },
      },
      shadows: {
        sm: { value: "0 2px 8px rgba(31, 38, 135, 0.1)" },
        md: { value: "0 4px 16px rgba(31, 38, 135, 0.15)" },
        lg: { value: "0 8px 32px rgba(31, 38, 135, 0.2)" },
        xl: { value: "0 12px 48px rgba(31, 38, 135, 0.25)" },
      },
    },
    semanticTokens: {
      colors: {
        sky: {
          solid: { value: "{colors.sky.500}" },
          contrast: { value: "{colors.sky.50}" },
          fg: { value: "{colors.sky.700}" },
          muted: { value: "{colors.sky.100}" },
          subtle: { value: "{colors.sky.200}" },
          emphasized: { value: "{colors.sky.600}" },
          focusRing: { value: "{colors.sky.400}" },
        },
        cloud: {
          solid: { value: "{colors.cloud.500}" },
          contrast: { value: "{colors.cloud.50}" },
          fg: { value: "{colors.sky.700}" },
          muted: { value: "{colors.cloud.100}" },
          subtle: { value: "{colors.cloud.200}" },
          emphasized: { value: "{colors.cloud.600}" },
          focusRing: { value: "{colors.cloud.400}" },
        },
        alert: {
          solid: { value: "{colors.alert.500}" },
          contrast: { value: "{colors.alert.50}" },
          fg: { value: "{colors.alert.800}" },
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
      bg: "linear-gradient(135deg, #7BA7D6 0%, #A8C9E8 50%, #E8F3FC 100%)",
      minH: "100vh",
      color: "sky.700",
    },
    // Glassmorphic card styling
    ".card-glass": {
      bg: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
    },
    // Button styling
    ".btn-glass": {
      bg: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      _hover: {
        bg: "rgba(255, 255, 255, 0.95)",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 24px rgba(31, 38, 135, 0.2)",
      },
    },
    // Input styling
    ".input-glass": {
      bg: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      _hover: {
        bg: "rgba(255, 255, 255, 0.6)",
      },
      _focus: {
        bg: "rgba(255, 255, 255, 0.7)",
        borderColor: "sky.300",
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
