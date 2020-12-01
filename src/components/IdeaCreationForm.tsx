import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { DescriptionRichEditor } from "./DescriptionRichEditor";
import { InputElement } from "./InputElement";

import { BiCheckCircle } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Node } from "slate";

type TechInput = {
  name: string;
};

export const IdeaCreationForm = () => {
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

  const { handleSubmit, errors, register } = useForm();

  const onCreate = (data) => {
    console.log(data, editorValue);
  };

  return (
    <FormContainer>
      <Flex
        w="full"
        align="start"
        justify="center"
        flexDir="column"
        p={8}
        as="form"
        onSubmit={handleSubmit(onCreate)}
      >
        <HeadingElement>About</HeadingElement>

        <InputElement placeholder="Name" register={register} name="techName" />

        <InputElement
          placeholder="Brief Description"
          register={register}
          name="briefDescription"
        />

        <DescriptionRichEditor value={editorValue} onChange={onEditorChange} />

        <Select
          size="lg"
          my={6}
          name="ideaDifficulty"
          ref={register}
          _focus={{ borderColor: "yellow.400" }}
          placeholder="Select Difficulty"
        >
          <option value="Easy">Easy</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Hard">Hard</option>
        </Select>

        <HeadingElement>Technologies</HeadingElement>

        {techInputs.map((input, index) => (
          <Flex w="full" align="center" key={index}>
            <InputElement
              placeholder="Tech"
              name={`techs.${index}`}
              register={register}
            />
            <IconButton
              aria-label="Delete"
              icon={<Icon as={FiTrash} color="red.500" />}
              mx={2}
              onClick={() => deleteTech(index)}
            />
          </Flex>
        ))}

        <Button
          my={4}
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={addTech}
        >
          <Icon as={FiPlus} mr={1} />
          Add more
        </Button>

        <HeadingElement>
          <Flex align="center">
            Demo
            <Tooltip
              mx={2}
              aria-label="A tooltip"
              label="Optional"
              placement="right-end"
            >
              <div>
                <AiOutlineQuestionCircle />
              </div>
            </Tooltip>
          </Flex>
        </HeadingElement>

        <InputElement
          placeholder="Demo URL"
          name="demo.demoUrl"
          register={register}
        />
        <InputElement
          placeholder="Demo Placeholder"
          name="demo.demoPlaceholder"
          register={register}
        />

        <Button
          w="125px"
          bg="yellow.300"
          _hover={{ bg: "yellow.400" }}
          mt={6}
          d="flex"
          alignSelf="flex-end"
          type="submit"
        >
          <Icon as={BiCheckCircle} mr={1} />
          Create
        </Button>
      </Flex>
    </FormContainer>
  );
};

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      w={["100%", null, "50%"]}
      align="start"
      justify="center"
      flexDir="column"
      rounded="8px"
      background="white"
      m={8}
      borderWidth={2}
      borderColor="gray.200"
    >
      {children}
    </Flex>
  );
};

const HeadingElement = ({ children }: { children: ReactNode }) => {
  return (
    <Heading size="md" my={4} align="center" textAlign="start" w="full">
      {children}
    </Heading>
  );
};
