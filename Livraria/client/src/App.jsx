import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login/Index.jsx"
import Cadastro from './pages/Cadastro/Index.jsx'

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
         </Routes>
      </Router>
   )    
}

export default App