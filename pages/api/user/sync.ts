import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { DefaultAdapter } from 'next-auth/adapters';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as any
  if (!user) {
    throw new Error(
      `You must be logged in not supported at this route.`,
    );
  }
  if (req.method === "GET") {
    await handleGET(user.id, res);
  } else if (req.method === "POST") {
    await handlePOST(user.id, res, req);
  } else if (req.method === "DELETE") {
    await handleDELETE(user.id, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

// GET /api/user/:id
async function handleGET(userId, res) {
  const conversation = await prisma.conversation.findUnique({
    where: { authorId: userId },
  });
  return res.json(conversation);
}

// GET /api/user/:id
async function handlePOST(userId, res, req) {
  const data = req.body
  data.authorId = userId
  const conversation = await prisma.conversation.upsert({
    where: { authorId: userId },
    create: { ...data },
    update: { ...data }
  });
  return res.status(200).json(conversation)
}

// DELETE /api/user/:id
async function handleDELETE(userId, res) {
  const conversation = await prisma.conversation.delete({
    where: { authorId: userId },
  });
  res.status(200).json(conversation)
}