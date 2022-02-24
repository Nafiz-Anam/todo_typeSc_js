import React, { useState, useEffect } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

const getLocalItems = () =>{

  let list = localStorage.getItem('lists');
  
  console.log(list);

  if (list) {
      return JSON.parse(localStorage.getItem('lists') || "");
  } else {
      return [];
  }
}


function App() {
  const [todos, setTodos] = useState<Array<Todo>>(getLocalItems());

  const toggleComplete: ToggleComplete = selectedTodo => {
    const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = newTodo => {
    if (newTodo !== "") {
      setTodos([...todos, { text: newTodo, complete: false }]);
    }
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem( 'lists', JSON.stringify(todos))
  }, [todos]);

  return (
    <div className="todo-app">
      <header>
        <h1>
        Todo App
        </h1>
      </header>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete}/>
    </div>
  );
};

export default App;
