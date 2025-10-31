import './App.css'
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
// import { ToastContainer } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
   return (
      <>
         {/* <ToastContainer /> */}
      <Router>
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
         </Routes>
      </Router>
      </>
   )    
}

export default App