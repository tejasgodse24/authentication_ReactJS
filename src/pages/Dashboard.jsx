import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { unsetUserToken } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { getToken, removeToken } from "../services/localStorageServicec";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../services/userAuthApi";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetUserDataQuery(access_token);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unsetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({ name: data.name, email: data.email });
      dispatch(setUserInfo({ name: data.name, email: data.email }));
    }
  }, [data, isSuccess]);

  // useEffect(()=>{
  //   dispatch(setUserInfo({name: }))
  // })
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Name : {userData.name}</h1>
      <h1>Email : {userData.email}</h1>
      <ButtonBox>
        <NavLink to='/change-password'><button>Chnage Password</button></NavLink>
        
        <button onClick={handleLogout}>LogOut</button>
      </ButtonBox>
    </div>
  );
}

export default Dashboard;

const ButtonBox = styled.div`

  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    margin-left: 10px;
  }
  button:hover {
    background-color: #3c3c3c;
  }
`;
