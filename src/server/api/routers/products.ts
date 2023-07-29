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

      const product = await ctx.prisma.product.create({
        data: {
          title: input.title,
          quantity: 10,
          price: 100,
        },
      });
      return product;
    }),
});
