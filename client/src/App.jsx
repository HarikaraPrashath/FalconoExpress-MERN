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

// Shangave start

import Delivery from './pages/Home/Delivery/Delivery'
import Overview from './pages/DeliverySection/Overview'
import ProductPage from './pages/DeliverySection/ProductPage'
import HistoryPage from './pages/DeliverySection/HistoryPage'
//Shangave end



function App() {


  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
      {/* Home Page */}
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='/login' element={<Login/>}/> */}
      <Route path='/register' element={<Register/>}/>
      <Route path='/contact' element={<ContactUs/>}/>


      {/* User    start   */}
      <Route path='/userprofile/:id' element={<UserProfile/>}/>
      <Route path='/promotion/:id' element={<Promotion/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/information/:id' element={<Information/>}/>

      {/* user end */}

      {/* shangave start */}
      <Route path='/delivery' element={<Delivery/>}/>
      <Route path="/over" element={<Overview />} />
      <Route path="/crud" element={<ProductPage />} />
      <Route path="/history" element={<HistoryPage />} />










































     </Routes>
    </BrowserRouter>
  )
}

export default App
