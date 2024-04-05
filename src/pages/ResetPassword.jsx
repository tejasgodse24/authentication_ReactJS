import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";

function ResetPassword() {
  const [error, setError] = useState({status:false, msg:'', type:''})
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {password: data.get('password'), confirm_password: data.get('confirm-password')}
    if(actualData.confirm_password && actualData.password){
      if(actualData.confirm_password !== actualData.password){
        setError({status:true, msg:"Password doesn't match", type:"error"})
        return
      }
      setError({status:true, msg:"Password is Reset Successfully", type:"success"})
      console.log(actualData.confirm_password , actualData.password);
      document.getElementById('reset-pass-form').reset()
    }
    else{
      setError({status:true, msg:"All fields are required", type:"error"})
    }

  };
  return (
    <Container>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} id="reset-pass-form">
        <LoginContainer>
          
          <div>
            <label htmlFor="password">New Password</label>
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
          <div className="error-container">
            {
              error.status && <Alert status={error.status} msg={error.msg} type={error.type}/>
            }
          </div>
          <button type="">Reset Password</button>
         
        </LoginContainer>
      </form>
    </Container>
  );
}

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


export default ResetPassword


