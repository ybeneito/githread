"use client"
import { ProfileForm, ProfileFormType } from '@/app/profile/edit/ProfileForm'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserEdit } from '@/src/query/user.query'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

export const EditProfileModal = ({user, editProfile} : {
    user: UserEdit,
    editProfile: (values: ProfileFormType) => Promise<string>
}) => {
    const router = useRouter();
    const pathname = usePathname();
  
    return (
      <Dialog
      open={pathname?.includes("/profile/edit")}
        onOpenChange={() => {
          router.back();
        }}
      >
        <DialogContent>
          <ProfileForm
            user={user}
            onSubmit={async (values) => {
              const result = await editProfile(values);
              router.back();
              return result;
            }}
          />
        </DialogContent>
      </Dialog>
    );
}
