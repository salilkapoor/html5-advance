import React from 'react'

export function Posts({ data }) {
  function _Post(posts) {
    return posts.map(post => <li>{post.title}</li>)
  }
  return <ol>{data && _Post(data)}</ol>
}
