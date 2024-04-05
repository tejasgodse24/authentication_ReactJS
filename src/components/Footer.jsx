import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <div className="logo-container">
        <img src="logo.svg" alt="Logo" />
        <h1>Footer</h1>
      </div>
      <div className="para-container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, a! Ducimus perferendis dolor nisi quia voluptates nobis dicta alias! Reprehenderit dolorem quibusdam soluta, fugit suscipit tempora rem, maxime labore modi corrupti totam porro dignissimos fuga mollitia quod voluptate distinctio dolores minima voluptatem! Nostrum, alias. Cupiditate repellendus tempore quidem earum amet!
      </div>
      <div className="link-container">
        <NavLink className="footer-link" to='/'>Home</NavLink>
        <NavLink className="footer-link" to='/about'>About</NavLink>
        <NavLink className="footer-link" to='/contact'>Contact</NavLink>
        <NavLink className="footer-link" to='/login'>Login</NavLink>
        <NavLink className="footer-link" to='/register'>Register</NavLink>
      </div>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 5rem 0rem 1rem;
  .logo-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 150px;
    }
  }
  .para-container{
    width: 100%;
    flex: 4;
    color: gray;
    font-size: 0.95rem;
  }
  .link-container{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    .footer-link{
      text-decoration: none;
      font-size: 1rem;
    }

  }
`;
