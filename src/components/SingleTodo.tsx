import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit ,AiFillDelete} from "react-icons/ai";
import {MdDone} from 'react-icons/md';
import './styles.css'


interface Props{
  todo:Todo;
  key:number;
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({todo,key,todos,setTodos}) => {

  // to check id edit mode is on or not
  const [edit,setEdit] = useState<boolean>(false)
  // this one will keep the edit todo text
  const [editTodo,setEditTodo] = useState<string>(todo.todo);
  // when we click on edit the focus does not go on input filed that is why we use useref

  const inputRef = useRef<HTMLInputElement>(null)

const handleDone = (id:number) =>{
  setTodos(todos.map((todo) =>(
    todo.id === id ? {...todo,isDone:!todo.isDone}:todo
  )))
}


// todo.id jab id se equal nahi hogi tab return kro
const handleDelete = (id:number) =>{
   setTodos(todos.filter((todo) =>(
    todo.id !== id  
   )))
}

// but we want to chnagw the editTodo state when we hit enter
const handleEdit = (e:React.FormEvent,id:number) =>{
    e.preventDefault();
    setTodos(todos.map((todo) =>(todo.id === id ?{...todo,todo:editTodo} :todo)));
    setEdit(false)
}


useEffect(() =>{
inputRef.current?.focus()
},[edit])
  return (
    // we are using form because we are going to add edit funtionality
    <form className='todos-single' onSubmit={(e) => handleEdit(e,todo.id)}>


      {
        edit ? (
         <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} className='todos-single-text'/>
        ): (
          todo.isDone ? (
            <s className='todos-single-text'>{todo.todo}</s>
          ):(
            <span className='todos-single-text'>{todo.todo}</span>
          )
        )
      
      }
    
      <div>
        <span className="icon" onClick={ () =>{
        // edit mode on nahi hai and todo done nhai hai toh
        if(!edit && !todo.isDone){
          setEdit(!edit)
            }}
  
        }><AiFillEdit /></span>
        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
        <span className="icon"  onClick={() => handleDone(todo.id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleTodo;