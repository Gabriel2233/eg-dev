import { DashboardHeader } from "../src/components/DashboardHeader";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Box,
  Th,
  Flex,
  Icon,
  Text,
  Link,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useAuth } from "../src/firebaseLib/auth";
import { fetcher } from "../src/utils/fetcher";
import { DbIdea } from "../types/types";

import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiShare, FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  const { data, error } = useSWR<DbIdea[]>(
    !user ? null : ["/api/ideas/get-my-ideas", user.uid],
    fetcher
  );

  if (error) return "error";

  return (
    <Box bg="gray.100" h="100vh">
      <DashboardHeader />

      <Flex w="full" align="center" justify="center" mt="3rem">
        {data ? (
          <Table size="md" p={8} bg="white" w="80%" rounded="10px">
            <Thead bg="gray.200">
              <Tr>
                <Th>Idea Name</Th>
                <Th>Difficulty</Th>
                <Th>Demo Available</Th>
                <Th>Info</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((idea, i) => (
                <AnimatePresence custom={i}>
                  <TableItem idea={idea} index={i} />
                </AnimatePresence>
              ))}
            </Tbody>
          </Table>
        ) : (
          <h1>Loading data...</h1>
        )}
      </Flex>
    </Box>
  );
}

const TableItem = ({ idea, index }: { idea: DbIdea; index: number }) => {
  return (
    <>
      <Tr
        key={idea.id}
        as={motion.tr}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Td fontWeight="bold">{idea.name}</Td>
        <Td>
          <Badge
            colorScheme={
              idea.difficulty === "Easy"
                ? "green"
                : idea.difficulty === "Intermediate"
                ? "yellow"
                : "red"
            }
          >
            {idea.difficulty}
          </Badge>
        </Td>
        <Td>
          {idea.demo_url ? (
            <>
              <Icon as={HiCheckCircle} fontSize="20px" color="green.500" />
              <Link href={idea.demo_url} mx={4}>
                Access
              </Link>
            </>
          ) : (
            <Flex>
              <Icon as={HiXCircle} fontSize="20px" color="red.500" />
              <Text mx={4}>None</Text>
            </Flex>
          )}
        </Td>
        <Td>
          <TableItemMenu />
        </Td>
      </Tr>
    </>
  );
};

const TableItemMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Icon as={BsThreeDotsVertical} />
      </MenuButton>
      <MenuList>
        <MenuItem color="red.500">
          <Icon as={FiTrash} mr={6} />
          Delete
        </MenuItem>

        <MenuItem>
          <Icon as={FiShare} mr={6} />
          Share
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
