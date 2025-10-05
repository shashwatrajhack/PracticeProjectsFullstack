import React from "react";

import { useState } from "react";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [idx, setIdx] = useState();

  const addTodo = () => {
    if (toggle) {
        todo[idx] = inputValue;
        setTodo([...todo]);
        setToggle(false);

    }else{
        setTodo([...todo, inputValue]);

    }
    
    setInputValue("");
    
  };

  const handleUp = (i) => {
    [todo[i], todo[i - 1]] = [todo[i - 1], todo[i]];
    setTodo([...todo]);
  };

  const handleDown = (i) => {
    let temp = todo[i];
    todo[i] = todo[i + 1];
    todo[i + 1] = temp;

    setTodo([...todo]);
  };

  const deleteHandle = (i) => {
    todo.splice(i, 1);
    setTodo([...todo]);
  };

  const editHandle = (i) => {
    
    setIdx(i);
    setInputValue(todo[idx]);
    setToggle(true);
  };
  return (
    <div>
      <div>
        <h1>Todoist</h1>
        <input
          value={inputValue}
          type="text"
          placeholder="add todo"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>{toggle ? "Update" : "Add todo"}</button>
      </div>
      <div>
        {todo.map((x, i) => (
          <li key={i}>
            {x}
            {i > 0 && <button onClick={() => handleUp(i)}>UP</button>}
            {i < todo.length - 1 && (
              <button onClick={() => handleDown(i)}>DOWN</button>
            )}
            <button onClick={() => deleteHandle(i)}>Delete</button>
            <button onClick={() => editHandle(i)}>Edit</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Home;
