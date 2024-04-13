import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "@components/auth/Header";
import Body from "@components/auth/Body";
import authApi from "@api/auth";
import toast from "@utils/toast";
import { login } from "@app/slices/authSlice";
import { setToken } from "@utils/localstorage";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  if(isAuth) return <Navigate to="/user" state={{ from: '/' }} />;

  const responseFacebook = async (data) => {
    try {
      const { userID: socialId, name } = data;
      const { data: response } = await authApi.login({
        socialId,
        provider: "facebook",
      });
      setToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      dispatch(login(response.user));
      navigate("/user");
      return;
    } catch (error) {
      console.log("error", error);
      toast.error();
    }
  };

  const responseGoogle = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Body
        title="Log in"
        responseFacebook={responseFacebook}
        responseGoogle={responseGoogle}
      />
    </>
  );
}
