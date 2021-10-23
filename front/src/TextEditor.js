import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const TextEditor = () => {
  const [socket, setSocket] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const newSocket = io('http://localhost:4000')
    // console.log(newSocket)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (msg !== '') {
      socket.emit('message', msg)
    }
  }, [msg])

  // socket?.on('connect', console.log(socket))

  return (
    <div>
      <h3>Here's the TextEdit component.</h3>
      <textarea
        rows='10'
        cols='50'
        placeholder='Write something here...'
        onChange={e => setMsg(e.target.value)}
      ></textarea>
    </div>
  )
}

export default TextEditor
