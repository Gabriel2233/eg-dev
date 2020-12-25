import { Button, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { AiFillCode } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";

export const MobileNav = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Flex w="100vw" background="gray.400" justify="space-between" zIndex={999}>
      <Button
        pos="fixed"
        top={0}
        m={6}
        onClick={() => router.back()}
        variant="ghost"
      >
        <Icon as={GoChevronLeft} mr={2} />
        <Icon as={AiFillCode} fontSize="33px" />
      </Button>

      <Flex align="center">{children}</Flex>
    </Flex>
  );
};
