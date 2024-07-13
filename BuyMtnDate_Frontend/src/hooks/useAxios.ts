import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
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