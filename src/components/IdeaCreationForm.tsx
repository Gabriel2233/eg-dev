import { Flex, Heading, Input } from "@chakra-ui/react";
import { DescriptionRichEditor } from "./DescriptionRichEditor";

export const IdeaCreationForm = () => {
  return (
    <Flex
      w="50%"
      align="start"
      justify="center"
      flexDir="column"
      as="form"
      rounded="8px"
      background="white"
      m={8}
      borderWidth={2}
      borderColor="gray.200"
    >
      <Heading size="lg" w="full" textAlign="center" pt={6}>
        Let's Begin
      </Heading>

      <Flex w="full" align="start" justify="center" flexDir="column" p={8}>
        <Heading size="md" my={4} textAlign="start" w="full">
          About
        </Heading>

        <Input
          size="lg"
          my={2}
          _focus={{ borderColor: "yellow.400" }}
          placeholder="Idea name"
        />

        <DescriptionRichEditor />
      </Flex>
    </Flex>
  );
};
