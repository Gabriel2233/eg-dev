import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../src/firebaseLib/firebase-admin";
import { getPrisma } from "../../../src/utils/prismaUtils";

import Cookie from "js-cookie";
import { Idea } from "../../../types/types";

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = req.cookies;

    if (!auth["dil-auth"]) throw new Error("Not Authenticated");

    const body = JSON.parse(req.body);

    await prisma.idea.create({
      data: {
        name: body.techName,
        briefDescription: body.briefDescription,
        richDescription: body.richDescription,
        difficulty: body.ideaDifficulty,
        techs: body.techs,
        demo_url: body.demo.demoUrl,
        demo_placeholder: body.demo.demoPlaceholder,
      },
    });

    await prisma.$disconnect();

    return res.json({ message: "Success" });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
