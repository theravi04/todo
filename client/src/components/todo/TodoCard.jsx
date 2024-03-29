import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./TodoCard.css";

const TodoCard = ({ title, body, id, delid, display, updateId, toUpdate }) => {
  return (
    <div className="todo-card">
      <div className="content">
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
      <div className="buttons">
        <button className="delete-button"
          onClick={() =>{
            display("block")
            console.log(updateId);
            toUpdate(updateId)
          }}
        >
          <EditNoteIcon />
          Update
        </button>
        <button className="edit-button" 
        onClick={() => {
            delid(id);
        }}>
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
