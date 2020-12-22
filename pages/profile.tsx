import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillCode } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "../src/firebaseLib/auth";

import Link from "next/link";

export default function Profile() {
  const router = useRouter();

  const { user, signOut, loading } = useAuth();

  return (
    <Box w="full" h="full">
      <Flex
        w="full"
        align="center"
        justify="space-between"
        p={4}
        borderBottomWidth={2}
        borderBottomColor="gray.200"
      >
        <Flex align="center">
          <Icon as={AiFillCode} mr={2} fontSize="33px" />
          My Account
        </Flex>

        <CloseButton onClick={() => router.back()} />
      </Flex>

      <Flex w="full" align="center" justify="center">
        {loading ? (
          "Loading..."
        ) : (
          <Flex
            w="50%"
            align="start"
            flexDir="column"
            borderWidth={2}
            borderColor="gray.200"
            rounded="8px"
            mt="4rem"
          >
            <Flex justify="flex-start" align="center" w="full" p={6}>
              <Avatar src={user.photoUrl} size="md" />
              <Heading size="md" mx={4}>
                {user.name}
              </Heading>
            </Flex>

            <Grid
              w="full"
              templateColumns={"repeat(auto-fit, minmax(60px, 1fr))"}
              align="center"
              p={2}
            >
              <InfoCard title="Created Ideas" value="10" page="/dashboard" />
              <InfoCard title="Favorited Ideas" value="3" page="/dashboard" />
            </Grid>

            <Flex
              align="center"
              justify="flex-end"
              p={4}
              w="full"
              borderTopWidth={2}
              borderTopColor="gray.200"
              mt={8}
            >
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: "red.400" }}
                onClick={signOut}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

type TInfoCard = {
  title: string;
  value: string;
  page: string;
};

const InfoCard = ({ page, value, title }: TInfoCard) => {
  return (
    <Flex
      m={4}
      flexDir="column"
      align="center"
      justify="center"
      borderWidth={2}
      borderColor="gray.200"
      rounded="4px"
    >
      <Text textAlign="start" w="full" p={4}>
        {title}:
      </Text>
      <Heading size="lg">{value}</Heading>
      <Link href={page}>
        <Button variant="ghost" d="flex" alignSelf="flex-end" mx={4} my={2}>
          View
          <Icon as={FiArrowRight} ml={2} color="red.500" />
        </Button>
      </Link>
    </Flex>
  );
};
