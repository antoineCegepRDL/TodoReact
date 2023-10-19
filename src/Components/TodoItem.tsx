import '../styles/todoItem.scss'
import Todo from '../types/Todo'

export default function TodoItem({todo, onTodoCompleteClick, onTodoDeleteClick}: {todo: Todo, onTodoCompleteClick: any, onTodoDeleteClick: any}) {
  const todoClass = todo.isCompleted ? 'completed' : ''
  const handleCompletedClick = () => {
    onTodoCompleteClick(todo.id)
  }
  const handleDeleteClick = () => {
    onTodoDeleteClick(todo.id)
  }
  return (
    <div className="todo">
      <p className={todoClass} onClick={handleCompletedClick}>{todo.text}</p>
      <p onClick={handleDeleteClick}>click ici pour delete</p>
    </div>
  )
}