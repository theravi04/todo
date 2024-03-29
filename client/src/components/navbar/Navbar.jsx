import React from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout())
    window.location.reload();
  }

  return (
    <div className="navbar">
      <div className="logo">
        <div className="logo1">
          <ChecklistIcon />
        </div>
        <Link className="todo" to="/">
          Your ToDo
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/todo">
          ToDo
        </Link>
        <Link className="link" to="/about">
          About Us
        </Link>
        {!isLoggedIn && (
          <>
            <Link className="link" to="/signup">
              SignUp
            </Link>
            <Link className="link" to="/signin">
              SignIn
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link className="link" to="#" onClick={logout}>
              LogOut
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
