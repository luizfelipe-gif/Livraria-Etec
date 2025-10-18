import { useState} from 'react' // useState > Criação de variavel dinamica que será atualizada durante o projeto
import api from "../../services/api"
import './Cadastro.css'
import { useNavigate  } from "react-router-dom"; // Importação pra fazer a navegação entre as telas

function Cadastro() {
   const navigate = useNavigate(); // Importação pra fazer a navegação entre as telas
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleLogin(e) {
      e.preventDefault();
      
      try {
         const payload = {email, password, "typeUser": "comum"};
         const {data} = await api.post('/user', payload);
         alert(err.data.response)
         navigate("/") /* Após o cadastro bem sucedito, retorna pra tela de login.*/
      } catch(err) {
         console.log(err)
         alert(err)
      }
   }

   return (
      <div>
         <div>
            <h1>Fazer cadastro</h1>
         </div>
         <form onSubmit={handleLogin}>
            <div>
               <div>
                  <label>Email: </label>
                  <input type="email" placeholder='E-mail' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
               </div>

               <div>
                  <label>Senha: </label>
                  <input type="password" placeholder='Senha' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
               </div>
            </div>
            <button>Cadastrar</button>
         </form>
         <button onClick={() => navigate("/")}>Voltar pra tela de login</button>
      </div>
   )
}

export default Cadastro;
