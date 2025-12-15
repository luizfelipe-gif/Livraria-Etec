import "./ListBooks.css"
import api from "../../services/api"
import Header from "../../components/Header"
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getUser } from "../../helpers/auth";

// import { toast } from 'react-toastify';
import { IoArrowBackSharp } from "react-icons/io5";

function ListBooks() {

   return (
      <>
         <head>
            <title>ListBooks - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <div className="content">
               <div className="content-livros">
                  <div className="titulo">
                     <div className="svg" onClick={() => navigate(-1)}>
                        <IoArrowBackSharp/>
                     </div>
                     <div className="pagina">
                        <span>Livros</span>
                     </div>
                  </div>

                  <div className="profile-content">
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}

export default ListBooks;