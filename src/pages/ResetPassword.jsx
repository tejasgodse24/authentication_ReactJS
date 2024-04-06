import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { useResetUserPasswordMutation } from "../services/userAuthApi";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [serverError, setserverError] = useState({});
  const [successMSG, setSuccessMSG] = useState();

  const [resetUserPassword, { isLoading }] = useResetUserPasswordMutation();
  const { id, token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let actualData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };

    const res = await resetUserPassword({ actualData, id, token });

    if (res.error) {
      console.log(res.error.data.errors);
      setserverError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      setSuccessMSG(res.data.msg)
      setserverError({})
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
            {serverError.password ? (
              <Alert type={"error"}>{serverError.password[0]}</Alert>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
            />
            {serverError.password2 ? (
              <Alert type={"error"}>{serverError.password2[0]}</Alert>
            ) : (
              ""
            )}
          </div>

          <button type="">Reset Password</button>
          <div className="error-container">
            {serverError.non_field_errors ? (
              <Alert type={"error"}>{serverError.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}

            {successMSG ? <Alert type={"success"}>{successMSG}</Alert> : ""}
          </div>
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

export default ResetPassword;
