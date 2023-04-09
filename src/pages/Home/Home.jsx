import React from 'react'
import './Home.css';
import ProfileSide from '../components/ProfileSide/ProfileSide';

export default function Home() {
  return (
    <div className='Home'>
      <ProfileSide />
      <div className="postSide">Posts</div>
      <div className="RightSide">Right</div>
    </div>
  )
}
