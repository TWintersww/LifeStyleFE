import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import journalService from "../../services/journal"
import { format } from "date-fns"

const baseURL = import.meta.env.VITE_API_URL

const PostFull = () => {

  const {id} = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    journalService.getOne(id)
      .then(post => setPost(post))
  }, [])

  if (!post) return ''

  const formattedContent = post.content.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
  return (
    <div className="mt-10">
      <h1 className="text-center text-5xl font-merriweather font-bold">
        {post.title}
      </h1>
      <time className="block text-center text-sm text-gray-500 my-6">
        {format(post.createdAt, 'MMM. dd, yyyy')}
      </time>
      <div className="text-center my-3">
        <Link to={`/journal/edit/${id}`} className="bg-gray-400 text-white active:bg-gray-600 font-bold text-l w-full px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
          Edit this post
        </Link>
      </div>
      {/* <div className="flex w-3/4 relative overflow-hidden mx-auto" style={{ paddingBottom: '75%' }}> */}
      <div className="flex w-3/5 aspect-square relative overflow-hidden mx-auto">
        {/* <img 
          src={`http://localhost:3001/${post.coverimg}`}
          className="object-cover object-center w-full h-full absolute"
        >
        </img> */}
        <img 
          src={`${baseURL}/${post.coverimg}`}
          className="object-cover object-center w-full h-full absolute"
        >
        </img>
      </div>
      <hr className="my-10"></hr>
      <div className="leading-[2rem] text-lg whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: formattedContent}}/>
    </div>
  )
}

export default PostFull
