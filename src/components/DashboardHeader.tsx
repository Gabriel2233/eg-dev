import { Avatar, Flex, Icon, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillCode } from "react-icons/ai";
import { useAuth } from "../firebaseLib/auth";

export const DashboardHeader = () => {
  const { user } = useAuth();

  const loading = user === null;

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
          <div>
            <Icon cursor="pointer" as={AiFillCode} mx={1} fontSize="33px" />
          </div>
        </Link>

        <Link href="/explore">
          <ChakraLink size="sm" mx={4}>
            Explore
          </ChakraLink>
        </Link>

        <Link href="/new-idea">
          <ChakraLink size="sm">Create</ChakraLink>
        </Link>
      </Flex>

      <Flex align="center">
        <Link href="/profile">
          <Avatar size="sm" cursor="pointer" src={!loading && user.photoUrl} />
        </Link>
      </Flex>
    </Flex>
  );
};
