import "./Admin.css"
import api from "../../services/api"
import { useNavigate  } from "react-router-dom";
import Header from "../../components/Header/"

function Admin() {

   return (
      <>
         <head>
            <title>Admin</title>
         </head>
         <Header/>
         <main>
            <h1>Admin</h1>
         </main>
      </>
   )
}

export default Admin;