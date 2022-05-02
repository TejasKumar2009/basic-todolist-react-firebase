import React, { useEffect, useState } from "react";

import { doc, collection, getDocs, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

import Todo from "./components/Todo";
import "./App.css";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

function App() {
  const [todos, setTodos] = useState([
    { todo: "Hey whasaopp!!" },
    { todo: "Yooo guys how r yep!!" },
  ]);
  const [input, setInput] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);

  const getTodos = async () => {
    const todosSnapshot = await getDocs(collection(db, "todos"));
    const todosList = todosSnapshot.docs.map((doc) => doc.data());
    console.log(todosList)
    setTodos(todosList);
  };

  const changeInput = (event) => {
    setInput(event.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "todos"), {
      todo: input
    });
    await setDoc(doc(db, "todos", docRef.id), {
      todo: input,
      id: docRef.id
    });

    if (btnClicked) {
      setBtnClicked(false);
    } else {
      setBtnClicked(true);
    }

    setInput("");
    console.log("Todo Added!");
  };

  const deleteTodo = async (e) => {
    if (btnClicked) {
      setBtnClicked(false);
    } else {
      setBtnClicked(true);
    }
    await deleteDoc(doc(db, "todos", e.target.name));
  }


  useEffect(() => {
    getTodos();
  }, [btnClicked]);

  return (
    <div className="App">
      <h1>TodosCart - Add Your Todos Here & Be Productive! 🚀🚀</h1>
      <form onSubmit={addTodo} method="GET">
        <TextField
          value={input}
          onChange={changeInput}
          name="todoinput"
          id="standard-basic"
          label="✅ Write a Todo.."
          variant="standard"
        />
        <IconButton
          style={{
            color: "green",
            height: "60px",
            width: "60px",
            borderRadius: "50%",
          }}
          type="submit"
          aria-label="add"
        >
          +
        </IconButton>
      </form>
      <ol>
        {todos ? (
          todos.map((todo) => <Todo todo={todo}  deleteTodo={deleteTodo} />)
        ) : (
          <h1>No Todos</h1>
        )}
      </ol>
    </div>
  );
}

export default App;
