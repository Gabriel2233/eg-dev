import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineCode } from "react-icons/ai";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <Flex w="full" p={6} align="center" justify="space-between">
      <Flex align="center">
        <Icon as={AiOutlineCode} mx={2} fontSize="33px" />
        <Heading size="md">Eg-Dev</Heading>
      </Flex>

      <Flex align="center">{children}</Flex>
    </Flex>
  );
};
