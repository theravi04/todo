import React, { useState, useEffect } from "react";
import "./UpdateTodo.css";
import axios from "axios";

const UpdateTodo = ({ display, forUpdate }) => {

  useEffect(() => {
    setInput({
      title: forUpdate.title,
      body: forUpdate.body,
    });
  }, [forUpdate]);

  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async () => {
    // console.log("was here");
    // console.log(forUpdate);
    // console.log(forUpdate._id);
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${forUpdate._id}`, input)
      .then((response) => {
        console.log(response);
      });
    console.log(input);
  };

  return (
    <div className="update-container">
      <div className="update-head">
        <h3>Update Todo</h3>
      </div>
      <div className="title-update">
        <input
          className="update-title"
          type="text"
          placeholder="Title"
          value={input.title}
          name="title"
          onChange={change}
        />
      </div>
      <div className="body-update">
        <textarea
          className="update-body"
          type="text"
          placeholder="Body"
          name="body"
          value={input.body}
          onChange={change}
        />
      </div>
      <div className="btn-box">
        <div>
          <button className="update-btn" onClick={submit}>
            Update
          </button>
        </div>
        <div>
          <button
            className="update-close"
            onClick={() => {
              display("none");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
