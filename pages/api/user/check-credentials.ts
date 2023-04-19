import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256"
import { omit } from "lodash";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res: any, req: any) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
  if (user && user.password == hashPassword(req.body.password)) {
    res.json(omit(user, "password"));
  } else {
    res.status(400).end("Invalid credentials");
  }
}