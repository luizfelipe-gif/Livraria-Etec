import './Header.css';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../helpers/auth'

function Header() {
   const navigate = useNavigate();

   const [usuario, setUsuario] = useState(null);
   const [profilePhoto, setProfilePhoto] = useState(null);

   const [dados, setDados] = useState({
      userId: '',
      name: '',
      email: '',
      createdAt: ''
   });

   useEffect(() => {
      const response = getUser();
      setDados({userId: response.userId, name: response.user, email: response.email, createdAt: response.createdAt});
   }, []);

   useEffect(() => {
      function getUserData() {
         const usuario = getUser();
         setUsuario(usuario);
      };
      getUserData();
   }, []);


   function handleLogout() {
      sessionStorage.removeItem('token');
      navigate('/login');
   };

   // function homeNavigate() {
   //    if (!usuario) return handleLogout();
   //    navigate(`${usuario.typeUser}/home`);
   // };


   useEffect(() => {
      async function getUserProfile() {
         try {
            const token = sessionStorage.getItem('token');
            const response = await api.get(`/user/${dados?.userId}`, {
               headers: {Authorization: `Bearer ${token}`}
            });

            console.log("resposta", response);

            const imagemURL = response?.data?.response?.url_photo_profile;

            if (imagemURL) {
               setProfilePhoto(imagemURL);
            };
         }
         catch (error) {
            console.log(error);
            toast.error(error, {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
         };
      };
      getUserProfile();
   }, [dados.userId]);

   
   return (
      <header className="header">
         <Link to="/home" className="header-titulo">
            <img src="client/public/logo.svg"></img>
            <span>WikiLivros</span>
         </Link>

         <div className="header-categorias" href="asfs">
            <Link to="/author">
               <img src="client/public/writer.svg"></img>
               <p>Autores</p>
            </Link>

            <div className='divisoria'></div>

            <Link to="/publishers">
               <img src="client/public/company.svg"></img>
               <p>Editoras</p>
            </Link>

            <div className='divisoria'></div>

            <Link to="/list-books">
               <img src="client/public/book.svg"></img>
               <p>Livros</p>
            </Link>
         </div>

         <div className="header-usuario">
            <Link to="/profile" className='userImage'>
               <img src={profilePhoto || '/client/public/user_profile.svg'} alt='Foto de Perfil' className="profile-photo"/>
               <p className='usuario'>{usuario?.user}</p>
            </Link>

            <div onClick={() => handleLogout()}>
               <img src="client/public/logout.svg"></img>
               <p>Sair</p>
            </div>
         </div>
      </header>
   )
}

export default Header;