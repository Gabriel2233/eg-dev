import { Box, CloseButton, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineCode } from "react-icons/ai";
import { IdeaCreationForm } from "../src/components/IdeaCreationForm";

export default function NewIdeaCreator() {
  const { back } = useRouter();

  return (
    <Box bg="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        w="full"
        align="center"
        justify="space-between"
        p={4}
        borderTopWidth={4}
        borderTopColor="yellow.400"
      >
        <Flex align="center">
          <Icon as={AiOutlineCode} mx={4} fontSize="33px" />
          Create a new Idea
        </Flex>

        <CloseButton onClick={() => back()} mx={4} />
      </Flex>

      <Flex w="full" bg="gray.100" align="center" justify="center">
        <IdeaCreationForm />
      </Flex>
    </Box>
  );
}
