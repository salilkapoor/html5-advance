// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', handleMessage, false)
// eslint-disable-next-line no-restricted-globals
console.log(self)

function handleMessage(event) {
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(`Sending: Hello from Worker!! when Receiving: ${event.data}`)
}
