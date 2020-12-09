import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { SideHelper } from "./SideHelper";

export const ExploreSkeleton = () => {
  return (
    <Flex w="full" h="100vh" borderTop="4px solid red">
      <AnimatedSide />

      <Flex w="70%" flexDir="column" align="center" justify="center">
        <Flex align="center" w="full" justify="space-between">
          <Skeleton h="30px" w="40%"></Skeleton>
          <Skeleton h="20px" w="5%"></Skeleton>
        </Flex>

        <Flex w="full" align="start" my={4}>
          <Skeleton h="20px" w="15%"></Skeleton>
        </Flex>

        <Skeleton
          w="20%"
          my={"4rem"}
          h="30px"
          d="flex"
          alignSelf="start"
        ></Skeleton>

        <Skeleton w="full" height="250px" my={6}></Skeleton>
      </Flex>

      <AnimatedSide />
    </Flex>
  );
};

const AnimatedSide = () => {
  return (
    <SideHelper>
      <SkeletonCircle size="50px"></SkeletonCircle>
    </SideHelper>
  );
};
