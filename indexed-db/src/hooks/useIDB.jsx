import { openDB } from 'idb'

const useIDB = function(tableName) {
  const openIDB = async () =>
    await openDB('posts-store', 3, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (oldVersion !== newVersion) {
          if (!db.objectStoreNames.contains(tableName)) {
            db.createObjectStore(tableName, {
              keyPath: 'id'
            })
          }
          console.log('upgrade required')
        }
      }
    })
  let dbPromise = openIDB()
  async function getFromIDB() {
    const db = await dbPromise
    const tx = db.transaction(tableName, 'readonly')
    const store = tx.objectStore(tableName)
    return store.getAll()
  }

  async function addToIDB(st, data) {
    const db = await dbPromise
    const tx = db.transaction(st, 'readwrite')
    const store = tx.objectStore(st)
    store.put(data)
    return tx.complete
  }

  async function deleteFromIDB(st, id) {
    const db = await dbPromise
    const tx = db.transaction(st, 'readwrite')
    const store = tx.objectStore(st)
    store.delete(id)
    return tx.complete
  }

  async function deleteAllFromIDB(st) {
    const db = await dbPromise
    const tx = db.transaction(st, 'readwrite')
    const store = tx.objectStore(st)
    store.clear()
    return tx.complete
  }

  return { addToIDB, getFromIDB, deleteFromIDB, deleteAllFromIDB }
}

export default useIDB
