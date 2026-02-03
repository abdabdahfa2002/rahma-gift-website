import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createMemory, getUserMemories, updateMemory, deleteMemory, createTask, getUserTasks, updateTask, deleteTask, createEvent, getUserEvents, updateEvent, deleteEvent } from "./db";
import { uploadToCloudinary, deleteFromCloudinary } from "./upload";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  memories: router({
    list: protectedProcedure.query(({ ctx }) => getUserMemories(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        date: z.date(),
      }))
      .mutation(({ ctx, input }) => createMemory({ ...input, userId: ctx.user.id })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        date: z.date().optional(),
      }))
      .mutation(({ input }) => updateMemory(input.id, input)),
    delete: protectedProcedure
      .input(z.number())
      .mutation(({ input }) => deleteMemory(input)),
  }),

  tasks: router({
    list: protectedProcedure.query(({ ctx }) => getUserTasks(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        dueDate: z.date().optional(),
      }))
      .mutation(({ ctx, input }) => createTask({ ...input, userId: ctx.user.id, completed: 0 })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        completed: z.number().optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        dueDate: z.date().optional(),
      }))
      .mutation(({ input }) => updateTask(input.id, input)),
    delete: protectedProcedure
      .input(z.number())
      .mutation(({ input }) => deleteTask(input)),
  }),

  events: router({
    list: protectedProcedure.query(({ ctx }) => getUserEvents(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        type: z.enum(["anniversary", "birthday", "milestone", "other"]).optional(),
      }))
      .mutation(({ ctx, input }) => createEvent({ ...input, userId: ctx.user.id })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.date().optional(),
        type: z.enum(["anniversary", "birthday", "milestone", "other"]).optional(),
      }))
      .mutation(({ input }) => updateEvent(input.id, input)),
    delete: protectedProcedure
      .input(z.number())
      .mutation(({ input }) => deleteEvent(input)),
  }),

  upload: router({
    uploadFile: protectedProcedure
      .input(z.object({
        fileData: z.instanceof(Buffer),
        fileName: z.string(),
        folder: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await uploadToCloudinary(
            input.fileData,
            input.fileName,
            input.folder || "memories"
          );
          return result;
        } catch (error) {
          throw new Error(`Upload failed: ${error}`);
        }
      }),
    deleteFile: protectedProcedure
      .input(z.string())
      .mutation(async ({ input }) => {
        try {
          await deleteFromCloudinary(input);
          return { success: true };
        } catch (error) {
          throw new Error(`Delete failed: ${error}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
