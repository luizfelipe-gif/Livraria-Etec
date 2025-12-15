import "./Publishers.css"
import api from "../../services/api"
import Header from "../../components/Header"
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getUser } from "../../helpers/auth";

// import { toast } from 'react-toastify';
import { IoArrowBackSharp } from "react-icons/io5";

function Publishers() {

   return (
      <>
         <head>
            <title>Publishers - WikiLivros</title>
         </head>
         <Header/>
         <main>
            <div className="content">
               <div className="content-editoras">
                  <div className="titulo">
                     <div className="svg" onClick={() => navigate(-1)}>
                        <IoArrowBackSharp/>
                     </div>
                     <div className="pagina">
                        <span>Editoras</span>
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

export default Publishers;