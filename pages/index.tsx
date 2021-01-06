import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { MainButton } from '../src/components/Button';
import { AiFillCode } from 'react-icons/ai';

export default function Home() {
  return (
    <Box w="100vw" h="100vh">
      <Flex w="full" align="center" justify="space-between" p={4}>
        <Flex align="center" fontSize="24px">
          <Icon as={AiFillCode} mr={2} fontSize="33px" />
          <Text fontSize="24px">Eg-Dev</Text>
        </Flex>
        <Flex>
          <Link href="/login">
            <Button p={4} mx={2}>
              Login
            </Button>
          </Link>

          <Link href="/explore">
            <MainButton>Explore</MainButton>
          </Link>
        </Flex>
      </Flex>

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
    </Box>
  );
}
