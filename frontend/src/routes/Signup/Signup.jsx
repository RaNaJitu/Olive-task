import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config.json";
import AxiosData from "../../api/authUser";
// Importing toastify module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  console.log(config.app_name);
  const [user, serUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;
  const { http } = AxiosData();
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
    const { name, password, email } = user;
    if (name === null || name === "") {
      toast.error("name is required");
      return;
    }
    if (email == null || email == "") {
      toast.error("Email is required");
      return;
    }
    if (password === null || password === "") {
      toast.error("Password is required");
      return;
    }

    await http
      .post("/SignUp", { password: password, email: email, name: name })
      .then((response) => {
        // Parse the JSON data from the response body
        console.log(response);

        console.log(response.data);
        console.log(response.status);
        // Check if the response status indicates success (e.g., status 200)
        if (response.status === 200) {
          navigate("/login");
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
      <div className="wrapper singup-section">
        <div className="logo">
          <img
            src="https://olivetech.com/wp-content/uploads/2022/04/cropped-Olive-logo-250x250-1-1.png"
            alt=""
          />
        </div>
        <form method="POST" className="p-3 mt-3">
          <div className="row">
            <div className="form-field d-flex align-items-center col-md-6 mb-4">
              <span className="far fa-user"></span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="off"
                value={user.name}
                onChange={handlerInput}
              />
            </div>
            <div className="form-field d-flex align-items-center col-md-6 mb-4">
              <span className="far fa-user"></span>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Email"
                value={user.email}
                onChange={handlerInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-field d-flex align-items-center col-md-6 mb-4">
              <span className="far fa-user"></span>
              <input
                type="password"
                name="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={handlerInput}
              />
            </div>
          </div>

          <button onClick={postData} className="btn mt-3">
            SigUp
          </button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
