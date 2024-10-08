import { useEffect, useState } from "react"
import PostSnapshot from "./PostSnapshot"
import journalService from "../../services/journal"

const JournalHome = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  useEffect(() => {
    journalService.getAll()
      .then(posts => setPosts(posts))
  }, [])

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  return (

    <div>
      {/* Pagination */}
      {
        totalPages > 0 
        ? 
        <div className="flex justify-center items-center gap-4 mb-10">
          <button onClick={handlePrevPage} className="px-6 py-2">
            &lt;&lt;
          </button>
          <span className="w-1/6 text-center">
            page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} className="px-6 py-2">
            &gt;&gt;
          </button>
        </div>
        :
        ''
      }

      {currentPosts.length > 0 && currentPosts.map(post => (
        <div key={post.id}>
          <PostSnapshot {...post} />
          <hr></hr>
        </div>
      ))}

      {/* Pagination */}
      {
        totalPages > 0
        ?
        <div className="flex justify-center items-center gap-4">
          <button onClick={handlePrevPage} className="px-6 py-2">
            &lt;&lt;
          </button>
          <span className="w-1/6 text-center">
            page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} className="px-6 py-2">
            &gt;&gt;
          </button>
        </div>
        : ''
      }
    </div>

    
  )
}

export default JournalHome
