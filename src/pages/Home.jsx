import React from 'react'
import { Container } from './Login'
import { useSelector } from "react-redux";

function Home() {
  const myData = useSelector((state)=> state.user)
  return (
    <Container>
      <h1>Home page</h1>
      <h1>{myData.name}</h1>
      <h1>{myData.email}</h1>
    </Container>
  )
}

export default Home
