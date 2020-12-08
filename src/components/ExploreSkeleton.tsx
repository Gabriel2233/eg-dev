import { Box, Flex } from "@chakra-ui/react";
import { SideHelper } from "./SideHelper";

export const ExploreSkeleton = () => {
  return (
    <Flex w="full" h="full" align="center" justify="center">
      <SideHelper>
        <Box isRound={true} w="50px" h="50px" bg="gray.600"></Box>
      </SideHelper>

      <Flex w="70%" flexDir="column" align="center" justify="center">
        aohaoh
      </Flex>

      <SideHelper>
        <Box isRound={true} w="50px" h="50px" bg="gray.600"></Box>
      </SideHelper>
    </Flex>
  );
};
