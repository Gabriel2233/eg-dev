import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SideHelper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      w="15%"
      align="center"
      justify="center"
      p={4}
      d={["none", "none", "flex"]}
    >
      {children}
    </Flex>
  );
};
