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
import Aboutuspage from '.././src/pages/Home/About/Aboutuspage';
import OrderManagment from '.././src/pages/Admin/AdminHome/OrderManagment';
import CustomerDeliveryManagment from '.././src/pages/Admin/AdminHome/CustomerDeliveryManagment';
import PaymentAd from '.././src/pages/Admin/AdminHome/Payment';
import RevenueManagment from '.././src/pages/Admin/AdminHome/RevenueManagment';
import AssignPerson from './pages/Admin/AdminHome/TharshanExtraPage/DeliveryAssignPage'
import DeliveryViewPage from './pages/Admin/AdminHome/TharshanExtraPage/ViewDeatilspage'
import EditAssignPerson from './pages/Admin/AdminHome/TharshanExtraPage/Editviewpage'
























































































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








      {/* User    start   */}
      <Route path='/userprofile/:id' element={<UserProfile/>}/>
      <Route path='/promotion/:id' element={<Promotion/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/information/:id' element={<Information/>}/>










      {/* user end */}
    
    














































































      {/* Tharshan start */}
      <Route path="/aboutuspage" element={<Aboutuspage />} />
      <Route path="/orderviewpage/DeliveryAssignPage" element={<AssignPerson/>}/>
      <Route path="/orderviewpage/DeliveryAssignPage/EditDeatilsPage" element={<EditAssignPerson/>}/>







      {/* Admin Dashboard start */}
      <Route path="/adminOrder" element={<OrderManagment />} />
      <Route path="/custonerdelivery" element={<CustomerDeliveryManagment />} />
      <Route path="/revenue" element={<RevenueManagment />} />
      <Route path="/paymentad" element={<PaymentAd />} />














      {/* Admin Dashboard end */}

      {/* Tharshan end */}

     </Routes>
    </BrowserRouter>
  )
}

export default App
