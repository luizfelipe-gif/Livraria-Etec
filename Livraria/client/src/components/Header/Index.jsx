import './Header.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../helpers/auth'
import api from '../../services/api';

function Header() {
   const navigate = useNavigate();

   const [userData, setUserData] = useState({
      user: '',
      email: '',
      typeUser: '',
   });

   useEffect(() => { // Revisar essa função pra obter os dados do usuário logado
      async function getUserData() {
         const loggedUser = getUser();
         setUserData(loggedUser);
   
         console.log("loggedUser", loggedUser);
         console.log("userData", userData);
      };

      getUserData();

   }, []);

   return (
      <header className="header">
         <div className="navbar-titulo categoria"  onClick={() => navigate("/home")}>
            <img src="client/public/logo.svg"></img>
            <span>WikiLivros</span>
         </div>

         <div className="navbar-categorias">
            <div onClick={() => navigate("/author")}>
               <img src="client/public/writer.svg"></img>
               <p>Autores</p>
            </div>

            <div className='divisoria'></div>

            <div onClick={() => navigate("/publishers")}>
               <img src="client/public/company.svg"></img>
               <p>Editoras</p>
            </div>

            <div className='divisoria'></div>

            <div onClick={() => navigate("/list-books")}>
               <img src="client/public/book.svg"></img>
               <p>Livros</p>
            </div>
         </div>

         <div className="navbar-usuario">
            <div onClick={() => navigate("/profile")}>
               <img src="client/public/user_profile.svg"></img>
               <p>{'nome usuario'}</p>
            </div>

            <div onClick={() => {sessionStorage.removeItem('token') || navigate("/login")}}>
               <img src="client/public/logout.svg"></img>
               <p>Sair</p>
            </div>
         </div>
      </header>
   )
}

export default Header;