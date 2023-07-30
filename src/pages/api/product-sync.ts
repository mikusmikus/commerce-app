import { getClient } from "@/sanity/lib/getClient";
import { createClient, SanityDocumentStub } from "@sanity/client";
import {
  isValidRequest,
  isValidSignature,
  SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";
import { prisma } from "@/server/db";

import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.SANITY_WEBHOOK_SECRET;

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO Add request validation

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  // const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  // const body = await readBody(req); // Read the body into a string
  // if (!isValidSignature(body, signature, secret)) {
  //   console.log("not valid");

  //   res.status(401).json({ success: false, message: "Invalid signature" });
  //   return;
  // }

  // if (!isValidRequest(req, "autumn-project-2023")) {
  //   console.log("invalid");

  //   res.status(401).json({ message: "Invalid signature" });
  //   return;
  // }

  // TODO update product table in prisma
  const sanityProduct = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id: sanityProduct._id,
    },
  });

  if (!product) {
    const newProduct = await prisma.product.create({
      data: {
        id: sanityProduct._id,
        title: sanityProduct.title,
        quantity: 1,
        price: {
          create: {
            priceInEuro: 100,
            priceInNok: 100 * 10,
          },
        },
      },
    });

    console.log("newProduct", newProduct);
  } else {
    // update product title
    const updatedProduct = await prisma.product.update({
      where: {
        id: sanityProduct._id,
      },
      data: {
        title: sanityProduct.title,
      },
    });

    console.log("updatedProduct", updatedProduct);
  }

  console.log("db product", product);

  res.status(200).json({
    success: true,
  });
};

export default handler;
