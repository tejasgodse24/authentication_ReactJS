import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  max-width: 1380px;
  margin: 0 auto;
  align-items: center;
  padding-top: 20px;
  div {
   
    width: 100%;
  }
`;
