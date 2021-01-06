import {
  Avatar,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiFillCode, AiOutlineSearch } from 'react-icons/ai';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../firebaseLib/auth';

const useSearchFocus = (targetKey: string) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (targetKey === e.key) {
        setIsFocused(true);
      }
    };

    const handleKeyUp = (e) => {
      if (targetKey === e.key) {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isFocused;
};

export const DashboardHeader = () => {
  const { user } = useAuth();

  const loading = user === null;

  const slashFocus = useSearchFocus('/');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (slashFocus) {
      inputRef.current.focus();
    }
  }, [slashFocus]);

  const { onSearch, formUtils } = useSearch();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

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

      <Flex align="center" w="50%">
        <InputGroup>
          <InputLeftElement
            children={<Icon as={AiOutlineSearch} color="gray.500" />}
          />
          <Input
            name="q"
            ref={(e) => {
              inputRef.current = e;
              formUtils.register(e, { required: true });
            }}
            onKeyPress={handleKeyPress}
            w="full"
            placeholder="Search for some fresh ideas :)"
            _focus={{ borderColor: 'red.500' }}
          />

          <InputRightElement children={<Kbd color="gray.700">/</Kbd>} />
        </InputGroup>
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
            _hover={{ bg: 'red.400' }}
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
