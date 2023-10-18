import { ThemeToggle } from '@/src/theme/ThemeToggle'
import React from 'react'
import { LoginButton } from './auth/LoginButton'
import { getAuthSession } from '@/lib/auth'
import { UserProfile } from './auth/UserProfile'

export const Header = async () => {
  const session = await getAuthSession()
  return (
    <header className='fixed top-0 bg-background w-full border-b border-b-accent z-10'>
        <div className='flex items-center py-2 max-w-lg m-auto gap-1'>
            <h2 className='text-2xl font-bold mr-auto'>
                Githread
            </h2>
            {session?.user ? (
              <UserProfile />
            ) : (<LoginButton />)}
            <ThemeToggle />
        </div>
    </header>
  )
}
