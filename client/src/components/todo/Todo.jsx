import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoCard from "./TodoCard";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";

let toUpdateArray = [];
let id = sessionStorage.getItem("id");

const Todo = () => {
  const [array, setArray] = useState([]);

  const [input, setInput] = useState({ title: "", body: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  
  const submit = async () => {
    if (input.title.trim() !== "" && input.body.trim() !== "") {
      try {
        if (id) {
          // console.log("Sending Data");
          await axios.post(
            `http://localhost:1000/api/v2/addTask`,
            {
              title: input.title,
              body: input.body,
              id: id,
            }
            );
            // console.log(response.data);
            // setArray([...array, input]);
            setInput({ title: "", body: "" });
          } else {
            setArray([...array, input]);
            setInput({ title: "", body: "" });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    // Determine whether the submit button should be disabled
    const isDisabled = input.title.trim() === "" || input.body.trim() === "";
    
    const deleteTodo = async (cardId) => {
      if (id) {
        console.log(cardId);
        try {
          await axios
          .delete(`http://localhost:1000/api/v2/deleteTask/${cardId}`, {
            data: { id: id },
          })
          .then((response) => {
            console.log(response.data);
          });
          
          // Handle any further logic after successful deletion
        } catch (error) {
          console.error("Error:", error);
          // Handle error response here
        }
      } else {
        console.log("Log in to your account");
      }
    };
    
    const updateYourTask = (value) => {
      toUpdateArray = array[value];
    }
    
    const displayUpdateTodo = (value) => {
      console.log(value);
      document.getElementById("todo-update").style.display = value;
    };
    
    useEffect(() => {
      if (id) {
        const fetch = async () => {
          await axios
            .get(`http://localhost:1000/api/v2/getTask/${id}`)
            .then((response) => {
              setArray(response.data.list);
            })
            .catch((error) => {
              console.error("Error fetching tasks:", error);
            });
        };
        fetch();
      }
    });
    // }, [submit]);

  return (
    <div>
      <div className="todo-container">
        <div className="todo-header">Todo</div>
        <div className="todo-form">
          <input
            type="text"
            className="for-title"
            placeholder="Title"
            name="title"
            value={input.title}
            onChange={change}
          />
          <textarea
            type="text"
            className="for-body"
            placeholder="Body"
            name="body"
            value={input.body}
            onChange={change}
          />
          <button onClick={submit} disabled={isDisabled}>
            Add ToDo
          </button>
        </div>
        <div className="todo-list">
          {array &&
            array.map((item, index) => (
              <TodoCard
                title={item.title}
                body={item.body}
                id={item._id}
                delid={deleteTodo}
                display={displayUpdateTodo}
                updateId = {index}
                toUpdate={updateYourTask}
              />
            ))}
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <UpdateTodo display={displayUpdateTodo} forUpdate={toUpdateArray}/>
      </div>
    </div>
  );
};

export default Todo;
