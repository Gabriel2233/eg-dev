import { Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState, ReactNode, createElement } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import { Scrollbars } from "react-custom-scrollbars";

import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { SideHelper } from "../src/components/SideHelper";

import { ArrowButton, FullIdea } from "../src/components/IdeaMainConponents";
import useSWR from "swr";
import { DbIdea } from "../types/types";
import { fetcher } from "../src/utils/fetcher";
import { ExploreSkeleton } from "../src/components/ExploreSkeleton";
import { GoChevronLeft } from "react-icons/go";
import { useRouter } from "next/router";
import { AiFillCode } from "react-icons/ai";
import { MobileNav } from "../src/components/MobileNav";

const TAKE = 100;

export default function Explore() {
  const router = useRouter();

  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const { error, data } = useSWR<DbIdea[]>(["/api/ideas/get", TAKE], fetcher);

  if (!data) return createElement(ExploreSkeleton);
  if (error) return "Error...";

  const ideaIndex = wrap(0, data.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <MainContainer direction={direction} page={page}>
      <Scrollbars>
        <Flex flexDir={["column", "column", "row"]}>
          <MobileNav>
            <IconButton
              aria-label="Left"
              onClick={() => paginate(-1)}
              isRound={true}
              mx={1}
              icon={<Icon as={BiLeftArrowAlt} />}
            />

            <IconButton
              aria-label="Right"
              onClick={() => paginate(1)}
              isRound={true}
              mx={1}
              icon={<Icon as={BiRightArrowAlt} />}
            />
          </MobileNav>

          <SideHelper>
            <Button
              pos="fixed"
              top={0}
              m={6}
              onClick={() => router.back()}
              variant="ghost"
            >
              <Icon as={GoChevronLeft} mr={2} />
              <Icon as={AiFillCode} fontSize="33px" />
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
