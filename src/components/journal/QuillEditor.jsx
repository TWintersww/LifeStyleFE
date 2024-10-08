import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image'],
    ['clean']
  ],
  // keyboard: {
  //   bindings: {
  //     tab: {
  //       key: 9,
  //       handler: function(range, context) {
  //         this.quill.insertText(range.index, '    ')
  //         this.quill.setSelection(range.index + 4);
  //       }
  //     }
  //   }
  // }
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote',
  'list', 'indent',
  'link', 'image'
]

const QuillEditor = ({ value, onChange }) => {
  return (
    <ReactQuill 
      value={value} 
      onChange={onChange} 
      modules={modules} 
      formats={formats}
    />
  )
}

export default QuillEditor
