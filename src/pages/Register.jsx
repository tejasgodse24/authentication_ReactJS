import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { setUserToken } from "../features/authSlice";
import { getToken } from "../services/localStorageServicec";
import {useDispatch} from 'react-redux'

function Register() {
  const [serverError, setserverError] = useState({});

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [registerUser, {isLoading}] = useRegisterUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {};
    for (const [key, value] of data) {
      actualData[key] = value;
    }
    const res = await registerUser(actualData)
    if(res.error){
      setserverError(res.error.data.errors)
    }
    if(res.data){
      navigate('/')
    }
    document.getElementById("register-form").reset();
  };

  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])

  return (
    <Container>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} id="register-form">
        <LoginContainer>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Name" />
            {serverError.name ? <Alert type={"error"}>{serverError.name[0]}</Alert> : ''}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            {serverError.email ? <Alert type={"error"}>{serverError.email[0]}</Alert> : ''}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            {serverError.password ? <Alert type={"error"}>{serverError.password[0]}</Alert> : ''}
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
            />
            {serverError.password2 ? <Alert type={"error"}>{serverError.password2[0]}</Alert> : ''}
          </div>
          <div className="check-box">
            <input type="checkbox" name="tc" id="tc" />
            <label htmlFor="tc">Allow terms and condition</label>
          </div>
            {serverError.tc ? <Alert type={"error"}>{serverError.tc[0]}</Alert> : ''}
          <button type="submit">Register</button>
          <div className="error-container">
          {serverError.non_field_errors ? serverError.non_field_errors.map((error, index)=>(
            <Alert key={index} type={"error"}>{error}</Alert>
          )) : ''}
          </div>

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
