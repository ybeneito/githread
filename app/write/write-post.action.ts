"use server"
import { getUser } from "@/src/query/user.query"
import { WritePostFormType } from "./WritePostForm"
import { prisma } from "@/lib/primsa"
import { redirect } from "next/navigation"

export const createPost = async (values: WritePostFormType) => {
    const user = await getUser()
    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      redirect(`/posts/${post.id}`);
    } catch (error) {
      return `/posts/${post.id}`;
    }
}