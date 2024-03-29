import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import "./Signin.css"

const Signin = () => {

  const dispatch = useDispatch();

  const history = useNavigate();

  const [input, setInput] = useState({
    email: "",
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
      const response = await axios.post(
        `http://localhost:1000/api/v1/signin`,
        input
      );
      // console.log(response.data.others._id);
      sessionStorage.setItem("id", response.data.others._id)
      dispatch(authActions.login())
      setInput({
        email: "",
        password: "",
      });
      history("/todo");
      // console.log("Success!");
    } catch (error) {
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  }

  return (
    <div className='signin-container'>
        <div className='heading'>SignIn</div>
        <div className='email-user'>
            <label>Email:</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Enter Your Email'
            onChange={change}
            value={input.email}
            />
        </div>
        <div className="pass-user">
            <label>Password:</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder='Enter Your Password'
            onChange={change}
            value={input.password}
            />
        </div>
        <div className='btn-user'>
            <button disabled={isButtonDisabled}
              onClick={submit} 
            >Sign-In</button>
        </div>
    </div>
  )
}

export default Signin