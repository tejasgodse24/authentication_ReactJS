import React from "react";
import styled from "styled-components";

function Alert({ type, children }) {
  return (
    <AlertContainer>
      <p className={type}>{children}</p>
    </AlertContainer>
  );
}

export default Alert;

const AlertContainer = styled.div`
  p {
    background-color: #191919;
    font-size: 1rem;
    font-weight: 500;
  }
  .error {
    color: #ca0202;
  }
  .success {
    color: #03c203;
  }
`;
