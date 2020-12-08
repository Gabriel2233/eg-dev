import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/utils/prismaUtils";
import { Idea } from "../../../types/types";

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: Idea = JSON.parse(req.body);

    const { token, ...creator } = body.user;

    await prisma.idea.create({
      data: {
        name: body.name,
        briefDescription: body.briefDescription,
        richDescription: body.richDescription,
        difficulty: body.difficulty,
        techs: body.techs,
        demo_url: body.demo.demo_url,
        demo_placeholder: body.demo.demo_placeholder,
        user: { connect: { uid: creator.uid } },
      },
    });

    await prisma.$disconnect();

    return res.json({ message: body });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
