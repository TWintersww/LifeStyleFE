import { useState, useRef, useEffect } from 'react'
import QuillEditor from './QuillEditor'
import journalService from '../../services/journal'
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [coverimg, setCoverimg] = useState('')
  const [preview, setPreview] = useState('')
  const [redirect, setRedirect] = useState(false)

  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleCreatePost = async (e) => {
    // console.log('handleCreatePost')
    e.preventDefault()

    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('coverimg', coverimg)

    try {
      const response = await journalService.postNew(data)
      console.log("createPost status:", response.status)

      if (response.status === 201) {
        console.log("set redirect to true")
        setRedirect(true)
      }
    }
    catch (e) {
      console.log(e.response.data.error)
      navigate("/journal")
    }
  }
  const handleFileChange = (e) => {
    // console.log('handleFileChange')
    e.preventDefault()

    const file = e.target.files[0]
    if (file) {
      setCoverimg(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  if (redirect) {
    return <Navigate to="/journal" />
  }

  return (
    <form onSubmit={handleCreatePost}>
      <input 
        type='title' 
        placeholder={'Title (required)'} 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      <textarea 
        type='summary'
        rows='3' 
        placeholder={'Summary'} 
        value={summary} 
        onChange={(e) => setSummary(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />

      <div className="w-full p-4 border border-gray-300 rounded-md focus:outline-none">
        <button className="mb-4 bg-gray-400 text-white active:bg-gray-600 text-m px-2 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type='button' onClick={() => fileInputRef.current.click()}>{coverimg ? 'Change Image (required)' : 'Choose Image (required)'}</button>
        {
          preview
          ? <img src={preview} alt="Image Preview" style={{ width: '200px', height: '200px', objectFit: 'cover', border: '1px solid #ddd' }} />
          : <div style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
              {/* Empty box for no image */}
            </div>
        }
      </div>
      <input type='file' ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange}/>

      <QuillEditor value={content} onChange={setContent} />
      
      <button 
        className="bg-gray-400 text-white active:bg-gray-600 font-bold text-l w-full px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        Create Post
      </button>
    </form>
  )
}

export default CreatePost
