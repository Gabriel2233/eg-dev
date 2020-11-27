import { Flex, Icon, Text } from "@chakra-ui/react";
import { DashboardHeader } from "../src/components/DashboardHeader";
import { IdeaCard } from "../src/components/IdeaCard";
import { VerticalLayout } from "../src/components/VerticalLayout";

export default function Dashboard() {
  return (
    <VerticalLayout>
      <DashboardHeader />

      <Flex
        w="full"
        align="center"
        justify="center"
        flexDir="column"
        background="gray.100"
      >
        <Flex
          mt={[null, null, "4rem"]}
          w={["100%", null, "70%"]}
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
      </Flex>
    </VerticalLayout>
  );
}
