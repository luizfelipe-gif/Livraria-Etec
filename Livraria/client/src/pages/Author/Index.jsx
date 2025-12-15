import "./Author.css"
import api from "../../services/api"
import Header from "../../components/Header"
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getUser } from "../../helpers/auth";

// import { toast } from 'react-toastify';
import { IoArrowBackSharp } from "react-icons/io5";

function Author() {
   const navigate = useNavigate();

   const [authors, setAuthors] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      async function getAuthor() {
         try {
            const response = await api.get('/author')
            setAuthors(response.data.response || []);
         } catch (error) {
            setError(`Erro ao carregar os dados de autor: ${error}`);
         } finally {
            setLoading(false);
         }
      }

      getAuthor();
   }, []);

   if (loading) return <h1>Carregando..</h1>
   if (error) return <h1>{error}</h1>

   return (
      <>
         <head>
            <title>Author - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <div className="content">
               <div className="content-author">
                  <div className="titulo">
                     <div className="svg" onClick={() => navigate(-1)}>
                        <IoArrowBackSharp/>
                     </div>
                     <div className="pagina">
                        <span>Autores</span>
                     </div>
                  </div>

                  <div className="profile-content">
                     <table>
                        <thead>
                           <tr>
                              <th>Id</th>
                              <th>Autor</th>
                              <th>Nascionalidade</th>
                              <th>Data de Nascimento</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              authors.map((author) => (
                                 <tr>
                                    <td>{author.id}</td>
                                    <td>{author.name}</td>
                                    <td>{author.nationality}</td>
                                    <td>{new Date(author.birthday).toLocaleDateString('pt-BR')}</td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}

export default Author;