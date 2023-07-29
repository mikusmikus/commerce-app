import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter, productsRouter, usersRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  products: productsRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
