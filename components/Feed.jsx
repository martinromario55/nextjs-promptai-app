'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [setsearchText, setSetsearchText] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }
    fetchPosts()
  }, [])

  const handleSearchChange = e => {}
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-container">
        <input
          type="text"
          className="search_input peer"
          value={setsearchText}
          onChange={handleSearchChange}
          required
          placeholder="Search for a tag or a username"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
