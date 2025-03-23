import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Navbar from './components/NavigationBar/Navbar'
import Login from './pages/Authetication/Login'
import Register from './pages/Authetication/Register'

function App() {


  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
      {/* Home Page */}
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      {/* User       */}


      {/* Admin */}


      {/* Admin-Pay-Sub */}


      {/* Deliver */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
