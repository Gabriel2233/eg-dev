import { CloseButton, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineCode } from "react-icons/ai";
import { IdeaCreationForm } from "../src/components/IdeaCreationForm";
import { VerticalLayout } from "../src/components/VerticalLayout";

export default function NewIdeaCreator() {
  const { back } = useRouter();

  return (
    <VerticalLayout>
      <Flex w="full" align="center" justify="space-between" p={6}>
        <Flex align="center">
          <Icon as={AiOutlineCode} mx={4} fontSize="33px" />
          Create a new Idea
        </Flex>

        <CloseButton onClick={() => back()} mx={4} />
      </Flex>

      <Flex w="full" bg="gray.100" align="center" justify="center">
        <IdeaCreationForm />
      </Flex>
    </VerticalLayout>
  );
}
