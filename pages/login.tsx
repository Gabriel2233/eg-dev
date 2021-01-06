import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { FiArrowLeft, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useAuth } from '../src/firebaseLib/auth';
import { AiFillCode } from 'react-icons/ai';

export default function Login() {
  const { back } = useRouter();
  const { signinWithGoogle, signinWithGitHub } = useAuth();

  return (
    <Box w="100vw" h="100vh">
      <Flex
        w="full"
        align="center"
        justify="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        p={4}
      >
        <Flex align="center">
          <Icon as={AiFillCode} mr={2} fontSize="33px" />
          <Text fontSize="24px">Eg-Dev</Text>
        </Flex>

        <Button mx={4} p={4} onClick={() => back()}>
          <Icon as={FiArrowLeft} mr={2} />
          Back Home
        </Button>
      </Flex>

      <Flex
        w="full"
        align="center"
        justify="center"
        flexDir="column"
        my={'4rem'}
      >
        <Heading size="xl" my={8}>
          Login
        </Heading>

        <Button
          p={8}
          bg="black"
          color="white"
          _hover={{ bg: 'gray.800' }}
          my={2}
          w="250px"
          onClick={() => signinWithGitHub('/dashboard')}
        >
          <Icon as={FiGithub} mr={2} />
          Continue with GitHub
        </Button>

        <Button
          p={8}
          bg="white"
          _hover={{ bg: 'gray.200' }}
          my={4}
          w="250px"
          borderWidth={2}
          borderColor="gray.300"
          onClick={() => signinWithGoogle('/dashboard')}
        >
          <Icon as={FcGoogle} mr={2} />
          Continue with Google
        </Button>
      </Flex>
    </Box>
  );
}
