"use server"
import { prisma } from "@/lib/primsa";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const followUser = async (userId: string) => { 
    const user = await getUser();

    const isFollowing = await prisma.follow.findFirst({
        where: {
            followerId: user.id,
            followingId: userId
        },
        select: {
            id: true
        }
    });

    if(isFollowing) {
        await prisma.follow.delete({
            where: {
                id: isFollowing.id
            }
        })
    } else {
        const isFollowing = await prisma.follow.create({
            data: {
                followerId: user.id,
                followingId: userId
            },
            select: {
                id: true
            }
        });
    }
    revalidatePath(`/users/${userId}`)
}