import './Login.css'
import api from "../../services/api"
import { useEffect, useState } from 'react' // useState > Criação de variavel dinamica que será atualizada durante o projeto
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Register() {
   const navigate = useNavigate();

   const [dados, setDados] = useState({
      name: "",
      email: "",
      password: ""
   });

   async function handleLogin(e) {
      e.preventDefault();

      try {
         const payload = {...dados, typeUser: "comum"};
         const {data} = await api.post('/user', payload);
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
         navigate("/login");
      } 
      catch(error) {
         alert(error)
         toast.error(error + {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   }

   useEffect(() => {
      console.log(dados)
   }, [dados])

   function handleFormChange(e) {
      const {name, value} = e.target;
      setDados({...dados, [name]: value});
   }

   return (
      <main className='main-login'>
         <div className='content-login'>
            <div className='logo-login'>
               <img className='form-image' src={'client/public/named_logo1.svg'}></img>
            </div>
            <form className='form-login' onSubmit={handleLogin}>
               <div className='campos'>
                  <div className='grupos'>
                     <TextField className='campos' placeholder='Nome completo' name='name' value={dados.name} variant="outlined" onChange={(e) => handleFormChange(e)}></TextField>
                     <TextField className='campos' placeholder='Insira o seu e-mail' name='email' value={dados.email} type="email" variant="outlined" onChange={(e) => handleFormChange(e)}></TextField>
                     <TextField className='campos' placeholder='Crie uma senha' name='password' value={dados.password} type="password" variant="outlined" onChange={(e) => handleFormChange(e)}></TextField>
                     <Button type='submit' className='campos'>Fazer Cadastro</Button>
                  </div>
               </div>
            </form>
            <span>Já possui cadastro? <a href='/login'> Faça login</a></span>
         </div>
      </main>
   )
}

export default Register;