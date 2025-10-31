import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUser from './auth.js'

function ProtectedRouter({children, roles}) {
   const navigate = useNavigate();
   const user = getUser();

   useEffect(() => {
      if(!user) {
         navigate("/");
         return
      }
      
      if(roles && !roles.includes(user.typeUser)) {
         navigate("/home");
      }

   }, []);

   return children;
};

export default ProtectedRouter;