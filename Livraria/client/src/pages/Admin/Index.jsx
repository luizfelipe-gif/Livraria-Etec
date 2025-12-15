import "./Admin.css"
import api from "../../services/api"
import Header from "../../components/Header/"
import { useNavigate  } from "react-router-dom";

function Admin() {

   return (
      <>
         <head>
            <title>Admin - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <h1>Admin</h1>
         </main>
      </>
   )
}

export default Admin;