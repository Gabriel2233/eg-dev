import {
  Avatar,
  Button,
  Flex,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";
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
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <Flex align="center">
        <Link href="/dashboard">
          <div>
            <Icon cursor="pointer" as={AiFillCode} mx={1} fontSize="33px" />
          </div>
        </Link>
      </Flex>

      <Flex align="center">
        <Link href="/explore">
          <Button size="sm" mx={2}>
            Explore
          </Button>
        </Link>

        <Link href="/new-idea">
          <Button
            size="sm"
            mx={2}
            mr={4}
            bg="red.500"
            _hover={{ bg: "red.400" }}
            color="white"
          >
            Create
          </Button>
        </Link>

        <Link href="/profile">
          <Avatar size="sm" cursor="pointer" src={!loading && user.photoUrl} />
        </Link>
      </Flex>
    </Flex>
  );
};
