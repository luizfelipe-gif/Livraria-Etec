import "./UserUpdate.css"
import api from "../../services/api"
import { useEffect, useState } from "react"
import { useNavigate  } from "react-router-dom";
import Header from "../../components/Header/Index"
import { TextField } from '@mui/material'
import { Button } from 'react-bootstrap';

function UserUpdate() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [role, setRole] = useState('');
   const [imagePreview, setImagePreview] = useState(null);
   const [profilePhoto, setProfilePhoto] = useState(null);

   useEffect(() => {
      async function getUserProfile() {
         const token = sessionStorage.getItem('token');

         const {data} = await api.get('/user/profile', {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         setEmail(data.users.email || '');
         setPassword(data.users.email || '');
         setUsername(data.users.email || '');
         setRole(data.users.email || '');
         setProfilePhoto(data.profilePhoto.url_photo_profile);
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
         <title>UserUpdate</title>
      </head>,
      <>
         <Header/>
         <main className="main main-userUpdate">
            <h1>Alterar Cadastro</h1>
            <form className="userUpdate-form" onSubmit={handleSubmit}>
               <div className="userUpdate-alterarFoto">
                  <div className="userUpdate-image" onClick={handlePhoto}>
                     <img src={imagePreview || profilePhoto || 'client/public/user_profile.svg'} alt='Foto de Perfil' className="profile-photo"/>
                     <input type="file" name="image" accept="image/*" hidden />
                  </div>

                  <div>
                     <span>Alterar a foto</span>
                  </div>
               </div>

               <div className="userUpdate-inputs">
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

export default UserUpdate;