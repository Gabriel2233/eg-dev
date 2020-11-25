import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { Header } from "../src/components/Header";
import { VerticalLayout } from "../src/components/VerticalLayout";

import { FiArrowLeft, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useAuth } from "../src/firebaseLib/auth";

export default function Login() {
  const { back } = useRouter();
  const { signinWithGoogle, signinWithGitHub } = useAuth();

  return (
    <VerticalLayout>
      <Header>
        <Button mx={4} p={4} onClick={() => back()}>
          <Icon as={FiArrowLeft} mr={2} />
          Back Home
        </Button>
      </Header>

      <Flex
        w="full"
        align="center"
        justify="center"
        flexDir="column"
        my={"4rem"}
      >
        <Heading size="xl" my={8}>
          Login
        </Heading>

        <Button
          p={8}
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          my={2}
          w="250px"
          onClick={() => signinWithGitHub("/dashboard")}
        >
          <Icon as={FiGithub} mr={2} />
          Continue with GitHub
        </Button>

        <Button
          p={8}
          bg="white"
          _hover={{ bg: "gray.200" }}
          my={4}
          w="250px"
          borderWidth={2}
          borderColor="gray.300"
          onClick={() => signinWithGoogle("/dashboard")}
        >
          <Icon as={FcGoogle} mr={2} />
          Continue with Google
        </Button>
      </Flex>
    </VerticalLayout>
  );
}
