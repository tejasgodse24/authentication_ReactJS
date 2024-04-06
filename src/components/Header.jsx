import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getToken } from "../services/localStorageServicec";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { access_token } = getToken();
  useEffect(()=>{
    if(access_token){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  }, [access_token])
  return (
    <HeaderBox>
      <div>
        <img src="logo.svg" alt="Logo" />
      </div>
      <ul>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        <NavLink className="nav-link" to="/contact">
          Contact
        </NavLink>
     
     
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
       
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
         
        
      </ul>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.header`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-link {
    cursor: pointer;
    text-decoration: none;
  }
  div {
    display: flex;
  }
  ul {
    width: 100%;
    display: flex;
    font-size: 1.2rem;
    justify-content: space-evenly;
  }
  img {
    width: 100px;
  }
`;
