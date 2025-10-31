import { useState, useNavigate } from 'react' // useState > Criação de variavel dinamica que será atualizada durante o projeto
import api from "../../services/api"
import './Cadastro.css'

function Cadastro() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleLogin(e) {
   e.preventDefault();
   
   try {
      const payload = {email, password};
      const {data} = await api.post('/login', payload);
      alert(data.response)
      navigate("/cadastro");
      // sessionStorage.setItem("tokenJwt", data.token);

   } catch(err) {
      alert(err.response.data.response)
   }
   }

   return (
      <content>
         <div className='content'>
            <h1>dshfbdkfjd</h1>
            <form onSubmit={handleLogin}>
               <div className='campos'>
                  <h1>Cadastro</h1>
                  <div className='grupos'>
                     <label className='campos'>Email:</label>
                     <input className='campos' type="email" placeholder='E-mail' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                  </div>
                  <div className='grupos'>
                     <label className='campos'>Senha:</label>
                     <input className='campos' type="password" placeholder='Senha' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                  </div>
                  <div className='grupos'>
                     <button className='campos'>Fazer Login  </button>
                  </div>
               </div>
            </form>
         <span>Já possui cadastro?  </span> <a href='/login'> Faça login</a>

         </div>
      </content>
   )
}

export default Cadastro;
