import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Badge,
  List,
  ListItem,
  ListIcon,
  FlexProps,
  Avatar,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useState, useCallback, useMemo, ReactNode } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import useSWR from "swr";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { RichComponents } from "../src/utils/slateUtils";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Node } from "slate";
import { MdCheckCircle } from "react-icons/md";
import { Idea } from "../types/types";
import { SideHelper } from "../src/components/SideHelper";
import { AiOutlineCode } from "react-icons/ai";
import { ExploreSkeleton } from "../src/components/ExploreSkeleton";

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    const data: Idea = await res.json();

    return data;
  } catch (err) {
    return err.message;
  }
};

const TAKE = 200;

export default function Explore() {
  const [iterator, setIterator] = useState(0);

  const [back, setBack] = useState(false);

  const { error, data } = useSWR(["/api/ideas/get", TAKE], fetcher);

  if (!data) return <ExploreSkeleton />;
  if (error) return "Error";

  const getNextIdea = () => {
    setBack(false);

    if (iterator === data.length - 1) {
      return;
    }
    setIterator((prev) => prev + 1);
  };

  const getPreviousIdea = () => {
    setBack(true);

    if (iterator === 0) {
      return;
    }
    setIterator((prev) => prev - 1);
  };

  const currIterator = iterator;

  const nextDisabled = currIterator >= data.length - 1;
  const prevDisabled = currIterator <= 0;

  const badgeScheme =
    data[iterator].difficulty === "Easy"
      ? "green"
      : data[iterator].difficulty === "Intermediate"
      ? "yellow"
      : "red";

  //const listVariants = {
  //hidden: (i) => ({
  //opacity: 0,
  //y: -50 * i,
  //}),

  //visible: (i) => ({
  //opacity: 1,
  //y: 0,
  //transition: {
  //delay: i * 0.05,
  //},
  //}),
  //};
  //

  return (
    <MainContainer back={back} iterator={iterator}>
      <Scrollbars>
        <Flex>
          <SideHelper>
            <IconButton
              size="lg"
              isRound={true}
              aria-label="Left Icon"
              icon={<Icon as={BiLeftArrowAlt} />}
              disabled={prevDisabled}
              onClick={getPreviousIdea}
            />
          </SideHelper>

          <Flex width="70%" p={8} flexDir="column">
            <Flex w="full" flexDir="column">
              <Flex align="center" justify="space-between" w="full">
                <Heading size="2xl" py={6}>
                  {data[iterator].name}
                </Heading>

                <Badge colorScheme={badgeScheme}>
                  {data[iterator].difficulty}
                </Badge>
              </Flex>

              <Flex w="full" align="center" justify="start" my={2}>
                <Text mx={2} color="gray.600">
                  By: {data[iterator].user.name}
                </Text>
              </Flex>

              <Flex w="full" align="center" justify="start" my={2}>
                <Text mx={2} color="gray.600">
                  Technologies:
                </Text>
                {data[iterator].techs.map((tech: string) => (
                  <Tag colorScheme="red" mx={1}>
                    <TagLabel># {tech}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Flex>

            <TopicContainer>
              <TopicHeader>About</TopicHeader>
              <Flex
                boxShadow="0 4px 14px 0 #ccc"
                rounded="8px"
                p={6}
                w="full"
                flexDir="column"
              >
                <ReadOnlyEditor
                  value={JSON.parse(data[iterator].richDescription)}
                />
              </Flex>
            </TopicContainer>
          </Flex>

          <SideHelper>
            <IconButton
              size="lg"
              isRound={true}
              aria-label="Right Icon"
              disabled={nextDisabled}
              icon={<Icon as={BiRightArrowAlt} />}
              onClick={getNextIdea}
            />
          </SideHelper>
        </Flex>
      </Scrollbars>
    </MainContainer>
  );
}

const ReadOnlyEditor = ({ value }: { value: Node[] }) => {
  const renderElement = useCallback(
    (props) => <RichComponents.Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props) => <RichComponents.Leaf {...props} />,
    []
  );

  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState<Node[]>(value);

  return (
    <Slate editor={editor} onChange={setEditorValue} value={editorValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};

const MainContainer = ({
  back,
  iterator,
  children,
}: {
  back: boolean;
  children: ReactNode;
  iterator: number;
}) => {
  const MotionFlex = motion.custom(Flex);

  const variants = {
    initial: (back) => {
      return {
        x: back ? 1000 : -1000,
        opacity: 0,
      };
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: (back) => {
      return {
        x: back ? -1000 : +1000,
        opacity: 0,
      };
    },
  };

  return (
    <AnimatePresence initial={false} custom={back}>
      <MotionFlex
        borderTop="4px solid red"
        w="full"
        h="full"
        align="center"
        justify="start"
        variants={variants}
        key={iterator}
        initial="initial"
        animate="visible"
        exit="exit"
        pos="fixed"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.5 },
        }}
      >
        {children}
      </MotionFlex>
    </AnimatePresence>
  );
};

const TopicContainer = (props: FlexProps) => {
  return (
    <Flex
      w="full"
      align="start"
      justify="center"
      flexDir="column"
      my={6}
      p={2}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const TopicHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Heading size="xl" my={6}>
      {children}
    </Heading>
  );
};
