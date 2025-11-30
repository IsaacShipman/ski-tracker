import { Box } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
}

export function GlassCard({ children }: GlassCardProps) {
  return (
    <Box
      position="relative"
      padding={8}
      display="flex"
      flexDirection="column"
      bg="whiteAlpha.100"
      backdropFilter="blur(18px) saturate(160%)"
      css={{ WebkitBackdropFilter: "blur(18px) saturate(160%)" }}
      borderRadius="24px"
      boxShadow="0 8px 32px 0 rgba(13, 16, 35, 0.35)"
      border="1px solid rgba(255, 255, 255, 0.14)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px 0 rgba(13, 16, 35, 0.45)",
      }}
    >
      <Box position="relative" zIndex={1} flex="1" display="flex" flexDirection="column">
        {children}
      </Box>
    </Box>
  )
}
