import { NextApiRequest, NextApiResponse } from 'next';
import { getPrisma } from '../../../src/utils/prismaUtils';

const prisma = getPrisma();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;

  try {
    const ideas = await prisma.idea.findMany({
      where: {
        name: {
          contains: q as string,
        },
      },
    });

    await prisma.$disconnect();

    return res.status(201).json(ideas);
  } catch (err) {
    return res.json({ message: 'err.message' });
  }
};
