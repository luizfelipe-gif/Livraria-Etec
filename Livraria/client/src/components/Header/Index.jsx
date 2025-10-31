import './Header.css'

function Header() {
   return (
      <header className="header">
         <div className="navbar-titulo">
            <span>Foto</span>
            <span>Etecpédia</span>
         </div>

         <div className="navbar-categorias">
            <a>Autores</a>
            <a>Editoras</a>
            <a>Livros</a>
         </div>

         <div className="navbar-usuario">
            <a>"foto usuario"</a>
            <a>"nome usuario"</a>
            <a>botaoLogout</a>
         </div>
      </header>
   )
}

export default Header;