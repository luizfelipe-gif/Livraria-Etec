import "./Home.css"
import api from "../../services/api"
import { useNavigate  } from "react-router-dom";
import Header from "../../components/Header/"

function Home() {

   return (
      <>
         <head>
            <title>Página Inicial - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <h1>conteudo</h1>
         </main>
      </>
   )
}

export default Home;