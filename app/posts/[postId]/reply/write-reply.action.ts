"use server"
import { getUser } from "@/src/query/user.query"
import { prisma } from "@/lib/primsa"
import { WritePostFormType } from "@/app/write/WritePostForm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createReply = async (postId: string, values: WritePostFormType) => {
    const user = await getUser()
    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
            parentId: postId,
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    redirect(`/${post.parentId}`);
  } catch (error) {
    return `/${post.parentId}`;
  }
}