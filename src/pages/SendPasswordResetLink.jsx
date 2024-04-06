import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";
import { useSendResetPassEmailMutation } from "../services/userAuthApi";
import Loader from "../components/Loader";

function SendPasswordResetLink() {
  const [serverError, setserverError] = useState({});
  const [successMSG, setSuccessMSG] = useState();
  const [sendResetPassEmail, { isLoading, isSuccess }] =
    useSendResetPassEmailMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = { email: data.get("email") };

    const res = await sendResetPassEmail(actualData);
    if (res.error) {
      // console.log(res.error.data.errors.non_field_errors);
      if (res.error.data.errors.email) {
        setserverError({ email: res.error.data.errors.email });
      }
      if (res.error.data.errors.non_field_errors) {
        setserverError({
          non_field_errors: res.error.data.errors.non_field_errors,
        });
      }
    }
    if (res.data) {
      console.log(res.data.msg);
      setSuccessMSG(res.data.msg);
      setserverError({})
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
          {serverError.email ? (
            <Alert type={"error"}>{serverError.email[0]}</Alert>
          ) : (
            ""
          )}
          {serverError.non_field_errors ? (
            <Alert type={"error"}>{serverError.non_field_errors[0]}</Alert>
          ) : (
            ""
          )}
        </div>
        <button type="submit"> {isLoading ? <Loader /> : "Send Reset Password Link"}</button>

        {successMSG ? <Alert type={"success"}>{successMSG}</Alert> : ""}
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
  form {
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
  .error-container {
    margin-top: 30px;
  }
`;
