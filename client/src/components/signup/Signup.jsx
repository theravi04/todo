import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    // Check if any of the input fields are not empty
    const anyFieldNotEmpty = Object.values(input).some(
      (field) => field.trim() !== ""
    );
    setIsButtonDisabled(!anyFieldNotEmpty);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:1000/api/v1/register`,
        input
      );
      // console.log(response);
      setInput({
        email: "",
        username: "",
        password: "",
      });
      history("/signin");
    } catch (error) {
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="sign-up">
      <div className="head">SignUp</div>
      <div className="user-email">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          onChange={change}
          value={input.email}
        />
      </div>
      <div className="user-id">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Username"
          onChange={change}
          value={input.username}
        />
      </div>
      <div className="user-pass">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          onChange={change}
          value={input.password}
        />
      </div>
      <div className="user-btn">
        <button onClick={submit} disabled={isButtonDisabled}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Signup;
