import React, { useState, useEffect } from 'react'
import './styles.css'

export default function App() {
  const [message, setMessage] = useState('Hello Worker from State!!')
  console.log('myWorker')

  useEffect(() => {
    let myWorker = null
    function handleMsg(event) {
      console.log(event)
      setMessage(event.data)
    }

    if ('Worker' in window) {
      myWorker = new Worker('Worker.js')

      myWorker.addEventListener('message', handleMsg)
      myWorker.postMessage('Hello Worker from React!!')
    }

    return () => myWorker.removeEventListener('onmessage', handleMsg)
  })

  return (
    <div className="App">
      <h1>Dedicated Web Worker</h1>
      <p>{message}</p>
    </div>
  )
}
