function _OpenDB() {
  return indexedDB.open('post-store', 1)
}

export function openDB() {
  let openRequest = _OpenDB()
  openRequest.onupgradeneeded = function() {
    let db = openRequest.result
    if (!db.objectStoreNames.contains('post')) {
      // if there's no "books" store
      db.createObjectStore('post', { keyPath: 'id' }) // create it
    }
    // triggers if the client had no database
    // ...perform initialization...
  }

  openRequest.onerror = function() {
    console.error('Error', openRequest.error)
  }

  openRequest.onsuccess = function(postObj) {}
}

export function addPost(postObj) {
  let openRequest = _OpenDB()
  openRequest.onsuccess = function() {
    let db = openRequest.result
    let transaction = db.transaction('post', 'readwrite')
    let post = transaction.objectStore('post')

    let request = post.add(postObj)

    request.onsuccess = function() {
      // (4)
      console.log('Post added to the store', request.result)
    }

    request.onerror = function() {
      console.log('Error', request.error)
    }
  }
}

export function getPost() {
  let openRequest = _OpenDB()
  openRequest.onsuccess = function() {
    let db = openRequest.result
    let transaction = db.transaction('post', 'readonly')
    let post = transaction.objectStore('post')

    let request = post.getAll()
    console.log(request)
    request.onsuccess = function() {
      console.log('get from the store', request.result)
    }

    request.onerror = function() {
      console.log('Error', request.error)
    }
  }
}
