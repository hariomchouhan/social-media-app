import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';
import FollowersCard from '../FollowersCard/FollowersCard';

export default function ProfileSide() {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  )
}
