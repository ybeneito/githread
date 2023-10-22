import { getUserEdit } from '@/src/query/user.query'
import React from 'react'
import { EditProfileModal } from './EditProfileModal'
import { editProfile } from '@/app/profile/edit/edit-profile.action'

export default async function page() {
    const user = await getUserEdit()


  return (
    <EditProfileModal user={user} editProfile={editProfile} />
  )
}
