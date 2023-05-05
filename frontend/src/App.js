import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:3001";

function App() {
    const[todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
    }, [])

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("Error: ", err));
    }
    
    const completeTodo = async id => {
        const res = await fetch(API_BASE + "/todo/complete/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        
        setTodos(todos => todos.map(todo => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
      
          return todo;
        }));
      }
      
      const deleteTodo = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, {
            method: "DELETE"
        }).then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id));

      }

	return (
		<div className="App">
			<h1>Omar's To Do List</h1>
            <h4>Tasks</h4>
            
            <div className = "todos">
                {todos.map(todo => (

                    <div className = {
                        "todo " + (todo.complete ? "complete" : "")
                    } key = {todo._id} onClick={() => completeTodo(todo._id)}>
                        <div className = "checkbox"> </div>

                        <div className = "task"> {todo.text} </div>

                        <div className = "delete" onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>

                ))}
        

            </div>

            <div className = "addPopup" onClick={() => setPopupActive(true)}> + </div>

		</div>
	);
}

export default App;
