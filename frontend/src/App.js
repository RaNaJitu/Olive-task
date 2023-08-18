import React, { useEffect } from "react";

import "./App.css";
import { useNavigate } from "react-router-dom";

let data = [];
let userDetails;
function App() {
  const navigate = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("userToken");
    userDetails = localStorage.getItem("userDetails");

    const res = await fetch("/university", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    data = await res.json();
    console.log("data====>", data);

    if (data.status === 200 || data) {
      console.log("user verify");
      navigate("/home");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);
  return (
    <>
      <div className="App">
        {/* <h1>jitendra</h1> */}
        <h6>{` WelCome  ${userDetails}`}</h6>
        <h1 style={{ textAlign: "center" }}>University Data</h1>
        <table>
          <thead>
            <tr>
              <th>University Name</th>
              <th>Fees</th>
              <th>Reviews</th>
              <th>Add to Wishlist</th>
            </tr>
          </thead>
          {console.log(data)}
          {data.map((item, index) => (
            // {console.log(index)}
            <tbody>
              <tr>
                <td>{item.universityName}</td>
                <td>{item.courseFees}</td>
                <td>{item.userReviews}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default App;
