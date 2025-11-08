import './Header.css';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
   const navigate = useNavigate();

   async function deslogar() {
      sessionStorage.removeItem('token');
   }

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

         <div className="navbar-usuario" onClick={() => navigate("/profile")}>
            <div onClick={''}>
               <img src="client/public/user_profile.svg"></img>
               <p>"nome usuario"</p>
            </div>

            <div onClick={deslogar}>
               <img src="client/public/logout.svg"></img>
               <p>Sair</p>
            </div>
         </div>
      </header>
   )
}

export default Header;