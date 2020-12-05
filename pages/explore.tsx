import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Badge,
  List,
  ListItem,
  ListIcon,
  Text,
} from "@chakra-ui/react";
import { useState, useCallback, useMemo } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import useSWR from "swr";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { RichComponents } from "../src/utils/slateUtils";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Editor, Node } from "slate";
import { MdCheckCircle } from "react-icons/md";

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    const data = await res.json();

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

  if (!data) return "Loading Data...";
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

  const listVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: -50 * i,
    }),

    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      <Flex
        borderTop="4px solid red"
        w="full"
        h="full"
        align="center"
        justify="start"
        as={motion.div}
        variants={variants}
        key={iterator}
        initial="initial"
        animate="visible"
        exit="exit"
        pos="fixed"
      >
        <Scrollbars>
          <Flex>
            <Flex w="15%" align="center" justify="center">
              <IconButton
                size="lg"
                isRound={true}
                aria-label="Left Icon"
                icon={<Icon as={BiLeftArrowAlt} />}
                disabled={prevDisabled}
                onClick={getPreviousIdea}
              />
            </Flex>

            <Flex
              p={8}
              w="100%"
              align="start"
              justify="center"
              flexDir="column"
            >
              <Flex w="full" align="center" justify="space-between" py={8}>
                <Heading size="xl" py={6}>
                  {data[iterator].name}
                </Heading>

                <Badge colorScheme={badgeScheme}>
                  {data[iterator].difficulty}
                </Badge>
              </Flex>

              <ReadOnlyEditor
                value={JSON.parse(data[iterator].richDescription)}
              />
            </Flex>

            <Flex w="15%" align="center" justify="center">
              <IconButton
                size="lg"
                isRound={true}
                aria-label="Right Icon"
                disabled={nextDisabled}
                icon={<Icon as={BiRightArrowAlt} />}
                onClick={getNextIdea}
              />
            </Flex>
          </Flex>
        </Scrollbars>
      </Flex>
    </AnimatePresence>
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
