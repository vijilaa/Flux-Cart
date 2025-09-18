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
        {/* -------------------- USER ROUTES -------------------- */}
        <Route path="/" element={<><Navs /><Body /><Footer /></>} />
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/sign" element={<><Navs /><Signup /><Footer /></>} />
        <Route path="/log" element={<><Navs /><Login /><Footer /></>} />
        <Route path="/forgot" element={<><Navs /><Forgot /><Footer /></>} />
        <Route path="/about" element={<><Navs /><About /><Footer /></>} />
        <Route path="/User-about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
        <Route path="/edit-profile/:id" element={<><Navbar /><EditProfile /><Footer /></>} />
        <Route path="/category/:name" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/cat" element={<><CategoryPage /></>} />
        <Route path="/Service" element={<><Navbar /><Service /><Footer /></>} />
        <Route path="/phone" element={<><Navs /><Contactt /><Footer /></>} />
        <Route path="/phone-contact" element={<><Navbar /><Contactt /><Footer /></>} />
        <Route path="/phone-con" element={<><Navbar /><Contactt /><Footer /></>} />
        <Route path="/Navs" element={<Navbar />} />

        {/* Product Views & Orders */}
        <Route path="/ViewbyId/:id" element={<><Navbar /><HomeId /><Footer /></>} />
        <Route path="/vieworder" element={<><Navbar /><AddtoCart /><Footer /></>} />
        <Route path="/Buynow/:id" element={<><Navbar /><BuyNow /><Footer /></>} />
        <Route path="/Buynow" element={<><Navbar /><BuyTotalProduct /><Footer /></>} />
        <Route path="/Buydetails" element={<><Navbar /><BuyNowDetails /><Footer /></>} />

        {/* Cart Footer Example */}
        <Route path="/Cartfooter" element={<CartFooter />} />


        {/* -------------------- SELLER ROUTES -------------------- */}
        {/* Seller Authentication */}
        <Route path="/logo" element={<><Navs /><Log /><Footer /></>} />
        <Route path="/sig" element={<><Navs /><Sig /><Footer /></>} />
        <Route path="/For" element={<><Navbar /><For /><Footer /></>} />
        <Route path="/Seller-about" element={<><Headbar /><About /><Footer /></>} />

        {/* Seller Dashboard & Sidebar */}
        <Route path="/Dashboard" element={<><Headbar /><SellerDashboard /></>} />
        <Route path="/side" element={<><Headbar /><SellerSidebar /><Footer /></>} />
        <Route path="/add" element={<><Headbar /><SellerAdd /><Footer /></>} />
        <Route path="/view" element={<><Headbar /><SellerViewPage /></>} />
        <Route path="/order" element={<><Headbar /><SellerOrder /></>} />
        <Route path="/ProductEdit/:id" element={<><Headbar /><SellerProductEdit /><Footer /></>} />
        <Route path="/seller-contact" element={<><Headbar /><Contactt /></>} />
        <Route path="/sellerprofile" element={<><Headbar /><SellerProfile /><Footer /></>} />
        <Route path="/edit-seller/:id" element={<><Headbar /><SellerProfileEdit /><Footer /></>} />
        <Route path="/Service-seller" element={<><Headbar /><Service /><Footer /></>} />
        <Route path="/header" element={<Headbar />} />


        {/* -------------------- ADMIN ROUTES -------------------- */}
        {/* Admin Login and Sidebar */}
        <Route path="/adminlg" element={<><Navs /><Admin /><Footer /></>} />
        <Route path="/adside" element={<><AdminNav /><AdminSidebar /><Footer /></>} />
        <Route path="/Admin-nav" element={<AdminNav />} />

        {/* Admin Dashboards & Views */}
        <Route path="/adminDash" element={<><AdminNav /><AdminDashboard /></>} />
        <Route path="/ProductView" element={<><AdminNav /><AdmiinProductView /></>} />
        <Route path="/sellers" element={<><AdminNav /><AdminSellerView /></>} />
        <Route path="/users" element={<><AdminNav /><AdminUsersView /></>} />
        <Route path="/admin-view" element={<><AdminNav /><AdminViewContact /><Footer /></>} />
        <Route path="/newregistration" element={<><AdminNav /><AdminNewRegistration /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


