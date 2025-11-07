import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRouter from './helpers/protectedRouter'

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import RegisterBook from "./pages/RegisterBook"
import ListBooks from "./pages/ListBooks"
import Authors from "./pages/Authors"
import Publishers from "./pages/Publishers"
import NotFound from "./pages/NotFound"

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/"                  element={<Login />}/>
               <Route path="/login"             element={<Login />}/>
               <Route path="/register"          element={<Register />}/>
               <Route path="/notfound"          element={<NotFound />}/>
               <Route path="/home"              element={<ProtectedRouter> <Home />          </ProtectedRouter>}/>
               <Route path="/admin"             element={<ProtectedRouter> <Admin />         </ProtectedRouter>}/>
               <Route path="/register-books"    element={<ProtectedRouter> <RegisterBook />  </ProtectedRouter>}/>
               <Route path="/list-books"        element={<ProtectedRouter> <ListBooks />     </ProtectedRouter>}/>
               <Route path="/authors"           element={<ProtectedRouter> <Authors />       </ProtectedRouter>}/>
               <Route path="/publishers"        element={<ProtectedRouter> <Publishers />    </ProtectedRouter>}/>
            </Routes>
         </Router>
         <ToastContainer />
      </>
   )    
}

export default App