import { Badge, Flex, Heading, Icon } from "@chakra-ui/react";

import { MdCheckCircle } from "react-icons/md";

export const IdeaCard = () => {
  return (
    <Flex
      w={["100%", null, "70%"]}
      align="start"
      justify="center"
      flexDir="column"
      px={2}
      py={6}
      rounded="0px"
      _last={{ roundedBottom: "8px" }}
      backgroundColor="white"
      borderWidth={0.5}
      borderColor="gray.200"
    >
      <Flex w="full" align="center" justify="space-between">
        <Heading size="md" ml={6}>
          Cooking App
        </Heading>

        <Icon as={MdCheckCircle} color="green.500" fontSize="20px" />

        <Badge colorScheme="red" mx={6}>
          Hard
        </Badge>
      </Flex>
    </Flex>
  );
};
