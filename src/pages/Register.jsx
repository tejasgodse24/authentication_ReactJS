import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Alert from "../components/Alert";

function Register() {
  const [error, setError] = useState({ status: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {};
    for (const [key, value] of data) {
      if (value === "") {
        setError({
          status: true,
          msg: "All fields are required",
          type: "error",
        });
        return;
      }
      actualData[key] = value;
    }
    if (actualData["tc"] === undefined) {
      setError({ status: true, msg: "Please allow T&C", type: "error" });
      return;
    }
    else if(actualData['password'] !== actualData['confirm-password']){
      setError({ status: true, msg: "Password doesn't match", type: "error" });
      return;
    }
    document.getElementById("register-form").reset();
    setError({ status: true, msg: "Register Success", type: "success" });
    console.log(actualData);
  };
  return (
    <Container>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} id="register-form">
        <LoginContainer>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Name" />
          </div>
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
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="check-box">
            <input type="checkbox" name="tc" id="tc" />
            <label htmlFor="tc">Allow terms and condition</label>
          </div>
          <div className="error-container">
            {error.status && (
              <Alert status={error.status} msg={error.msg} type={error.type} />
            )}
          </div>
          <button type="submit">Register</button>
          <div className="login-link-container">
            <p>Already Have Account?</p>
            <NavLink to="/login">Login Here</NavLink>
          </div>
        </LoginContainer>
      </form>
    </Container>
  );
}

export default Register;

const Container = styled.main`
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
const LoginContainer = styled.div`
  padding: 30px;
  border-radius: 5px;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
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

  .check-box {
    display: flex;
    flex-direction: row;
  }
  .login-link-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px;
  }
  .error-container {
    color: red;
  }
`;
