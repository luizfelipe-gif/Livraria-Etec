import "./Profile.css"
import api from "../../services/api"
import { useEffect, useState } from "react"
import { useNavigate, Link  } from "react-router-dom";
import Header from "../../components/Header"
import { TextField } from '@mui/material'
import { Button } from 'react-bootstrap';
import SVG_Back from '../../../public/back.svg'

function Profile() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [role, setRole] = useState('');
   const [imagePreview, setImagePreview] = useState(null);
   const [profilePhoto, setProfilePhoto] = useState(null);

   useEffect(() => {
      async function getUserProfile() {
         try {
            const token = sessionStorage.getItem('token');
   
            const response = await api.get('/user/profile', {
               headers: {Authorization: `Bearer ${token}`}
            });
   
            const data = response.data;
   
            setEmail(data.users[0].email || '');
            setUsername(data.users[0].name || '');
            setPassword(data.users[0].password || '');
            setRole(data.users[0].typeUser || '');
            setProfilePhoto(data.profilePhoto.url_photo_profile);
         } catch (error) {
            console.log('error', error); // toast. error
         }
      }

      getUserProfile();
   }, [])

   function handlePhoto(e) {
      const { name, files } = e.target;

      if (name === 'image' && files && files[0]) {
         const selectedImage = files[0];
         setImagePreview(URL.createObjectURL(files[0]));
         saveImage(selectedImage);
      }
   };

   async function saveImage(selectedImage) {
      if (!selectedImage) {
         alert('Selecione uma iamgem antes de enviar.');
         return;
      }

      try {
         const token = sessionStorage.getItem('token');
         if (!token) {
            alert('Token inválido ou expirado. Faça login novamente.');
            return;
         }

         const formData = new FormData();
         formData.append('uploads', selectedImage);

         await api.post('upload', formData, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'multipart/form-data',
            },
         });

         toast.success('Imagem enviada com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
         });

      } catch (error) {
         console.log('Erro ao enviar a imagem: ', error);

         toast.error('Erro ao enviar a imagem. Tente novamente.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
         });
      }
   }

   async function handleSubmit(e) {
      e.preventDefault();

   }

   return (
      <head>
         <title>Profile</title>
      </head>,
      <>
         <Header/>
         <main className="main main-profile">
            <div className="titulo centralizar">
               <div className="grid centralizar">
                  <Link to={-1}><img className="svg" src={SVG_Back}/></Link>
                  <span>Alterar Cadastro</span>
               </div>
            </div>


            
            <form className="profile-form" onSubmit={handleSubmit}>
               <div className="profile-alterarFoto">
                  <div className="profile-image" onClick={handlePhoto}>
                     <img src={imagePreview || profilePhoto || 'client/public/user_profile.svg'} alt='Foto de Perfil' className="profile-photo"/>
                     <input type="file" name="image" accept="image/*" hidden />
                  </div>

                  <div>
                     <span>Alterar a foto</span>
                  </div>
               </div>

               <div className="profile-inputs">
                  <TextField variant="outlined" type="text" value={username} placeholder='Nome' onChange={(e) => {setUsername(e.target.value)}}/>
                  <TextField variant="outlined" type="text" value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                  <TextField variant="outlined" type="text" value={password} placeholder='Senha' onChange={(e) => {setPassword(e.target.value)}}/>
                  <Button variant="success">Alterar</Button>
               </div>
            </form>
         </main>
      </>
   );
};

export default Profile;