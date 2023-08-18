import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import config from "../../config.json";
import AxiosData from "../../api/authUser";
// Importing toastify module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  config.app_name = "App Name";
  console.log(config.app_name);

  // const [errorMsg, setErrorMsg] = useEffect([]);
  const { http, setToken } = AxiosData();
  const [user, serUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handlerInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);

    serUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    const { password, email } = user;
    if (email === null || email === "") {
      toast.error("Email is required");
      return;
    }
    if (password === null || password === "") {
      toast.error("Password is required");
      return;
    }
    console.log(password, email);
    await http
      .post("/login", { password: password, email: email })
      .then((response) => {
        // Parse the JSON data from the response body
        console.log(response.data);
        console.log(response.data.userDetails.name);

        setToken(response.data.accessToken);
        console.log(response.status);
        // Check if the response status indicates success (e.g., status 200)
        if (response.status === 200) {
          localStorage.setItem("userToken", response.data.accessToken);
          localStorage.setItem("userDetails", response.data.userDetails.name);
          navigate("/home");
        }
      })
      .catch((error) => {
        // Calling toast method by passing string
        toast.error(error.response.data);
        console.error("Error:==>", error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
      <div className="wrapper">
        <div className="logo">
          <img
            // src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
            src="https://olivetech.com/wp-content/uploads/2022/04/cropped-Olive-logo-250x250-1-1.png"
            alt=""
          />
        </div>
        <form className="p-3 mt-3">
          <div className="form-field">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={user.email}
              autoComplete="off"
              onChange={handlerInput}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              autoComplete="off"
              id="pwd"
              placeholder="Password"
              value={user.password}
              onChange={handlerInput}
            />
          </div>
          <button onClick={postData} className="btn mt-3">
            Login
          </button>
        </form>
        <div className="text-center fs-6">
          {/* <Link to="/login"> Forget password?</Link> */}
          <Link to="/SignUp"> Sing Up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
