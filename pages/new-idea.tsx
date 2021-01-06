import { Box, CloseButton, Flex, Icon, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillCode } from 'react-icons/ai';
import { Node } from 'slate';
import { IdeaCreationForm } from '../src/components/IdeaCreationForm';
import { useAuth } from '../src/firebaseLib/auth';
import { Idea, TechInput } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../src/components/Header';

export default function NewIdeaCreator() {
  const { back } = useRouter();
  const toast = useToast();

  const { user } = useAuth();

  const [editorValue, setEditorValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [
        {
          text: 'Describe your app. In a rich way :)',
        },
      ],
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
      const res = await fetch('/api/ideas/create', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast({
          title: 'Success!',
          status: 'success',
          duration: 2000,
        });
      }
    } catch (err) {
      toast({
        title: 'Error :(',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <Box bg="gray.100" h="100vh">
      <Header text="Create a new Idea" />

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
