import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";

function Login() {
  const [error, setError] = useState({status:false, msg:'', type:''})
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {}
    for (const [key, value] of data) {
      if (value === ''){
        setError({status:true, msg:"All fields are required", type:"error"})
        return
      }
      actualData[key] = value
    }
    document.getElementById('login-form').reset()
    setError({status:true, msg:"Login Success", type:"success"})
    console.log(actualData);
  };
  return (
    <Container>
      <h1>Login</h1>
      <form action="" id="login-form" onSubmit={handleSubmit}>
        <LoginContainer>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="error-container">
            {
              error.status && <Alert status={error.status} msg={error.msg} type={error.type}/>
            }
          </div>
          <button type=""> Log In</button>
          <div className="forgot-pass-container">
            <p>Forgot Your Password?</p>
            <NavLink to='/email-reset-password-link'>Reset Password</NavLink>
          </div>
        </LoginContainer>
      </form>
    </Container>
  );
}

export default Login;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  form {
    width: 50%;
  }
`;
export const LoginContainer = styled.div`
  padding: 30px;
  border-radius: 5px;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70vh;
  div {
    display: flex;
    gap: 10px;
    flex-direction: column;
    background-color: #191919;
  }
  div label {
    background-color: #191919;
  }

  div input {
    border: none;
    font-size: 1.2rem;
    padding: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-in-out;
  }
  button:hover {
    background-color: #2a2929;
  }
  .forgot-pass-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px;
  }
`;
