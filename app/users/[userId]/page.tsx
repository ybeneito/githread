import { getAuthSession } from '@/lib/auth'
import { getUserProfile } from '@/src/query/user.query'
import React from 'react'
import { Profile } from './Profile'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/primsa'
import { Button } from '@/components/ui/button'
import { followUser } from './follow.action'
import { Post } from '@/src/features/post/Post'

export default async function UserPage({params}: {params: {userId: string}}) {
    const session = await getAuthSession()
    const user = await getUserProfile(params.userId)
    if(!user) return notFound()
    const isFollower = session?.user.id ? await prisma.follow.findFirst({
      where: {
          followerId: session.user.id,
          followingId: user.id
      },
      select: {
          id: true
      }
  }) : false;

  const isCurrentUser = params.userId === session?.user.id 
  if(isCurrentUser) redirect('/profile')

  return (
    <div>
      <Profile user={user} > 
    <form className='mt-4'>
      <Button variant={"outline"} formAction={ async () => {
        "use server"
        if(!session?.user.id) return null
        await followUser(params.userId)
      } }>
          {isFollower ? 'Unfollow' : 'Follow'}
        </Button>
    </form>
      

      </Profile>
      <div className='divide-y divide-accent border-t border-accent mt-4'>
        {user.posts.map((post) => (
            <Post post={post} key={post.id}/>
        ))}
      </div>
    </div>
  )
}
