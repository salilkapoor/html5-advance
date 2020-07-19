import React from 'react'

export function DragNDrop() {
  function onDragStartHandler(ev) {
    console.log('Started')
    ev.dataTransfer.setData('my-app', ev.target.id)
    console.log(ev.dataTransfer)
    ev.dataTransfer.dropEffect = 'move'
  }

  return (
    <div>
      Drag and Drop
      <div>
        Drag Zone
        <ol>
          <li id="list-1" draggable onDragStart={ev => onDragStartHandler(ev)}>
            Task abc
          </li>
          <li draggable id="list-2" onDragStart={ev => onDragStartHandler(ev)}>
            Task pqr
          </li>
          <li draggable id="list-3" onDragStart={ev => onDragStartHandler(ev)}>
            Task xyz
          </li>
        </ol>
      </div>
      <div>
        Drop Zone
        <ol
          onDrop={ev => {
            console.log('Ended')
            ev.preventDefault()
            console.log(ev.dataTransfer)

            // Get the id of the target and add the moved element to the target's DOM
            const data = ev.dataTransfer.getData('my-app')
            ev.target.appendChild(document.getElementById(data))
          }}
          onDragOver={ev => {
            console.log('Drag Over')
            ev.preventDefault()
            ev.dataTransfer.dropEffect = 'move'
          }}
        >
          <li>Completed Task</li>
        </ol>
      </div>
    </div>
  )
}
