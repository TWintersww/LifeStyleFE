import { Link } from "react-router-dom"
import { format } from "date-fns"

const baseURL = import.meta.env.VITE_API_URL

const PostSnapshot = ({title, summary, coverimg, createdAt, id}) => {

  return (
    <div className="grid grid-cols-2 gap-5 my-6">
      <div className="w-80 h-52 overflow-hidden relative">
        <Link to={`/journal/view/${id}`}>
          {/* <img className="w-full h-full object-cover absolute top-0 left-0" src={`http://localhost:3001/${coverimg}`}></img> */}
          <img className="w-full h-full object-cover absolute top-0 left-0" src={`${baseURL}/${coverimg}`}></img>
        </Link>
      </div>
      
      <div className="max-h-52">
        <Link to={`/journal/view/${id}`}>
          <h2 className="m-0 text-2xl">{title}</h2>
        </Link>
        <p className="flex my-1.5 mx-0 text-gray-500 text-[0.7rem] font-bold gap-[10px]">
          <time>{format(createdAt, 'MMM. dd, yyyy')}</time>
        </p>
        <p className="my-2.5 mx-0 leading-[1.4rem] overflow-hidden text-ellipsis line-clamp-3">
          {summary}
        </p>
      </div>
    </div>
  )
}

export default PostSnapshot
