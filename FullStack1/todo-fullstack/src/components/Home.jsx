import React, { useState, useEffect } from "react";
const url = "http://localhost:3000/";
function Home() {
  const [inputvalue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    fetchGetAllToDo();
  }, []);
  const fetchGetAllToDo = async () => {
    const response = await fetch(`${url}getTodo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTodo(data);
  };
  const handleAdd = async () => {
    if (toggle) {
          await fetch(`${url}updateTodo/${idx}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:inputvalue
      })
    })
      fetchGetAllToDo();
      setToggle(false);
    } else {
      await fetch(`${url}addTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputvalue,
        }),
      });
    }
    fetchGetAllToDo();
    setTodo([...todo]);
    setInputValue("");
  };

  const deleteTodo = async (i) => {
    await fetch(`${url}deleteTodo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: i,
      }),
    });
    fetchGetAllToDo();
  };

  const editTodo = async(i) => {
    const name = todo.find(x=>x._id===i).name
    setInputValue(name);
    setIdx(i);
    setToggle(true);
  };

  const handleUp = (i) => {
    let temp = todo[i];
    todo[i] = todo[i - 1];
    todo[i - 1] = temp;

    setTodo([...todo]);
  };
  const handleDown = (i) => {
    let temp = todo[i];
    todo[i] = todo[i + 1];
    todo[i + 1] = temp;

    setTodo([...todo]);
  };

  return (
    <div>
      <header>Todo List</header>
      <div>
        <input
          value={inputvalue}
          placeholder="add todo"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>{toggle ? "update" : "Add todo"}</button>
      </div>
      {todo.map((x, i) => (
        <li key={x._id}>
          {x.name}
          {i !== 0 && <button onClick={() => handleUp(i)}>Up</button>}
          <button onClick={() => editTodo(x._id)}>Edit</button>
          <button onClick={() => deleteTodo(x._id)}>Delete</button>
          {i < todo.length - 1 && (
            <button onClick={() => handleDown(i)}>Down</button>
          )}
        </li>
      ))}
    </div>
  );
}

export default Home;
