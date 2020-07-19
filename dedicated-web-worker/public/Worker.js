// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', handleMessage, false)
// eslint-disable-next-line no-restricted-globals
console.log(self)

async function handleMessage(event) {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const response = await data.json()
  console.log(response)
  // eslint-disable-next-line no-restricted-globals
  self.postMessage({
    message: `Sending: Hello from Worker!! when Receiving: ${event.data}`,
    data: response
  })
}
