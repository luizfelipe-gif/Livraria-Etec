import { useState } from 'react' // useState > Criação de variavel dinamica que será atualizada durante o projeto
import "./Login.css"
import api from "../../services/api"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleLogin(e) {
      e.preventDefault();

      try {
         const payload = {email, password};
         const {data} = await api.post('/login', payload);
         sessionStorage.setItem("token", data.token);
         
         toast.success('Login efetuado com sucesso', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
         });
         return navigate("/home");

         } catch(error) {
            toast.error(error.response.data.response + {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
            console.log(error)
         }
      }

   return (
      <main>
         <div className='content'>
            <form onSubmit={handleLogin}>
               <div className='campos'>
                  <h1>Login</h1>
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
         <span>Não possui cadastro?</span> <a href='/register'> Fazer cadastro</a>
         </div>
      </main>
   )
}

export default Login;
