import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/utils/prismaUtils";
import { AppUserWithoutToken } from "../../../types/types";

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user: AppUserWithoutToken = JSON.parse(req.body);

    await prisma.user.create({ data: user });

    await prisma.$disconnect();

    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
