import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AppLayout } from '../../components/AppLayout'
import { getAppProps } from '../../utils/getAppProps'

export default function NewPost(props) {
  const router = useRouter()
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/generatePost`, {
      method: 'Post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ topic, keywords }),
    })

    const json = await response.json()
    console.log('RESULTS:', json)
    if (json?.postId) {
      router.push(`/post/${json.postId}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='topic'>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            id='topic'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='keywords'>
            <strong>Targeting the following topics:</strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            id='keywords'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button className='btn'>Generate</button>
      </form>
    </div>
  )
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx)
    return {
      props,
    }
  },
})
