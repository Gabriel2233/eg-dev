import { DashboardHeader } from '../src/components/DashboardHeader';
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
  Badge,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { useAuth } from '../src/firebaseLib/auth';
import { DbIdea } from '../types/types';

import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiShare, FiTrash } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFavorites } from '../src/contexts/FavoritesContext';

type TSelect = {
  dataType: string;
};

export default function Dashboard() {
  const { user } = useAuth();

  const { register, handleSubmit, errors } = useForm<TSelect>();

  const { favorites } = useFavorites();

  const [currentApiCall, setCurrentApiCall] = useState<string>('get-my-ideas');

  const toggleVisualization = (data: TSelect) => {
    setCurrentApiCall(data['dataType']);
  };

  const [data, setData] = useState<DbIdea[]>([]);

  const [dataLoading, setDataLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAproppiateDataType() {
      setDataLoading(true);

      if (currentApiCall === 'get-my-ideas') {
        const res = await fetch(`/api/ideas/${currentApiCall}`);

        const data = await res.json();

        setData(data);
      } else {
        if (favorites.length > 0) {
          const res = await fetch(
            `/api/ideas/${currentApiCall}?favs=${favorites}`
          );

          const data = await res.json();

          setData(data);
        } else {
          setData([]);
        }
      }

      setDataLoading(false);
    }

    getAproppiateDataType();
  }, [currentApiCall]);

  return (
    <Box h="100vh" bg="gray.100" w="100vw">
      <DashboardHeader />

      <Flex align="center" justify="space-between" p={8}>
        <Heading
          size="lg"
          as={motion.h1}
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
        >
          {currentApiCall === 'get-my-favorites' ? 'My Favorites' : 'My Ideas'}
        </Heading>

        <Select
          bg="white"
          w="200px"
          color="gray.600"
          defaultValue="My Ideas"
          ref={register}
          onClick={handleSubmit(toggleVisualization)}
          name="dataType"
          _focus={{ borderColor: 'gray.200' }}
        >
          <option value="get-my-ideas">My Ideas</option>
          <option value="get-my-favorites">Favorites</option>
        </Select>
      </Flex>

      <Flex w="full" align="center" justify="center" mt={8}>
        {dataLoading ? (
          <Spinner thickness="4px" emptyColor="gray.200" color="red.500" />
        ) : (
          <IdeaTable data={data} />
        )}
      </Flex>
    </Box>
  );
}

const IdeaTable = ({ data }: { data: DbIdea[] }) => {
  return (
    <>
      {data.length === 0 ? (
        'Empty'
      ) : (
        <Table size="md" p={[0, null, 8]} bg="white" w="80%">
          <Thead bg="gray.200">
            <Tr>
              <Th>Idea Name</Th>
              <Th d={['none']}>Difficulty</Th>
              <Th d={['none']}>Demo Available</Th>
              <Th>Info</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((idea, i) => (
              <AnimatePresence custom={i} key={i}>
                <TableItem idea={idea} />
              </AnimatePresence>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

const TableItem = ({ idea }: { idea: DbIdea }) => {
  return (
    <>
      <Tr
        cursor="pointer"
        key={idea.id}
        as={motion.tr}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
        background="white"
      >
        <Td fontWeight="bold">
          <Link href={`/ideas/${idea.id}`}>
            <ChakraLink>{idea.name}</ChakraLink>
          </Link>
        </Td>
        <Td d={['none']}>
          <Badge
            colorScheme={
              idea.difficulty === 'Easy'
                ? 'green'
                : idea.difficulty === 'Intermediate'
                ? 'yellow'
                : 'red'
            }
          >
            {idea.difficulty}
          </Badge>
        </Td>
        <Td d={['none']}>
          {idea.demo_url ? (
            <>
              <Icon as={HiCheckCircle} fontSize="20px" color="green.500" />
              <Link href={idea.demo_url}>
                <ChakraLink ml={2}>Access</ChakraLink>
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
