import React, { useEffect, useState } from 'react'

// import * as fromDB from './utils/idb'
import useIDB from './hooks/useIDB'

import './styles.css'

export default function App() {
  const { addToIDB, getFromIDB, deleteFromIDB, deleteAllFromIDB } = useIDB(
    'post'
  )
  const [posts, setPosts] = useState([])
  // fromDB.openDB()
  useEffect(() => {
    async function getPost() {
      const p = await getFromIDB()
      setPosts(p)
    }
    async function fetchPost() {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts/3')
      const postOne = await data.json()
      return postOne
    }
    fetchPost().then(res => addToIDB('post', res))
    getPost()
    // fetchPost().then(res => fromDB.addPost(res))
  }, [])
  // fromDB.getPost()
  console.log(posts)
  return (
    <div className="App">
      <h1>Indexed DB Sample</h1>
      <button onClick={() => deleteAllFromIDB('post')}>Clear ALL</button>
      <dl>
        {posts.map(item => (
          <React.Fragment key={item.id}>
            <dt>{item.title}</dt>
            <dd>
              {item.body}
              <button onClick={() => deleteFromIDB('post', item.id)}>
                Clear
              </button>
            </dd>
          </React.Fragment>
        ))}
      </dl>
      {/* <div>{fromDB.getPost()}</div> */}
    </div>
  )
}
