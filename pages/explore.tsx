import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Badge,
  FlexProps,
  Text,
  Tag,
  TagLabel,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { useState, useCallback, useMemo, ReactNode } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import useSWR from "swr";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { RichComponents } from "../src/utils/slateUtils";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Node } from "slate";
import { SideHelper } from "../src/components/SideHelper";
import { ExploreSkeleton } from "../src/components/ExploreSkeleton";

import Link from "next/link";
import { fetcher } from "../src/utils/fetcher";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const TAKE = 200;

export default function Explore() {
  console.log("render");

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

  const CustomFlex = motion.custom(Flex);

  const [liked, setLiked] = useState<boolean>(false);

  const onIdeaLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const icon = liked ? FaHeart : FiHeart;

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
              pos="fixed"
              top="50%"
            />
          </SideHelper>

          <Flex width="70%" p={8} flexDir="column">
            <Flex align="center" justify="space-between" w="full">
              <Heading size="2xl" py={6}>
                {data[iterator].name}
              </Heading>

              <Badge colorScheme={badgeScheme}>
                {data[iterator].difficulty}
              </Badge>
            </Flex>

            <Flex w="full" justify="space-between">
              <div>
                <Flex my={2}>
                  <Link href={`/users/${data[iterator].user.uid}`}>
                    <ChakraLink mx={2} color="gray.600">
                      By: {data[iterator].user.name}
                    </ChakraLink>
                  </Link>
                </Flex>

                <Flex my={2}>
                  <Text mx={2} color="gray.600">
                    Technologies:
                  </Text>

                  {data[iterator].techs.map((tech: string, i) => (
                    <AnimatePresence custom={i}>
                      <TechListItem tech={tech} />
                    </AnimatePresence>
                  ))}
                </Flex>

                <Flex my={2}>
                  {data[iterator].demo_url ? (
                    <ChakraLink
                      mx={2}
                      color="gray.600"
                      href={data[iterator].demo_url}
                    >
                      Demo: {data[iterator].demo_placeholder}
                    </ChakraLink>
                  ) : (
                    <Text mx={2} color="gray.600">
                      Demo: Not Provided
                    </Text>
                  )}
                </Flex>
              </div>

              <IconButton
                aria-label="Like Count"
                variant="ghost"
                icon={<Icon as={icon} />}
                onClick={onIdeaLike}
                color={liked ? "red.500" : "black"}
              />
            </Flex>

            <TopicContainer>
              <TopicHeader>About</TopicHeader>
              <AnimatePresence>
                <CustomFlex
                  boxShadow="0 4px 14px 0 #ccc"
                  rounded="8px"
                  p={6}
                  w="full"
                  flexDir="column"
                  initial={{ opacity: 0, y: 300 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    x: { type: "spring", damping: 300, stiffness: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <ReadOnlyEditor
                    value={JSON.parse(data[iterator].richDescription)}
                  />
                </CustomFlex>
              </AnimatePresence>
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
              pos="fixed"
              top="50%"
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
    initial: (back: boolean) => {
      return {
        x: back ? 1000 : -1000,
        opacity: 0,
      };
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: (back: boolean) => {
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
          opacity: { duration: 0.6 },
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

const TechListItem = ({ tech }: { tech: string }) => {
  return (
    <Tag
      as={motion.div}
      colorScheme="red"
      mx={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <TagLabel># {tech}</TagLabel>
    </Tag>
  );
};
