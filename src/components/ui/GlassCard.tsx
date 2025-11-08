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
      minHeight="400px"
      display="flex"
      flexDirection="column"
      background="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(20px) saturate(180%)"
      css={{
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
      borderRadius="24px"
      border="1px solid rgba(255, 255, 255, 0.3)"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        borderRadius: "24px",
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
    >
      <Box position="relative" zIndex={1} flex="1" display="flex" flexDirection="column">
        {children}
      </Box>
    </Box>
  )
}
