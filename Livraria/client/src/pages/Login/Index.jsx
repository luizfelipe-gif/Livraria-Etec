import { useState } from 'react'
import "./Login.css"
import api from "../../services/api"
import { useNavigate  } from "react-router-dom"; // Importação pra fazer a navegação entre as telas


function Login() {
   const navigate = useNavigate(); // Importação pra fazer a navegação entre as telas
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleLogin(e) {
      e.preventDefault();

      /* 
      A etapa abaixo é a tentativa de realizar Login. 
      Se for bem sucedido, será redirecionado pra página "/###".
      Se falhar, o erro será exibido em um alerta e no console do navegador
      */
      try { 
         const payload = {email, password};
         const {data} = await api.post('/login', payload);
         alert(data.response)
         sessionStorage.setItem("tokenJwt", data.token);
         navigate("/###") /* Nada vai acontecer, pois não existe uma página pra "/###". Aqui poderia ser indicado uma tela inicial, devidamente criada como as telas de Login e Cadastro */
      } catch(err) {
         alert(err.response)
         console.log(err.response)
      }
   }

   return (
      <div>
         <div>
            <h1>Realizar login</h1>
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
            <button>Acessar</button>
         </form>
         <button onClick={() => navigate("/cadastro")}>Fazer cadastro</button>
      </div>
   )
}

export default Login;
