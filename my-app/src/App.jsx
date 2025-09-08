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
import AdminSettings from './Admin/AdminSettings';
import BuyNowDetails from './Nav/BuyNowDetails';
import BuyTotalProduct from './Nav/BuyTotalProduct';

// Default products to pre-fill if nothing saved in localStorage
const defaultProducts = [
  {
    id: 1,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    price: 25.99,
    category: 'Electronics',
    stock: 100,
    image: 'https://via.placeholder.com/50?text=Mouse',
  },
  {
    id: 2,
    name: 'Bluetooth Headphones',
    description: 'Noise cancelling headphones',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://via.placeholder.com/50?text=Headphones',
  },
];

function App() {
  // Load products from localStorage or use default
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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
<Route path='/cat' element={<><CategoryPage/></>}></Route>
        <Route path="/profile" element={<><Navs /><Profile /><Footer /></>} />
        <Route path="/category/:name" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/Service" element={<><Navbar /><Service /><Footer /></>} />
        <Route path='/Navs' element={<><Navbar></Navbar></>}></Route>
        <Route path='phone' element={<><Navs/><Contactt></Contactt><Footer/></>}></Route>
         <Route path='phone-contact' element={<><Navbar/><Contactt></Contactt><Footer/></>}></Route>
           <Route path='phone-con' element={<><Navbar/><Contactt></Contactt><Footer/></>}></Route>


        {/* Seller Auth Pages */}
        <Route path="/Seller" element={<Seller />} />
        <Route path="/logo" element={<><Navbar /><Log /><Footer /></>} />
        <Route path="/sig" element={<><Navbar /><Sig /><Footer /></>} />
        <Route path="/For" element={<><Navbar /><For /><Footer /></>} />

        {/* Seller Sidebar with product management */}
        <Route path="/side" element={<>
         <Headbar></Headbar> <SellerSidebar /> <Footer /> </>} />

        {/* Add and View Products */}
        <Route path="/add" element={<><Headbar></Headbar><SellerAdd /><Footer></Footer></>} />
        <Route
          path="/view" element={<><Headbar></Headbar><SellerViewPage /></>} />
        <Route path='/order' element={<><Headbar></Headbar><SellerSidebar/><SellerOrder></SellerOrder></>}></Route>
        <Route path='/Dashboard' element={<><Headbar></Headbar><SellerDashboard></SellerDashboard></>}></Route>

        <Route path='/adminlg' element={<><Admin></Admin></>}></Route>
        <Route path='/adside' element={<><Headbar/><AdminSidebar></AdminSidebar><Footer></Footer></>}></Route>
        <Route path='/ProductEdit/:id' element={<><SellerProductEdit></SellerProductEdit></>}></Route>
        <Route path='/ViewbyId/:id' element={<><Navbar></Navbar><HomeId></HomeId><Footer /></>}></Route>
        <Route path='/vieworder' element={<><Navbar /><AddtoCart></AddtoCart><Footer /></>}></Route>
        <Route path='/Buynow/:id' element={<><Navbar/><BuyNow></BuyNow><Footer/></>}></Route>
        <Route path='/Buynow' element={<><Navbar/><BuyTotalProduct/><Footer/></>}></Route>
        <Route path='/Cartfooter' element={<><CartFooter></CartFooter></>}></Route>
        <Route path='/header' element={<><Headbar></Headbar></>}></Route>
        <Route path='/ProductView' element={<><Headbar/><AdminSidebar/><AdmiinProductView></AdmiinProductView></>}></Route>
        <Route path='/adminDash' element={<><Headbar/><AdminSidebar/><AdminDashboard/></>}></Route>
        <Route path='/sellers' element={<><Headbar/><AdminSellerView/></>}></Route>
        <Route path='/users' element={<><Headbar/><AdminUsersView></AdminUsersView></>}></Route>
        <Route path='/settings' element={<><Headbar/><AdminSidebar/><AdminSettings/></>}></Route>
        <Route path='/Buydetails' element={<><Navbar/><BuyNowDetails/><Footer/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


