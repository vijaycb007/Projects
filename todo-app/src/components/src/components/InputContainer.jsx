import React from 'react'

function inputContainer({inputVal , writeTodo , addTodo }) {
  return (
    <div className="input-container">
      <input type="text" value={inputVal} onChange={writeTodo}/>
      <button onClick={addTodo}>+</button>
    </div>
  )
}

export default inputContainer
