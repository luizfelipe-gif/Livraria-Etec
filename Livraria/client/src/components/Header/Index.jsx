import './Header.css'

function Header() {
   return (
      <header className="header">
         <div className="navbar-titulo categoria">
            <img src="client/public/logo.svg"></img>
            <span>WikiLivros</span>
         </div>

         <div className="navbar-categorias">
            <div>
               <img src="client/public/writer.svg"></img>
               <p>Autores</p>
            </div>

            <div className='divisoria'></div>

            <div>
               <img src="client/public/company.svg"></img>
               <p>Editoras</p>
            </div>

            <div className='divisoria'></div>

            <div>
               <img src="client/public/book.svg"></img>
               <p>Livros</p>
            </div>
         </div>

         <div className="navbar-usuario">
            <div>
               <img src="client/public/user_profile.svg"></img>
               <p>"nome usuario"</p>
            </div>

            <div>
               <img src="client/public/logout.svg"></img>
               <p>Sair</p>
            </div>
         </div>
      </header>
   )
}

export default Header;