import { useState, useRef, useEffect } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import QuillEditor from './QuillEditor'
import journalService from '../../services/journal'


const EditPost = () => {
  const {id} = useParams()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [coverimg, setCoverimg] = useState('')
  //preview holds s3URI
  const [preview, setPreview] = useState('')
  const [redirect, setRedirect] = useState(false)

  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    journalService.getOne(id)
      .then(post => {
        setTitle(post.title)
        setSummary(post.summary)

        if (post.content) {
          const contentForEditing = post.content.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
          setContent(contentForEditing)
        }

        if (post.coverimg) {
          setPreview(post.coverimg)
        }
      })
  }, [id])

  const handleEditPost = async (e) => {
    // console.log('handleEditPost')
    e.preventDefault()

    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)

    /*
    If user uploads new image: set 'coverimg' field
    Else: set 'existingCoverimg' with preview, which holds old s3URI
    */
    if (coverimg) {
      data.set('coverimg', coverimg)
    }
    else {
      //preview holds s3URI of old image
      data.set('existingCoverimg', preview)
    }

    try {
      const response = await journalService.editOne(id, data)
      // console.log(response.status)
      if (response.status === 200) {
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
    return <Navigate to={`/journal/view/${id}`} />
  }
  return (
    <form onSubmit={handleEditPost}>
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
        <button className="mb-4 bg-gray-400 text-white active:bg-gray-600 text-m px-2 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type='button' onClick={() => fileInputRef.current.click()}>{coverimg ? 'Change Image' : 'Choose Image (required)'}</button>
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
        Update Post
      </button>
    </form>
  )
}

export default EditPost
