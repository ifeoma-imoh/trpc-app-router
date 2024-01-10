import { initTRPC } from "@trpc/server";

// Note that you can use any variable name you like.
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
