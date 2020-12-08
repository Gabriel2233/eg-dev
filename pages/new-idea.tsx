import { Box, CloseButton, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineCode } from "react-icons/ai";
import { Node } from "slate";
import { IdeaCreationForm } from "../src/components/IdeaCreationForm";
import { useAuth } from "../src/firebaseLib/auth";
import { Idea, TechInput } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { empty } from "@prisma/client";

export default function NewIdeaCreator() {
  const { back } = useRouter();

  const { user } = useAuth();

  const [editorValue, setEditorValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "Describe your idea freely" }],
    },
  ]);

  const onEditorChange = (newValue: Node[]) => setEditorValue(newValue);

  const [techInputs, setTechInputs] = useState<Array<TechInput>>([
    {
      mark: uuidv4(),
    },
  ]);

  const addTech = () => {
    setTechInputs((prevState) => [...prevState, { mark: uuidv4() }]);
  };

  const deleteTech = (mark: string) => {
    const techArrayIndexes = techInputs.filter((tech) => tech.mark !== mark);

    setTechInputs(techArrayIndexes);
  };

  const onCreate = async (data: Idea) => {
    const filteredTechs = data.techs.filter((tech) => tech !== undefined);

    const editorStatetoString = JSON.stringify(editorValue);
    const { token, ...userData } = user;

    const body = {
      ...data,
      techs: filteredTechs,
      richDescription: editorStatetoString,
      user: userData,
      userUid: userData.uid,
    };

    try {
      const res = await fetch("/api/ideas/create", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box bg="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        w="full"
        align="center"
        justify="space-between"
        p={4}
        borderTopWidth={4}
        borderTopColor="red.400"
      >
        <Flex align="center">
          <Icon as={AiOutlineCode} mx={4} fontSize="33px" />
          Create a new Idea
        </Flex>

        <CloseButton onClick={() => back()} mx={4} />
      </Flex>

      <Flex w="full" bg="gray.100" align="center" justify="center">
        <IdeaCreationForm
          onCreate={onCreate}
          editorValue={editorValue}
          onEditorChange={onEditorChange}
          techInputs={techInputs}
          addTech={addTech}
          deleteTech={deleteTech}
        />
      </Flex>
    </Box>
  );
}
