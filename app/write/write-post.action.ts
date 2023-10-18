"use server"
import { getUser } from "@/src/query/user.query"
import { WritePostFormType } from "./WritePostForm"
import { prisma } from "@/lib/primsa"

export const createPost = async (values: WritePostFormType) => {
    const user = await getUser()
    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
        }
    })
    return post.id
}