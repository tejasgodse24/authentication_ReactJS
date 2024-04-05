import React from "react";
import styled from "styled-components";

function Alert({ status, msg, type }) {
  return (
    <AlertContainer>
      <p className={type}>{msg}</p>
    </AlertContainer>
  );
}

export default Alert;

const AlertContainer = styled.div`
  p {
    background-color: #191919;
    font-size: 1.1rem;
    font-weight: 500;
  }
  .error {
    color: #ca0202;
  }
  .success {
    color: #03c203;
  }
`;
