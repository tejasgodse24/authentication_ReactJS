import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { useLoginUserMutation } from "../services/userAuthApi";
import Loader from "../components/Loader";
import { getToken, storeToken } from "../services/localStorageServicec";
import {useDispatch} from 'react-redux'
import { setUserToken } from "../features/authSlice";
function Login() {
  const [serverError, setserverError] = useState({});

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, {isLoading}] = useLoginUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {}
    for (const [key, value] of data) {
      actualData[key] = value
    }

    const res = await loginUser(actualData)

    if(res.error){
      setserverError(res.error.data.errors)
    }
    if(res.data){
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/dashboard')
    }
    document.getElementById('login-form').reset()
  };

  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])

  return (
    <Container>
      <h1>Login</h1>
      <form action="" id="login-form" onSubmit={handleSubmit}>
        <LoginContainer>
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
          
          <button type=""> {isLoading ? <Loader /> : "Log In"}  </button>
          <div className="error-container">
          {serverError.non_field_errors ? serverError.non_field_errors.map((error, index)=>(
            <Alert key={index} type={"error"}>{error}</Alert>
          )) : ''}
          </div>
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
