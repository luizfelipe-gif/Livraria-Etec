import { useState } from 'react' // useState > Criação de variavel dinamica que será atualizada durante o projeto
import "./Login.css"
import api from "../../services/api"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TextField, Button } from '@mui/material';

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
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
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
      <main className="main-login">
         <div className='content-login'>
            <div className='logo-login'>
               <img className='form-image' src={'client/public/named_logo1.svg'}></img>
            </div>
            <form className='form-login' onSubmit={handleLogin}>
               <div className='grupos'>
                  <TextField variant="outlined" className='campos' type="email" placeholder='Digite o e-mail' value={email} onChange={(e) => {setEmail(e.target.value)}}></TextField>
                  <TextField variant="outlined" className='campos' type="password" placeholder='Digite a senha' value={password} onChange={(e) => {setPassword(e.target.value)}}></TextField>
                  <Button type='submit' className='campos'>Entrar</Button>
               </div>
            </form>
         <span>Não possui cadastro? <a href='/register'>Fazer cadastro</a></span> 
         </div>
      </main>
   )
}

export default Login;
