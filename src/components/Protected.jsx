import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

function Protected({ authentication, children }) {
  const { access_token } = useSelector((state) => state.auth);
  // console.log(access_token);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    if(access_token && !authentication){
      navigate('/dashboard')
    }
    if(!access_token && authentication){
      navigate('/login')
    }
  }, [access_token, authentication, navigate]);
  return <>{children}</>;
}

export default Protected;
