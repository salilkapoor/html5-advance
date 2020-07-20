import React, { useEffect } from 'react'

import * as fromDB from './utils/idb'

import './styles.css'

export default function App() {
  fromDB.openDB()
  useEffect(() => {
    async function fetchPost() {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      const postOne = await data.json()
      return postOne
    }
    fetchPost().then(res => fromDB.addPost(res))
  }, [])
  fromDB.getPost()
  return (
    <div className="App">
      <h1>Indexed DB Sample</h1>
      <div>{fromDB.getPost()}</div>
    </div>
  )
}
