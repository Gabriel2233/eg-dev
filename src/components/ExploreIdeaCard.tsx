import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { GoTools } from "react-icons/go";

export const ExploreIdeaCard = () => {
  return (
    <Flex
      align="start"
      justify="center"
      flexDir="column"
      backgroundColor="white"
      rounded="8px"
      transition="0.2s ease"
      _hover={{ boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)" }}
    >
      <Heading size="lg" p={4} w="full" textAlign="start">
        Cooking App
        <Badge colorScheme="green" mx={4} py={1}>
          Easy
        </Badge>
      </Heading>
      <Divider p={1} bg="red.400" w="10%" mx={4} rounded="8px" />

      <Flex w="full" align="center" justify="start" flexDir="column">
        <HStack spacing={4} my={6}>
          {["sm", "md", "lg"].map((size) => (
            <Tag size={"md"} key={size} variant="outline" colorScheme="gray">
              <TagLabel>Blue</TagLabel>
              <TagRightIcon as={GoTools} />
            </Tag>
          ))}
        </HStack>
      </Flex>

      <Button
        d="flex"
        alignSelf="flex-end"
        colorScheme="red"
        variant="ghost"
        rightIcon={<Icon as={FiArrowRight} />}
        m={4}
      >
        More
      </Button>
    </Flex>
  );
};
