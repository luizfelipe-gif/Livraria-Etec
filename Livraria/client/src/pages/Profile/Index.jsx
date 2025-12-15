import "./Profile.css"
import api from "../../services/api"
import Header from "../../components/Header"
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react"
import { TextField, Button  } from '@mui/material'
import { getUser } from "../../helpers/auth";
import { toast } from 'react-toastify';

import { IoArrowBackSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

function Profile() {
   const navigate = useNavigate();

   const [modoEdicao, setModoEdicao] = useState(false);

   const [imagePreview, setImagePreview] = useState(null);
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


   function handlePhoto(e) {
      const { name, files } = e.target;

      if (name === 'image' && files && files[0]) {
         const selectedImage = files[0];
         setImagePreview(URL.createObjectURL(files[0]));
         saveImage(selectedImage);
      };
   };
   

   useEffect(() => {
      async function getUserProfile() {
         try {
            const token = sessionStorage.getItem('token');
            const response = await api.get(`/user/${dados?.userId}`, {
               headers: {Authorization: `Bearer ${token}`}
            });

            console.log("resposta", response)

            const imagemURL = response?.data?.response?.url_photo_profile;

            if (imagemURL) {
               setProfilePhoto(imagemURL);
            }
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


   async function saveImage(selectedImage) {
      if (!selectedImage) {
         toast.error('Selecione uma imagem antes de enviar.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
         return;
      };

      try {
         const token = sessionStorage.getItem('token');
         if (!token) { // *** Verificar se pode pegar o erro vindo do back e exibir aqui
            toast.error('Token inválido ou expirado. Faça login novamente.', {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
            return;
         };

         const formData = new FormData();
         formData.append('uploads', selectedImage);

         await api.post('/upload', formData, {
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
         });
      } 
      catch (error) {
         console.log(error);
         toast.error('Erro ao enviar a imagem. Tente novamente.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   }



   async function handleSubmit(e) {
      e.preventDefault();

      const token = sessionStorage.getItem('token');
      if (!token) {
         toast.error('Token inválido ou expirado. Faça login novamente.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
         return;
      };

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const payload = {
         id: userId,
         name: name,
         email: email,
      };

      try {
         await api.put('/user', payload, {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         });

         toast.success('Dados atualizados com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
      catch (error) {
         console.log(error);
         toast.error('Erro ao atualizar o perfil.', {
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

   return (
      <>
         <head>
            <title>Meu perfil - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <div className="content">
               <div className="content-profile">
                  <div className="titulo">
                     <div className="svg" onClick={() => navigate(-1)}>
                        <IoArrowBackSharp/>
                     </div>
                     <div className="pagina">
                        <span>Alterar Cadastro</span>
                     </div>
                  </div>
                  
                  <form className="profile-content" onSubmit={handleSubmit}>
                     <div className="profile-inputs">
                        <div className="profile-image">
                           <div onClick={handlePhoto} className="image"> 
                              <img src={imagePreview || profilePhoto || '/client/public/user_profile.svg'} alt='Foto de Perfil' className="profile-photo" style={{ borderRadius: '50%', objectFit: 'cover' }}/>
                           </div>
                           <input type="file" name="image" accept="image/*" onClick={handlePhoto}></input>
                           <Button variant="outlined" onClick={handlePhoto}>Mudar foto</Button>
                        </div>
                        <div className="profile-form">
                           <TextField name='name' value={dados.name} label='Nome' variant="outlined" />
                           <TextField name='email' value={dados.email} label='Email' variant="outlined" />
                           <TextField disabled name='createdAt' value={new Date(dados.createdAt).toLocaleString('pt-br')} label='Data de Cadastro'variant="outlined" />
                           <Button variant="outlined" onClick={() => {setModoEdicao(!modoEdicao)}}>Alterar cadastro</Button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </main>
      </>
   );
};

export default Profile;