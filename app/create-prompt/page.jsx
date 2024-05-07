'use client'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'

const CreatePromptPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setsubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async e => {
    e.preventDefault()
    setsubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setsubmitting(false)
    }
  }
  return (
    <Suspense>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </Suspense>
  )
}

export default CreatePromptPage
