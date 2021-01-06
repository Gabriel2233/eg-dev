import { CloseButton, Flex, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillCode } from 'react-icons/ai';

export const Header = ({ text }: { text: string }) => {
  const router = useRouter();

  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      p={4}
      borderBottomWidth={2}
      borderBottomColor="gray.200"
      background="white"
    >
      <Flex align="center">
        <Icon as={AiFillCode} mr={2} fontSize="33px" />
        {text}
      </Flex>

      <CloseButton onClick={() => router.back()} />
    </Flex>
  );
};
