import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Navbar from './components/NavigationBar/Navbar'
import Login from './pages/Authetication/Login'
import Register from './pages/Authetication/Register'
import UserProfile from './pages/UserProfilePage/UserProfile'
import Promotion from './pages/UserProfilePage/Promotion'
import Payment from './pages/UserProfilePage/Payment'
import Information from './pages/UserProfilePage/Information'
import ContactUs from './pages/Home/Contactus/Contact'

function App() {


  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
      {/* Home Page */}
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/contact' element={<ContactUs/>}/>








      {/* User       */}
      <Route path='/userprofile/:id' element={<UserProfile/>}/>
      <Route path='/promotion/:id' element={<Promotion/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/information/:id' element={<Information/>}/>



      {/* Admin */}


      {/* Admin-Pay-Sub */}


      {/* Deliver */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
