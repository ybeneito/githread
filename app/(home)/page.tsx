import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/primsa'
import { Post } from '@/src/features/post/Post'
import { getLatestPosts } from '@/src/query/post.query'
import React from 'react'

export default async function Home() {
    const session = await getAuthSession()
    const posts = await getLatestPosts(session?.user.id)

  return (
    <div className='divide-y divide-y-muted'>
        {posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
    </div>
  )
}
