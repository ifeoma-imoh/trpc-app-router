import { db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getContacts: publicProcedure.query(async () => {
    const contacts = await db.contact.findMany();

    return contacts;
  }),
  addContact: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async (opts) => {
      const newcontact = await db.contact.create({
        data: opts.input,
      });
      return newcontact;
    }),
  deleteContact: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const deleteUser = await db.contact.delete({
        where: {
          id: opts.input.id,
        },
      });
      return true;
    }),
});

export type AppRouter = typeof appRouter;
