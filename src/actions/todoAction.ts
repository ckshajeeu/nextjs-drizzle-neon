"use server";

import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getData() {
  const data = await db.select().from(todo)
  return data;
}

export async function addTodo(id: number, text: string) {
  console.log(text)
  await db.insert(todo).values({
    id: id,
    text: text
  });
}

export async function deleteTodo(id: number) {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/")
}

export async function toggleTodo(id: number) {
  await db.update(todo).set({
    done: not(todo.done),
  }).where(eq(todo.id, id));

  revalidatePath("/");
}

export async function editTodo(id: number, text: string) {
  await db.update(todo).set({
    text: text
  }).where(eq(todo.id, id));

  revalidatePath("/")
}