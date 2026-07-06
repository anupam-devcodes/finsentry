import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;


//Notes-----
// config = {

//     method:"GET",

//     url:"/profile",

//     baseURL:"http://localhost:5000/api",

//     headers:{
//         "Content-Type":"application/json"
//          Authorization: "Bearer abc123xyz"--> this gets added here if token is present in localStorage
//     }

// }
//---------

// axiosInstance = {

//     get(){...},

//     post(){...},

//     put(){...},

//     delete(){...},

//     interceptors: {

//         request: {
//             use(){...}
//         },

//         response: {
//             use(){...}
//         }

//     }

// }