import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import API from "../../service/api";
import loginimg from "../../assets/images/loginimg.jpg";
import { DataContext } from "../../context/DataProvider";

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const Login = () => {
    const { setAccount, setIsAuthenticated } = useContext(DataContext);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
 

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    showError(false);
  }, [login]);

  const loginUser = async () => {
  try {
    console.log('login',login)
    const response = await API.userLogin(login);

    console.log("Response from API:", response); // Log the entire response for debugging

    if (response) {
      showError(""); // Clear any previous error messages

      sessionStorage.setItem("accessToken", `Bearer ${response.accessToken}`);
      sessionStorage.setItem("refreshToken", `Bearer ${response.refreshToken}`);
      sessionStorage.setItem("username", response.username);  
      setAccount({
        username: response.username,
      });
     setIsAuthenticated(true); 
      setLogin(loginInitialValues);
      navigate("/");

    } else {
      showError("Something went wrong! Please try again.");
    }
  } catch (err) {
    console.error("Login Error:", err);

    const errorMessage = err?.message || "Something went wrong! Please try again later.";
    showError(errorMessage);
  }
};


  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="auth-section">
        <div className={`container ${isActive ? "active" : ""}`}>
          <div className="user signinBx">
            <div className="imgBx">
              <img src={loginimg} alt="loginimg" />
            </div>
            <div className="formBx">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
              >
                <h2>Sign In</h2>
                <input
                  className="inputfield"
                  type="text"
                  name="username"
                  value={login.username}
                  onChange={(e) => onValueChange(e)}
                  placeholder="Username"
                />
                <input
                className="inputfield"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={(e) => onValueChange(e)}
                  placeholder="Password"
                />
                {error && <Error>{error}</Error>}
                <input className="inputfield" type="submit" value="Login" />
                <p className="signup">
                  Don't have an account ?
                  <span
                    onClick={toggleForm}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Sign Up.
                  </span>
                  {/* <a href="#" onclick="toggleForm();">Sign Up.</a> */}
                </p>
              </form>
            </div>
          </div>
          <Signup toggleForm={toggleForm} />
        </div>
      </section>
    </div>
  );
};

export default Login;
