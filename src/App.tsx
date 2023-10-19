import { useState, useEffect } from "react"
import TodoItem from "./Components/TodoItem"
import AddTodo from "./Components/AddTodo"
import Todo from "./types/Todo"
import {POST, DELETE, GET, PATCH } from "./composables/server"

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const res = await GET<Todo>("todos")
    setTodos(res)
  }

  useEffect(() => {
    async function fetchData() {
      await getTodos();
    }
    fetchData();
  }, []);

  const onAddTodo = async (text: string) => {
    const todo: Todo = {text, isCompleted: false, date: new Date()} as any
    const newTodo = await POST<Todo>("todo", todo)
    setTodos([...todos, newTodo])
    
  }

  const onTodoCompleteClick = async (id: string) => {
    const updatedTodos = [...todos]
    const todo = updatedTodos.find(x => x.id === id)
    if(todo) {
      todo.isCompleted = !todo.isCompleted
      setTodos(updatedTodos)
      await PATCH<Todo>(`todo/${id}`, todo)
    }
    else {
      alert ("erreur dans la mise à jour du todo")
    }
  }

  const onTodoDeleteClick = async (id: string) => {
    await DELETE(`todo/${id}`)
    const updatedTodos = [...todos].filter(x => x.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div>
      <h1>Liste des todos</h1>
      <div className="todo-container">
        {todos.map((todo) => (
          <TodoItem todo={todo} onTodoCompleteClick={onTodoCompleteClick} onTodoDeleteClick={onTodoDeleteClick} key={todo.id}/>
        ))}
        <AddTodo onAddTodo={onAddTodo}></AddTodo>
      </div>
    </div>
  )
}
