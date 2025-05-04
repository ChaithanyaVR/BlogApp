import React, { useContext, useState } from "react";
import { Typography, styled } from "@mui/material";
import signupimg from "../../assets/images/signupimg.jpg";
import { useNavigate } from "react-router-dom";
import  API  from "../../service/api";
import { DataContext } from '../../context/DataProvider';

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmpassword: ""
};


const Signup = ({ toggleForm }) => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();


  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  

  const signupUser = async () => {
    if (signup.password !== signup.confirmpassword) {
    showError("Passwords do not match");
    return;
  }
        let response = await API.userSignup(signup);
        if (response) {
            showError('');
            setSignup(signupInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

  return (
    <div className="user signupBx">
      <div className="formBx">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Create an account</h2>
          <input
          className="inputfield"
            type="text"
            name="username"
            onChange={(e) => onInputChange(e)}
            placeholder="Username"
          />
          <input
          className="inputfield"
            type="email"
            name="email"
            onChange={(e) => onInputChange(e)}
            placeholder="Email Address"
          />
          <input
          className="inputfield"
            type="password"
            name="password"
            onChange={(e) => onInputChange(e)}
            placeholder="Create Password"
          />
          <input
          className="inputfield"
            type="password"
            name="confirmpassword"
            onChange={(e) => onInputChange(e)}
            placeholder="Confirm Password"
          />
          {error && <Error>{error}</Error>}
          <input className="inputfield" type="submit" onClick={() => signupUser()}/>
          <p className="signup">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Sign in.
            </span>
          </p>
        </form>
      </div>
      <div className="imgBx">
        <img src={signupimg} alt="signupimg" />
      </div>
    </div>
  );
};

export default Signup;
