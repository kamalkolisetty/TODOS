import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import  './TodoList.css'
export default function TodoList() {
    let [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [{
            task: "sample task",
            id: uuidv4(),
            isDone: false
        }];
    });

    let [newTodo, setNewTodo] = useState("");

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addNewTask = () => {
        if (newTodo.trim() === "") {
            return;
        }
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    };

    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const markAsDoneAll = () => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => ({ ...todo, isDone: true }))
        );
    };

    const markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: true };
                }
                return todo;
            })
        );
    };

    return (
        <>
            <input
                placeholder="add your task"
                value={newTodo}
                onChange={updateTodoValue}
                style={{ padding: "0.6rem", fontSize: "18px", borderRadius: "20px" }}
            />
            <button onClick={addNewTask} id="new" >Add Task</button>

            <br />
            <br />
            <br />
            <hr />
            <h2 style={{padding:"9px"}} >Tasks to-do</h2>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{todo.task}</span> &nbsp;&nbsp;
                        <span>
                            <button onClick={() => deleteTodo(todo.id)} style={{backgroundColor:"red",color:"white"}} >Delete</button> &nbsp;&nbsp;
                            <button onClick={() => markAsDone(todo.id)} style={{backgroundColor:"green",color:"white"}} >Mark as Done</button>
                        </span>
                        <br />
                        <br />
                    </li>
                ))}
            </ul>

            <button onClick={markAsDoneAll}   style={{backgroundColor:"#2568FB",color:"white"}}  >Mark as Done ALL</button>

            <br />
            <br />
        </>
    );
}
