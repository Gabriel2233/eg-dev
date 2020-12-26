import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { AiFillCode } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";
import { ExploreSkeleton } from "../../src/components/ExploreSkeleton";
import { FullIdea } from "../../src/components/IdeaMainConponents";
import { MobileNav } from "../../src/components/MobileNav";
import { getPrisma } from "../../src/utils/prismaUtils";
import { DbIdea } from "../../types/types";

const AnimatedBox = ({ children }: { children: ReactNode }) => {
  const MotionBox = motion.custom(Box);

  const router = useRouter();

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
      <Button pos="fixed" top={0} left={0} m={6} onClick={() => router.back()}>
        <Icon as={GoChevronLeft} mr={2} />
        <Icon as={AiFillCode} fontSize="30px" />
      </Button>
      <MotionBox
        d="flex"
        justifyContent="center"
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

  return (
    <AnimatedBox>
      <MobileNav>{}</MobileNav>
      <FullIdea data={ideaData} />
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
