import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(10, "Need to be atleast 10 characters").max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("test 123 hehehe");
      // create new product with price in it
      const product = await ctx.prisma.product.create({
        data: {
          title: input.title,
          quantity: 1,
          price: {
            create: {
              priceInEuro: 100,
              priceInNok: 999,
              id: "test_id_123",
            },
          },
        },
      });

      return product;
    }),

  getUserProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      take: 50,
      include: {
        price: true,
      },
    });

    return products;
  }),
});


