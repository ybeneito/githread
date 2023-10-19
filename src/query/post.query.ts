import { Prisma } from '@prisma/client';
import { prisma } from "@/lib/primsa" 

export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    user: {
      select: {
        image: true,
        username: true,
        id: true,
      },
    },
    _count: {
      select: {
        likes: true,
        replies: true,
      },
    },
    likes: {
      select: {
        userId: true,
      },
      where: {
        userId: userId ?? 'error',
      },
    },
  } satisfies Prisma.PostSelect);

export const getLatestPosts = async (userId?: string) => {
    return await prisma.post.findMany({
        where: {
            parentId: null,
        },
        take:20,
        orderBy: {
            createdAt: 'desc',
        },
        select: postSelectQuery(userId)
    })
}

export const getPostView = async (id: string, userId?: string) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
      replies: {
        select: {
          ...postSelectQuery(userId),
        },
      },
      parent: {
        select: {
          ...postSelectQuery(userId),
        },
      },
    },
  });
 } 

export const getPost = async (id: string, userId?: string) => { 
  return await prisma.post.findUnique({
    where: {
      id,
  },
  select: {
    ...postSelectQuery(userId)
  }
})
}

export type PostHome = Prisma.PromiseReturnType<typeof getLatestPosts>[number]