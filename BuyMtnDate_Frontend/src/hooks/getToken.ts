export const getToken = () => {
   const token = localStorage.getItem('authToken');

   if (!token) {
      return '';
   }

   return token;
}