"use server"
import { getUser } from "@/src/query/user.query"
import { prisma } from "@/lib/primsa"
import { WritePostFormType } from "@/app/write/WritePostForm"
import { revalidatePath } from "next/cache"

export const createReply = async (postId: string, values: WritePostFormType) => {
    const user = await getUser()
    await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
            parentId: postId,
        }
    })
    revalidatePath(`/posts/${postId}`)
    return postId
}