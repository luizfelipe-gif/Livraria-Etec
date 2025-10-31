import { jwtDecode } from "jwt-decode";

function getUser() {
   const token = sessionStorage.getItem("token");

   if (!token) {
      return null;
   }

   try {
      const decoded = jwtDecode(token);
      return decoded;
   } catch(err) {
      console.log(err);
      return err;
   }
}

function isAuthenticated() {
   return !!getUser();
}

export default { isAuthenticated, getUser };