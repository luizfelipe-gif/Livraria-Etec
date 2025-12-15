import "./Home.css"
import api from "../../services/api"
import Header from "../../components/Header/"
import { useNavigate  } from "react-router-dom";

function Home() {

   return (
      <>
         <head>
            <title>Página Inicial - WikiLivros</title>
         </head>
         <Header/>
         <main className="main main-home">
            <h1>(Carrossel de livros)</h1>
         </main>
      </>
   )
}

export default Home;