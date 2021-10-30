import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = () => {
  const [socket, setSocket] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const newSocket = io('http://localhost:4000')
    // console.log(newSocket)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const handleChange = value => {
    setMsg(value)
  }

  useEffect(() => {
    if (msg !== '') {
      socket.emit('message', msg)
    }
  }, [msg])

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean']
    ]
  }

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background'
  ]

  // socket?.on('connect', console.log(socket))

  return (
    <div style={{ height: '650px' }}>
      <ReactQuill
        style={{ height: '600px' }}
        theme='snow'
        modules={modules}
        formats={formats}
        value={msg || ''}
        onChange={(content, delta, source, editor) =>
          handleChange(editor.getHTML())
        }
      />
    </div>
  )
}

export default TextEditor
