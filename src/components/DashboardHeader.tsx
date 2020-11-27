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
      borderTopWidth={4}
      borderTopColor="yellow.300"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <Flex align="center">
        <Icon as={AiOutlineCode} mx={1} fontSize="33px" />

        <Link href="/my-links">
          <ChakraLink size="sm" mx={4}>
            Ideas
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
