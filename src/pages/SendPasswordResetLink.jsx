import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";

function SendPasswordResetLink() {
  const [error, setError] = useState({status:false, msg:'', type:''})
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {email: data.get('email')}
    if(actualData.email){
      setError({status:true, msg:"Reset password link is sent to gmail", type:"success"})
      console.log(actualData);
      document.getElementById('sendpasslink-form').reset()
    }
    else{
      setError({status:true, msg:"Email is required", type:"error"})
    }

  };
  return (
    <Container>
      <form onSubmit={handleSubmit} id="sendpasslink-form">
      <div>
        <label htmlFor="email">Enter Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>
      <div className="error-container">
            {
              error.status && <Alert status={error.status} msg={error.msg} type={error.type}/>
            }
          </div>
      <button type='submit'>Send Reset Password Link</button>
      </form>
    </Container>
  );
}

export default SendPasswordResetLink;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 9rem auto 0rem;
  padding: 40px;
  background-color: #191919;
  form{
  background-color: #191919;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #191919;
    input {
      width: 85%;
      font-size: 1.1rem;
      padding: 10px;
      border: none;
    }
    label {
      background-color: #191919;
    }
  }
  button {
    margin-top: 2rem;
    padding: 10px 20px;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    align-self: center;

  }
  button:hover {
    background-color: #2a2929;
  }
  .error-container{
    margin-top: 30px;
  }
`;
