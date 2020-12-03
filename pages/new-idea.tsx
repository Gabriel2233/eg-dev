import { Box, CloseButton, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCode } from "react-icons/ai";
import { Node } from "slate";
import { IdeaCreationForm } from "../src/components/IdeaCreationForm";
import { useAuth } from "../src/firebaseLib/auth";
import { Idea, TechInput } from "../types/types";

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
      name: `tech`,
    },
  ]);

  const addTech = () => {
    setTechInputs((prevState) => [...prevState, { name: `tech` }]);
  };

  const deleteTech = (index: number) => {
    if (techInputs.length === 1) {
      alert("One is required");
    } else {
      const techArrayIndexes = techInputs.filter(
        (tech) => techInputs.indexOf(tech) === index
      );

      setTechInputs(techArrayIndexes);
    }
  };

  const onCreate = async (data: Idea) => {
    const editorStatetoString = JSON.stringify(editorValue);

    const body = {
      richDescription: editorStatetoString,
      ...data,
    };

    try {
      const res = await fetch("/api/ideas/create", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      alert(data.message);
    } catch (err) {
      alert(err.message);
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
