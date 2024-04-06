import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { useChangeUserPasswordMutation } from "../services/userAuthApi";
import { getToken } from "../services/localStorageServicec";

function ChangePassword() {

  const [serverError, setServerError] = useState({});
  const [successMsg, setsuccessMsg] = useState();

  const [changeUserPassword]= useChangeUserPasswordMutation()
  const {access_token} = getToken()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {}
    for (const [key, value] of data) {
      actualData[key] = value
    }
    const res = await changeUserPassword({actualData, access_token})
    if(res.error){
      setServerError(res.error.data.errors)
      if (res.error.data.errors.code){
        setServerError({"non_field_errors": [res.error.data.errors.messages[0].message]})
      }

    }
    if(res.data){
      console.log(res.data.msg);
      setsuccessMsg(res.data.msg)
    }
    
    document.getElementById('change-pass-form').reset()
  };
  return (
    <Container>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} id="change-pass-form">
        <LoginContainer>
          
          <div>
            <label htmlFor="password">New Password</label>
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
          <div className="error-container">
          {serverError.non_field_errors ? serverError.non_field_errors.map((error, index)=>(
            <Alert key={index} type={"error"}>{error}</Alert>
          )) : ''}
          {
            successMsg ? <Alert type={"success"}>{successMsg}</Alert> : ''
          }
          
          </div>
          <button type="">Change Password</button>
         
        </LoginContainer>
      </form>
    </Container>
  );
}

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

export default ChangePassword;
