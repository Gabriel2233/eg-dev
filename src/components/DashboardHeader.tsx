import { Avatar, Flex, Icon, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineCode } from "react-icons/ai";

export const DashboardHeader = () => {
  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      p={4}
      backgroundColor="white"
      borderTopWidth={4}
      borderTopColor="red.400"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <Flex align="center">
        <Link href="/dashboard">
          <Icon cursor="pointer" as={AiOutlineCode} mx={1} fontSize="33px" />
        </Link>

        <Link href="/explore">
          <ChakraLink size="sm" mx={4}>
            Explore
          </ChakraLink>
        </Link>

        <Link href="/new-idea">
          <ChakraLink size="sm">Create</ChakraLink>
        </Link>

        <Link href="/new-idea">
          <ChakraLink size="sm" mx={4}>
            Favorites
          </ChakraLink>
        </Link>
      </Flex>

      <Flex align="center">
        <Avatar size="sm" />
      </Flex>
    </Flex>
  );
};
