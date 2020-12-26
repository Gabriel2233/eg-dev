import { Button, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { AiFillCode } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";

export const MobileNav = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Flex
      w="full"
      p={2}
      d={["flex", "flex", "none"]}
      align="center"
      justify="space-between"
      pos="fixed"
      top={0}
      backgroundColor="white"
      borderBottomWidth={2}
      borderBottomColor="gray.200"
    >
      <Button size="sm" onClick={() => router.back()} variant="ghost">
        <Icon as={GoChevronLeft} mr={2} />
        <Icon as={AiFillCode} fontSize="33px" />
      </Button>

      <Flex>{children}</Flex>
    </Flex>
  );
};
