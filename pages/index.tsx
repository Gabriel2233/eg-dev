import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { Header } from "../src/components/Header";
import { VerticalLayout } from "../src/components/VerticalLayout";
import Link from "next/link";

export default function Home() {
  return (
    <VerticalLayout>
      <Header>
        <Link href="/login">
          <Button p={4} mx={2}>
            Login
          </Button>
        </Link>

        <Button p={4} mx={2} bg="yellow.300" _hover={{ bg: "yellow.400" }}>
          Explore
        </Button>
      </Header>

      <Flex w="full" align="center" justify="center">
        <Flex w="60%" align="start" flexDir="column" justify="center" p={16}>
          <Heading size="xl" px={2} my={2}>
            Sometimes we just need a Idea.
          </Heading>
          <Text px={2} fontSize="20px" mb={6}>
            We can help you develop great apps providing the best ideas.
            <br /> You can create your own, or you can receive some help when
            you need.
            <br /> Pretty cool huh?
          </Text>
          <Button p={4} mx={2} bg="yellow.300" _hover={{ bg: "yellow.400" }}>
            Let's get Started!
          </Button>
        </Flex>

        <Flex w="40%" align="center">
          <Image src="/taxi-programming.png" w="90%" h="90%" />
        </Flex>
      </Flex>
    </VerticalLayout>
  );
}
