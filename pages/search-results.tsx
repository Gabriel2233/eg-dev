import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { TiArrowRight } from 'react-icons/ti';
import { FiHeart } from 'react-icons/fi';
import { Header } from '../src/components/Header';
import { useSearch } from '../src/contexts/SearchContext';
import { DbIdea } from '../types/types';
import Link from 'next/link';
import { useFavorites } from '../src/contexts/FavoritesContext';

export default function SearchResults() {
  const { searchData } = useSearch();

  return (
    <Box h="100vh" bg="gray.100">
      <Header text="Search Results" />

      <Flex w="full" align="center" justify="center" flexDir="column" mt="4rem">
        {searchData.map((idea) => (
          <IdeaResultCard idea={idea} key={idea.id} />
        ))}
      </Flex>
    </Box>
  );
}

const IdeaResultCard = ({ idea }: { idea: DbIdea }) => {
  const { onIdeaLike } = useFavorites();

  return (
    <Flex
      background="white"
      w="60%"
      flexDir="column"
      align="start"
      justify="center"
      p={4}
      m={6}
      rounded="8px"
      transition="0.4s ease"
      _hover={{ boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)' }}
    >
      <Flex w="full" align="center" justify="space-between" p={2}>
        <Heading size="lg">{idea.name}</Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={() => onIdeaLike(idea.id)}
        >
          <Icon as={FiHeart} />
        </Button>
      </Flex>

      <Divider h="10px" />

      <Flex w="full" p={4} my={4}>
        <Text color="gray.600">{idea.briefDescription}</Text>
      </Flex>

      <Flex w="full" justify="flex-end">
        <Link href={`/ideas/${idea.id}`}>
          <Button>
            More
            <Icon as={TiArrowRight} fontSize="22px" />
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
