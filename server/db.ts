import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, memories, InsertMemory, tasks, InsertTask, events, InsertEvent } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  const dbUrl = ENV.databaseUrl || process.env.DATABASE_URL;
  if (!_db && dbUrl) {
    try {
      console.log("[Database] Attempting to connect...");
      _db = drizzle(dbUrl);
      console.log("[Database] Connection initialized");
    } catch (error) {
      console.error("[Database] Failed to connect:", error);
      _db = null;
    }
  } else if (!_db) {
    console.warn("[Database] No DATABASE_URL found in environment");
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Memory queries
export async function createMemory(memory: InsertMemory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(memories).values(memory);
  return result;
}

export async function getUserMemories(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(memories)
    .where(eq(memories.userId, userId))
    .orderBy(desc(memories.date));
}

export async function updateMemory(id: number, data: Partial<InsertMemory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(memories)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(memories.id, id));
}

export async function deleteMemory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(memories).where(eq(memories.id, id));
}

// Task queries
export async function createTask(task: InsertTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(tasks).values(task);
}

export async function getUserTasks(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(tasks)
    .where(eq(tasks.userId, userId))
    .orderBy(desc(tasks.createdAt));
}

export async function updateTask(id: number, data: Partial<InsertTask>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(tasks)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(tasks).where(eq(tasks.id, id));
}

// Event queries
export async function createEvent(event: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(events).values(event);
}

export async function getUserEvents(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(events)
    .where(eq(events.userId, userId))
    .orderBy(desc(events.date));
}

export async function updateEvent(id: number, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(events)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(events).where(eq(events.id, id));
}
