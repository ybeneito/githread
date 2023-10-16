import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getAuthSession } from '@/lib/auth'
import { ButtonIcon } from '@radix-ui/react-icons'
import { User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { DropdownMenuItemLogout } from './DropdownMenuItemLogout'

export const UserProfile = async () => {
    const session = await getAuthSession()
    console.log("SESSION: ",session)
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
                {session?.user.name ?? ""}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent > 
            <DropdownMenuItem asChild>
                <Link href="/profile">
                    <User2 className="mr-2 h4 w-4" />
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItemLogout />
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
