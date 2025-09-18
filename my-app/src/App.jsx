import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navs from './Navbar/Navs';
import Body from './Content/Body';
import Login from './Login/Login';
import Signup from './signup/Signup';
import Home from './Pages/Home';
import Footer from './Footer/Footer';
import Forgot from './Forgot/Forgot';
import About from './about/About';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import Profile from './Profile/Profile';
import Navbar from './Nav/Navbar';
import Seller from './Seller/Seller';
import Log from './Seller/Log';
import Sig from './Seller/Sig';
import For from './Seller/For';
import Service from './Nav/Service';
import SellerSidebar from './Seller/SellerSidebar';
import SellerAdd from './Seller/SellerAdd';
import SellerViewPage from './Seller/SellerViewPage';
import SellerOrder from './Seller/SellerOrder';
import Admin from './Admin/Admin';
import AdminSidebar from './Admin/AdminSidebar';
import Contactt from './Nav/Contactt';
import SellerProductEdit from './Seller/SellerProductEdit'
import HomeId from './Pages/HomeId';
import AddtoCart from './Nav/AddtoCart';
import BuyNow from './Nav/BuyNow';
import SellerDashboard from './Seller/SellerDashboard';
import CartFooter from './Nav/CartFooter';
import Headbar from './Navbar/Headbar';
import AdmiinProductView from './Admin/AdminProductView';
import AdminDashboard from './Admin/AdminDashboard';
import AdminSellerView from './Admin/AdminSellersView';
import AdminUsersView from './Admin/AdminUsersView';
import BuyNowDetails from './Nav/BuyNowDetails';
import BuyTotalProduct from './Nav/BuyTotalProduct';
import EditProfile from './Profile/EditProfile';
import SellerProfile from './Seller/SellerProfile';
import SellerProfileEdit from './Seller/SellerProfileEdit';
import AdminNewRegistration from './Admin/AdminNewRegistration';
import AdminNav from './Navbar/AdminNav';
import AdminViewContact from './Admin/AdminViewContact';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<><Navs /><Body /><Footer /></>} />
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/sign" element={<><Navs /><Signup /><Footer /></>} />
        <Route path="/log" element={<><Navs /><Login /><Footer /></>} />
        <Route path="/forgot" element={<><Navs /><Forgot /><Footer /></>} />
        <Route path="/about" element={<><Navs /><About /><Footer /></>} />
        <Route path="/User-about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/Seller-about" element={<><Headbar /><About /><Footer /></>} />
        <Route path='/cat' element={<><CategoryPage /></>}></Route>
        <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
        <Route path="/edit-profile/:id" element={<><Navbar /><EditProfile /><Footer /></>} />
        <Route path="/category/:name" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/Service" element={<><Navbar /><Service /><Footer /></>} />
        <Route path="/Service-seller" element={<><Headbar /><Service /><Footer /></>} />
        <Route path='/Navs' element={<><Navbar></Navbar></>}></Route>
        <Route path='phone' element={<><Navs /><Contactt></Contactt><Footer /></>}></Route>
        <Route path='phone-contact' element={<><Navbar /><Contactt></Contactt><Footer /></>}></Route>
        <Route path='phone-con' element={<><Navbar /><Contactt></Contactt><Footer /></>}></Route>


        {/* Seller Auth Pages */}
        <Route path="/Seller" element={<Seller />} />
        <Route path="/logo" element={<><Navs /><Log /><Footer /></>} />
        <Route path="/sig" element={<><Navs /><Sig /><Footer /></>} />
        <Route path="/For" element={<><Navbar /><For /><Footer /></>} />

        {/* Seller Sidebar with product management */}
        <Route path="/side" element={<>
          <Headbar></Headbar> <SellerSidebar /> <Footer /> </>} />

        {/* Add and View Products */}
        <Route path="/add" element={<><Headbar></Headbar><SellerAdd /><Footer></Footer></>} />
        <Route
          path="/view" element={<><Headbar></Headbar><SellerViewPage /></>} />
        <Route path='/order' element={<><Headbar></Headbar><SellerOrder></SellerOrder></>}></Route>
        <Route path='/Dashboard' element={<><Headbar></Headbar><SellerDashboard></SellerDashboard></>}></Route>
        <Route path='/seller-contact' element={<><Headbar></Headbar><Contactt /></>}></Route>

        <Route path='/adminlg' element={<><Navs/><Admin></Admin><Footer/></>}></Route>
        <Route path='/adside' element={<><AdminNav /><AdminSidebar></AdminSidebar><Footer></Footer></>}></Route>
        <Route path='/ProductEdit/:id' element={<><Headbar /><SellerProductEdit></SellerProductEdit><Footer /></>}></Route>
        <Route path='/ViewbyId/:id' element={<><Navbar></Navbar><HomeId></HomeId><Footer /></>}></Route>
        <Route path='/vieworder' element={<><Navbar /><AddtoCart></AddtoCart><Footer /></>}></Route>
        <Route path='/Buynow/:id' element={<><Navbar /><BuyNow></BuyNow><Footer /></>}></Route>
        <Route path='/Buynow' element={<><Navbar /><BuyTotalProduct /><Footer /></>}></Route>
        <Route path='/Cartfooter' element={<><CartFooter></CartFooter></>}></Route>
        <Route path='/header' element={<><Headbar></Headbar></>}></Route>
        <Route path='/ProductView' element={<><AdminNav /><AdmiinProductView></AdmiinProductView></>}></Route>
        <Route path='/adminDash' element={<><AdminNav /><AdminDashboard /></>}></Route>
        <Route path='/sellers' element={<><AdminNav /><AdminSellerView /></>}></Route>
        <Route path='/users' element={<><AdminNav /><AdminUsersView></AdminUsersView></>}></Route>

        <Route path='/Buydetails' element={<><Navbar /><BuyNowDetails /><Footer /></>}></Route>
        <Route path='/sellerprofile' element={<><Headbar /><SellerProfile /><Footer /></>}></Route>
        <Route path='/edit-seller/:id' element={<><Headbar /><SellerProfileEdit /><Footer /></>}></Route>
        <Route path='/newregistration' element={<><AdminNav /><AdminNewRegistration /></>}></Route>
        <Route path='/Admin-nav' element={<><AdminNav/></>}></Route>
        <Route path='/admin-view'  element={<><AdminNav/><AdminViewContact/><Footer/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


