import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../src/firebaseLib/firebase-admin";
import { getPrisma } from "../../../src/utils/prismaUtils";

const prisma = getPrisma();

type Body = {
  name: string;
  briefDescription: string;
  richDescription: string;
  difficulty: string;
  techs: Array<string>;
  demoUrl?: string;
  demoPlaceholder?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.tk);

    if (uid === null) throw new Error("No uid");
    const body: Body = req.body;

    const newIdea = await prisma.idea.create({
      data: {
        ...body,
      },
    });

    return res.json({ message: "Success" });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
