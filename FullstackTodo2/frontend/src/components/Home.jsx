import { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [idx, setIdx] = useState();

  const handleAdd = () => {
    if (toggle) {
      todoList[idx] = inputValue;

      setTodoList([...todoList]);
      setToggle(false);
    } else {
      setTodoList([...todoList, inputValue]);
    }

    setInputValue("");
  };

  const deleteTodo = (i) => {
    todoList.splice(i, 1);

    setTodoList([...todoList]);

    console.log(todoList);
  };

  const handleUp = (i) => {
    if (i === 0) return;

    const newTodo = [...todoList];

    [newTodo[i], newTodo[i - 1]] = [newTodo[i - 1], newTodo[i]];
    setTodoList(newTodo);
  };

  const handleDown = (i) => {
    if (i === todoList.length - 1) return;

    const newTodo = [...todoList];

    [newTodo[i], newTodo[i + 1]] = [newTodo[i + 1], newTodo[i]];
    setTodoList(newTodo);
  };

  const editTodo = (i) => {
    setIdx(i); 

    setInputValue(todoList[idx]);
    setToggle(true);
  };

  return (
    <div>
      <div>
        <input
          value={inputValue}
          placeholder="add Todo"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>
          {toggle ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      {todoList.map((x, i) => (
        <li key={i}>
          {x}
          <button onClick={() => editTodo(i)}>edit</button>
          <button onClick={() => deleteTodo(i)}>delete</button>
          {i > 0 && <button onClick={() => handleUp(i)}>Up</button>}
          {i < todoList.length - 1 && (
            <button onClick={() => handleDown(i)}>Down</button>
          )}
        </li>
      ))}
    </div>
  );
};

export default Home;
