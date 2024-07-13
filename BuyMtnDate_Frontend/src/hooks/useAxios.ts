import axios from "axios";

const baseUrl = "http://localhost:8000/api"
const getToken = () => {
   const token = localStorage.getItem('authToken');

   if (!token) {
      return '';
   }

   return token;
}

console.log({token: getToken()})

export const useAxios = axios.create({
   baseURL: baseUrl,
   headers: {
      Authorization: `Bearer ${getToken()}`
   }
})