import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { AiFillHeart } from "react-icons/ai";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { ExploreSkeleton } from "../../src/components/ExploreSkeleton";
import {
  EditorWrapper,
  IdeaIdentifier,
  IdeaInfoSection,
  RichTextContainer,
} from "../../src/components/IdeaMainConponents";
import { SideHelper } from "../../src/components/SideHelper";
import { getPrisma } from "../../src/utils/prismaUtils";
import { DbIdea } from "../../types/types";

const AnimatedBox = ({ children }: { children: ReactNode }) => {
  const MotionBox = motion.custom(Box);

  const variants = {
    hidden: {
      opacity: 0,
      y: -500,
    },

    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <AnimatePresence>
      <MotionBox
        h="100vh"
        borderTop="4px solid red"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.5 },
        }}
      >
        {children}
      </MotionBox>
    </AnimatePresence>
  );
};

export default function Idea({ ideaData }: { ideaData: DbIdea }) {
  if (!ideaData) return <ExploreSkeleton />;

  const router = useRouter();

  const btnRef = useRef<HTMLButtonElement>();
  let holderRef = useRef<IconType>(FiHeart);

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();

      if (holderRef.current === FiHeart) {
        holderRef.current = AiFillHeart;
      } else {
        holderRef.current = FiHeart;
      }
    };

    btnRef.current.addEventListener("click", handleClick);

    return () => {
      btnRef.current &&
        btnRef.current.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <AnimatedBox>
      <Scrollbars>
        <Flex pos="relative">
          <SideHelper>
            <Button onClick={() => router.back()} pos="fixed" top={0} m={6}>
              <Icon as={FiArrowLeft} mr={2} />
              Go Back
            </Button>
          </SideHelper>
          <Flex width="70%" p={8} flexDir="column">
            <IdeaIdentifier data={ideaData} />

            <Flex w="full" justify="space-between">
              <IdeaInfoSection data={ideaData} />
              <Button ref={btnRef}>
                <Icon as={holderRef.current} />
              </Button>
            </Flex>
            <RichTextContainer>
              <EditorWrapper editorValue={ideaData.richDescription} />
            </RichTextContainer>
          </Flex>
          <SideHelper>{}</SideHelper>
        </Flex>
      </Scrollbars>
    </AnimatedBox>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = getPrisma();

  const allIdeas = await prisma.idea.findMany();

  await prisma.$disconnect();

  return {
    paths: allIdeas.map((idea) => {
      return {
        params: {
          id: `/ideas/${idea.id}`,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = getPrisma();

  const ideaData = await prisma.idea.findUnique({
    where: { id: Number(params.id) },
    include: { user: true },
  });

  await prisma.$disconnect();

  return {
    props: { ideaData },
  };
};