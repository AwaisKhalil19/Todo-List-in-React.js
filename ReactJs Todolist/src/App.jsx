import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [showFinished, setShowFinished] = useState(true)
  const [todos, setTodos] = useState(() => {
    const todoString = localStorage.getItem("todos")
    if (!todoString) return []
    try {
      return JSON.parse(todoString)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
  };
  const handleDelete = (e, id) => {
    let isConfirmed = window.confirm("Are you sure you want to delete this todo?");

    if (isConfirmed) {
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    }
    else {
      return;
    }
  }; 
  const handleAdd = () => {
    if (!todo.trim()) return
    setTodos([{id: uuidv4(), todo, isCompleted: false}, ...todos]);
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && todo.length >= 3) {
      handleAdd()
    }
  }

  const handleCheckbox = (e) => {
   let id =  e.target.name
   let index = todos.findIndex((item) => item.id === id)
   let newTodos = [...todos]
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
  }

  return (
    <>
    <Navbar/>
    <div className='md:container mx-auto my-5 rounded-xl p-5 bg-[#1E293B] text-white min-h-[80vh] md:w-1/2'>
      <div className="mb-2">
        <h1 className='text-3xl font-bold my-4 uppercase'>Manage your task</h1>
        <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} type="text" placeholder='Add a new task...' className='w-full text-[#1E293B] border-solid border-2 border-white p-2 rounded-md text-black mt-2 active: text-white' />
        <button onClick={handleAdd} disabled={todo.length < 3} className='w-full bg-white text-blue cursor-pointer hover:bg-white px-6 py-2.5 text-md font-bold text-[#1E293B] rounded-md my-4'>Add</button>
      </div>
      <button
  onClick={toggleFinished}
  className={`mr-2 my-6 text-xl align-middle ${
    showFinished ? "text-yellow-400" : "text-white"
  }`}
>
  {showFinished ? <FaCheckSquare /> : <FaRegSquare />}
</button>

<span>Show Finished</span>
      <h2 className='text-2xl font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className='text-center text-lg font-bold my-5'>No Todos Added</div>}
        {todos.map((item) => (
  (showFinished || !item.isCompleted) && (
    <div
      key={item.id}
      className="todo flex w-full items-center justify-between gap-3 my-4"
    >
      <div className="flex items-center gap-3 min-w-0 flex-nowrap">
      <button
  onClick={() => handleCheckbox({
    target: { name: item.id }
  })}
  className={`text-xl shrink-0 ${
    item.isCompleted ? "text-yellow-400" : "text-white"
  }`}
>
  {item.isCompleted ? <FaCheckSquare /> : <FaRegSquare />}
</button>

        <div
          className={`whitespace-nowrap ${
            item.isCompleted ? "line-through" : ""
          }`}
        >
          {item.todo}
        </div>
      </div>

      <div className="button shrink-0">
        {!item.isCompleted && (
          <button
            onClick={(e) => handleEdit(e, item.id)}
            className="bg-white text-[#1E293B] cursor-pointer px-2 py-1 text-md font-bold rounded-md mx-1"
          >
            <FaEdit />
          </button>
        )}

        {item.isCompleted && (
          <button
            onClick={(e) => handleDelete(e, item.id)}
            className="bg-white text-[#1E293B] cursor-pointer px-2 py-1 text-md font-bold rounded-md mx-1"
          >
            <MdDelete />
          </button>
        )}
      </div>
    </div>
  )
))}
      </div>
    </div>
    </>

  )
}

export default App


