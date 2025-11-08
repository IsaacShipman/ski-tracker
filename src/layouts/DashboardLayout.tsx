import { Box, Container, Flex, Heading, HStack, IconButton, Text } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Box minH="100vh" bg={{ _light: "snow.500", _dark: "mountain.950" }}>
      {/* Header */}
      <Box
        bg={{ _light: "white", _dark: "mountain.900" }}
        borderBottom="1px"
        borderColor={{ _light: "mountain.200", _dark: "mountain.800" }}
        position="sticky"
        top={0}
        zIndex={10}
        shadow="sm"
      >
        <Container maxW="container.2xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <HStack gap={4}>
              <Box
                fontSize="2xl"
                role="img"
                aria-label="Ski"
              >
                ⛷️
              </Box>
              <Heading
                size="lg"
                bgGradient="to-r"
                gradientFrom="brand.500"
                gradientTo="brand.700"
                bgClip="text"
              >
                Ski Weather Tracker
              </Heading>
            </HStack>

            <HStack gap={4}>
              <Text
                display={{ base: "none", md: "block" }}
                fontSize="sm"
                color={{ _light: "mountain.600", _dark: "mountain.400" }}
              >
                Find the perfect ski conditions
              </Text>
              <IconButton
                aria-label="Toggle color mode"
                onClick={toggleColorMode}
                variant="ghost"
                colorScheme="mountain"
              >
                {colorMode === "light" ? "🌙" : "☀️"}
              </IconButton>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.2xl" py={8}>
        {children}
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        mt="auto"
        py={6}
        borderTop="1px"
        borderColor={{ _light: "mountain.200", _dark: "mountain.800" }}
        bg={{ _light: "white", _dark: "mountain.900" }}
      >
        <Container maxW="container.2xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            gap={4}
          >
            <Text fontSize="sm" color={{ _light: "mountain.600", _dark: "mountain.400" }}>
              © 2025 Ski Weather Tracker. Stay safe on the slopes!
            </Text>
            <HStack gap={4} fontSize="sm">
              <Text color={{ _light: "mountain.600", _dark: "mountain.400" }}>
                Built with ❤️ for skiers
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
