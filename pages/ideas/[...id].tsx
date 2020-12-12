import { GetStaticPaths, GetStaticProps } from "next";
import { getPrisma } from "../../src/utils/prismaUtils";

export default function Idea() {
  return <h1>asfdohb</h1>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = getPrisma();

  const allIdeas = await prisma.idea.findMany({
    include: { user: true },
  });

  const paths = allIdeas.map((idea) => ({
    params: { id: idea.id.toString() },
  }));

  await prisma.$disconnect();

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);

  return {
    props: {},
  };
};
