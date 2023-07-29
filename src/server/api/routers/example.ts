import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getAllPosts : publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take : 100,
      orderBy : [{
        createdAt: 'desc'
      }],
    })

    return posts;

  }),

  hello: publicProcedure
    .input(z.object({ text: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  // endpoint => api/trpc/example.test
  test: publicProcedure.query( async ({ ctx }) => {
    // update prisma example table
    const exampleData = await ctx.prisma.example.findMany({
      take : 3,
    });

    return exampleData;

  }),

  addExample: publicProcedure
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.example.create({
      data: {
        title: "Test2",
      },
    });
    const post = await ctx.prisma.post.create({
      data: {
        authorId: "authorId213",
        content: "content",
    }});
    console.log('response', response);
    
    return {
      success: true
    }
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
