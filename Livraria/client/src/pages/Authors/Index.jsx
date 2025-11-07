import "./Authors.css"
import api from "../../services/api"
import { useNavigate  } from "react-router-dom";
import Header from "../../components/Header/"

function Authors() {

   return (
      <>
         <head>
            <title>Authors</title>
         </head>
         <Header/>
         <main>
            <h1>Authors</h1>
         </main>
      </>
   )
}

export default Authors;