import React, { useState } from 'react';
import '../styles/todoItem.scss'

export default function SendMessage({ onAddTodo }: { onAddTodo: any }) {
  const [text, setText] = useState('');
  // Bon, bonne chance pour trouver le type tout seul ici! Par contre, ça permet d'utiliser l'autocomplete!
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSendClick = () => {
    onAddTodo(text)
    setText('')
  }


  return (
    <div className="todo-container">
      <input type="text" value={text} onChange={handleInputChange} className="todo-input" placeholder="Ajouter un todo" />
      <button className="send-button" onClick={handleSendClick}>Send</button>
    </div>
  )
}