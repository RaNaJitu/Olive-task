import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config.json";
import AxiosData from "../../api/authUser";
// Importing toastify module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function Home() {
  config.app_name = "App Name";
  console.log(config.app_name);

  // const [errorMsg, setErrorMsg] = useEffect([]);
  //   const { http } = AxiosData();
  //   const [user, serUser] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   let name, value;
  //   const handlerInput = (e) => {
  //     console.log(e);
  //     name = e.target.name;
  //     value = e.target.value;
  //     console.log(name, value);

  //     serUser({ ...user, [name]: value });
  //   };

  const DashboardValid = async () => {
    let token = localStorage.getItem("userToken");
    console.log("token ===>", token);

    const res = await fetch("/university", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log("data====>", data);

    // if (data.status == 401 || !data) {
    //   history("*");
    // } else {
    //   console.log("user verify");
    //   setLoginData(data);
    //   history("/dash");
    // }
  };

  useEffect(() => {
    // setTimeout(() => {
    DashboardValid();
    //   setData(true);
    // }, 2000);
  }, []);

  //   await http
  //     .get("/university")
  //     .then((response) => {
  //       // Parse the JSON data from the response body
  //       console.log(response.data);
  //       console.log(response.status);
  //     })
  //     .catch((error) => {
  //       // Calling toast method by passing string
  //       toast.error(error.response.data);
  //       console.error("Error:==>", error);
  //     });

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
      <h1>Home</h1>
    </>
  );
}

export default Home;
