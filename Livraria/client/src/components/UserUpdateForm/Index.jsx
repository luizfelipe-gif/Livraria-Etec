import { useState } from "react"
import api from "../../services/api";

export default function UserUpdateForm() {
   const [imagePreview, setImagePreview] = useState(null);

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

   return (
      <>
         <form onSubmit={''}>
            <input>Nome</input>
            <input>Senha</input>
            <input>Tipo de usuário</input>
            <button>Alterar</button>
         </form>
      </>
   );
};