import "./RegisterBook.css"
import api from "../../services/api"
import Header from "../../components/Header/"
import { useNavigate  } from "react-router-dom";

function RegisterBook() {

   return (
      <>
         <head>
            <title>RegisterBook - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <h1>RegisterBook</h1>
         </main>
      </>
   )
}

export default RegisterBook;