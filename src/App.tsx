import React, { useState } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import './App.css';

// this is functional component that is why we have written React.FC
const App:React.FC = () =>{

  const [todo,setTodo] = useState<string>('');
  // this state will contain all the todos that we add// <Todo[]>usestate([]) because it is an array of object
  // this how array of interface or type is created  
  const [todos,setTodos] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) =>{
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
      setTodo('')
    }
  }
  console.log(todos);
  
  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    
    </div>
  );
}

export default App;
