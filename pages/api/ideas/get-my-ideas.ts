import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/utils/prismaUtils";

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: { uid: string } = req.body;

    const ideas = await prisma.idea.findMany({
      where: { user: { uid: body.uid } },
      include: {
        user: true,
      },
    });

    await prisma.$disconnect();

    return res.status(201).json(ideas);
  } catch (err) {
    return res.json({ message: "err.message" });
  }
};
