import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function AxiosData() {

    const navigate = useNavigate();
    const [token, setToken] = useState()

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log('userToken', userToken);
        return userToken;
    }
    const saveToken = (token) => {
        console.log('Token===>', token);
        sessionStorage.setItem('token',JSON.stringify(token));
        // sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        navigate('/')
    }


  const http =  axios.create({
    baseUrl: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    setToken: saveToken,
    getToken,
    http
};
}

// export default AxiosData;