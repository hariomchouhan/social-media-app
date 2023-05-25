import React from 'react'
import './Posts.css';
import { PostsData } from '../../Data/PostsData';
import Post from '../Post/Post';
import { useDispatch } from 'react-redux';

export default function Posts() {

  const dispatch = useDispatch();
  return (
    <div className='Post'>
      {PostsData.map((post, id) => {
        return(
          <Post data={post} id={id} />
        )
      })}
    </div>
  )
}
