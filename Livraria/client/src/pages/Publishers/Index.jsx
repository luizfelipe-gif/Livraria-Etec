import "./Publishers.css"
import api from "../../services/api"
import { useNavigate  } from "react-router-dom";
import Header from "../../components/Header/"

function Publishers() {

   return (
      <>
         <head>
            <title>ListBooks</title>
         </head>
         <Header/>
         <main>
            <h1>Publishers</h1>
         </main>
      </>
   )
}

export default Publishers;