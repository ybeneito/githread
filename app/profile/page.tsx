import { Button, buttonVariants } from '@/components/ui/button'
import { getAuthSession } from '@/lib/auth'
import { getUserProfile } from '@/src/query/user.query'
import React from 'react'
import { followUser } from '../users/[userId]/follow.action'
import { Profile } from '../users/[userId]/Profile'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Post } from '@/src/features/post/Post'

export default async function ProfilePage() {
  const session = await getAuthSession()
  if(!session?.user.id) return notFound()
  const user = await getUserProfile(session?.user.id)
  if(!user) return notFound()
  return (
    <div>
      <Profile user={user} > 
    <form className='mt-4'>
      <Link href="/profile/edit" className={buttonVariants({variant: "outline"})}>
          Edit profile
      </Link>
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
