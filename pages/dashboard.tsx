import { Box, Flex, Text } from "@chakra-ui/react";
import { DashboardHeader } from "../src/components/DashboardHeader";
import { IdeaCard } from "../src/components/IdeaCard";

export default function Dashboard() {
  return (
    <Box bg="gray.100" h="100%">
      <DashboardHeader />

      <Flex
        m="0 auto"
        align="center"
        flexDir="column"
        maxW="1250px"
        px={[0, 8, 8]}
      >
        <Flex
          w={["100%", null, "70%"]}
          mt={[null, null, "3rem"]}
          p={2}
          roundedTop="8px"
          background="gray.200"
          align="center"
          justify="space-between"
        >
          <Text color="gray.600" mx={8}>
            Name
          </Text>
          <Text color="gray.600" ml={10}>
            Demo
          </Text>
          <Text color="gray.600" mx={4}>
            Difficulty
          </Text>
        </Flex>
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </Flex>
    </Box>
  );
}
