import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { Header } from "../src/components/Header";
import { VerticalLayout } from "../src/components/VerticalLayout";
import Link from "next/link";
import { MainButton } from "../src/components/Button";

export default function Home() {
  return (
    <VerticalLayout>
      <Header>
        <Link href="/login">
          <Button p={4} mx={2}>
            Login
          </Button>
        </Link>

        <Link href="/explore">
          <MainButton>Explore</MainButton>
        </Link>
      </Header>

      <Flex w="full" align="center" justify="center" flexDir="column" mt="4rem">
        <Heading size="xl" px={2} my={2}>
          Sometimes we just need an Idea.
        </Heading>
        <Text px={2} fontSize="20px" mb={6} textAlign="center" w="50%">
          We can help you develop great apps providing the best ideas. You can
          create your own, or you can receive some help when you need.
          <br /> Pretty cool huh?
        </Text>
        <MainButton p={6}>Let's get Started!</MainButton>
      </Flex>
    </VerticalLayout>
  );
}
