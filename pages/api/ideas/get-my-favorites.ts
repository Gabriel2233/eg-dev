import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/utils/prismaUtils";

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.query;

    const stringifiedVersion = query.favs.toString();

    const favsArray = stringifiedVersion
      .split(",")
      .map((string) => parseInt(string));

    const favorites = await prisma.idea.findMany({
      where: { id: { in: favsArray } },
    });

    await prisma.$disconnect();

    return res.status(201).json(favorites);
  } catch (err) {
    return res.json({ message: "err.message" });
  }
};
