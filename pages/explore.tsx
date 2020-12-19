import { Button, Flex, Icon } from "@chakra-ui/react";
import { useState, ReactNode, useEffect } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { SideHelper } from "../src/components/SideHelper";

import {
  ArrowButton,
  EditorWrapper,
  FullIdea,
  IdeaIdentifier,
  IdeaInfoSection,
  RichTextContainer,
} from "../src/components/IdeaMainConponents";
import useSWR from "swr";
import { DbIdea } from "../types/types";
import { fetcher } from "../src/utils/fetcher";
import { ExploreSkeleton } from "../src/components/ExploreSkeleton";
import { useFavorites } from "../src/contexts/FavoritesContext";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useRouter } from "next/router";

const TAKE = 100;

export default function Explore() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const { error, data } = useSWR<DbIdea[]>(["/api/ideas/get", TAKE], fetcher);

  if (!data) return <ExploreSkeleton />;
  if (error) return "Error...";

  const ideaIndex = wrap(0, data.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const router = useRouter();

  return (
    <MainContainer direction={direction} page={page}>
      <Scrollbars>
        <Flex>
          <SideHelper>
            <Button pos="fixed" top={0} m={6} onClick={() => router.back()}>
              <Icon as={FiArrowLeft} mr={2} />
              Back
            </Button>
            <ArrowButton
              aria-label="Left"
              icon={<Icon as={BiLeftArrowAlt} />}
              onClick={() => paginate(-1)}
            />
          </SideHelper>

          <FullIdea data={data[ideaIndex]} />

          <SideHelper>
            <ArrowButton
              aria-label="Right"
              icon={<Icon as={BiRightArrowAlt} />}
              onClick={() => paginate(1)}
            />
          </SideHelper>
        </Flex>
      </Scrollbars>
    </MainContainer>
  );
}

const MainContainer = ({
  direction,
  page,
  children,
}: {
  direction: number;
  page: number;
  children: ReactNode;
}) => {
  const MotionFlex = motion.custom(Flex);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      <MotionFlex
        borderTop="4px solid red"
        w="full"
        h="full"
        align="center"
        justify="start"
        variants={variants}
        key={page}
        initial="enter"
        animate="center"
        exit="exit"
        pos="fixed"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.1 },
        }}
      >
        {children}
      </MotionFlex>
    </AnimatePresence>
  );
};
