import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <LoaderCircle>
      <div></div>
    </LoaderCircle>
  );
}

export default Loader;

const LoaderCircle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #202020 !important;
  div {
    display: inline-block;
    height: 50px;
    width: 50px;
    border: 7px solid #191919;
    border-radius: 50%;
    border-top: 7px solid white;
    border-right: 7px solid white;
    animation: spin 0.7s linear 0s infinite normal none;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
