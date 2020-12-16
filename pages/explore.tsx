import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState, ReactNode } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import useSWR from "swr";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { SideHelper } from "../src/components/SideHelper";
import { ExploreSkeleton } from "../src/components/ExploreSkeleton";

import { fetcher } from "../src/utils/fetcher";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import {
  ArrowButton,
  EditorWrapper,
  IdeaIdentifier,
  IdeaInfoSection,
  RichTextContainer,
} from "../src/components/IdeaMainConponents";

const TAKE = 200;

export default function Explore() {
  const [liked, setLiked] = useState(false);

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
            <ArrowButton
              aria-label="Left"
              icon={<Icon as={BiLeftArrowAlt} />}
              disabled={prevDisabled}
              onClick={getPreviousIdea}
            />
          </SideHelper>

          <Flex width="70%" p={8} flexDir="column">
            <IdeaIdentifier data={data[iterator]} />

            <Flex w="full" justify="space-between">
              <IdeaInfoSection data={data[iterator]} />
              <IconButton
                aria-label="Like Count"
                variant="ghost"
                icon={<Icon as={icon} />}
                onClick={onIdeaLike}
                color={liked ? "red.500" : "black"}
              />
            </Flex>

            <RichTextContainer>
              <EditorWrapper editorValue={data[iterator].richDescription} />
            </RichTextContainer>
          </Flex>

          <SideHelper>
            <ArrowButton
              aria-label="Right"
              icon={<Icon as={BiRightArrowAlt} />}
              disabled={nextDisabled}
              onClick={getNextIdea}
            />
          </SideHelper>
        </Flex>
      </Scrollbars>
    </MainContainer>
  );
}

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
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </MotionFlex>
    </AnimatePresence>
  );
};
