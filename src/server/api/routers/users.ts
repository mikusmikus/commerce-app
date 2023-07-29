import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  savePost: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUserWithSavedPost = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          savedProducts: {
            connect: {
              id: input.productId,
            },
          },
        },
      });

      return updatedUserWithSavedPost;
    }),
});
