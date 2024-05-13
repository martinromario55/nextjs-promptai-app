'use client'
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditPromptPage = () => {
  const router = useRouter()
  const [submitting, setsubmitting] = useState(false)
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }
    if (promptId) getPromptDetails()
  }, [promptId])

  const UpdatePrompt = async e => {
    e.preventDefault()
    setsubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
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
    // <Form
    //   type="Edit"
    //   post={post}
    //   setPost={setPost}
    //   submitting={submitting}
    //   handleSubmit={UpdatePrompt}
    // />

    <div>
      {promptId ? ( // Check if promptId exists before rendering the form
        <Suspense fallback={<div>Loading prompt details...</div>}>
          <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdatePrompt}
          />
        </Suspense>
      ) : (
        <div>Prompt ID not found</div>
      )}
    </div>
  )
}

export default EditPromptPage
