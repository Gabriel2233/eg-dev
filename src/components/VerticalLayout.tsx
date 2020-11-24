import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const VerticalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex w="full" h="full" align="center" flexDir="column">
      {children}
    </Flex>
  );
};
