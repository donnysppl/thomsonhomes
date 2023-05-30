// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './dashboard/Login';
import MasterLayout from './dashboard/MasterLayout';
import Dashboard from './dashboard/Dashboard';

import Product from './dashboard/Product/Index';
import Category from './dashboard/Category/Index';
import Pages from './dashboard/Pages/Index';
import Error from './Error';

import './App.css';
import './Responsive.css';

import Addnewcat from './dashboard/Category/Addnewcat';
import AddPage from './dashboard/Pages/AddPage';
import EditPage from './dashboard/Pages/EditPage';
import Editnewcat from './dashboard/Category/Editnewcat';
import AddNewProd from './dashboard/Product/AddNewProd';
import Demo from './Demo';
import AddProdImg from './dashboard/Product/AddProdImg';
import AddBanner from './dashboard/Banner/AddBanner';
import Banner from './dashboard/Banner/Index';
import MediaIndex from './dashboard/media/Index';
import AddMedia from './dashboard/media/AddMedia';
import EditMedia from './dashboard/media/EditMedia';
import EditBanner from './dashboard/Banner/EditBanner';
import EditProduct from './dashboard/Product/EditProduct';
import EditProdimg from './dashboard/Product/EditProdimg';
import Index from './frontend/Index';
import Home from './frontend/Home';
import FrontPages from './frontend/Pages/Index';
import FrontSinglePage from './frontend/Pages/SinglePage';
import ProductFront from './frontend/Product/Index';
import CategoryFront from './frontend/Product/Category';
import { useEffect } from 'react';
import ProductDetails from './frontend/Product/ProductDetails';
import CategoryDetails from './frontend/Product/CategoryDetails';
import AboutUs from './frontend/AboutUs';
import Contact from './frontend/Contact';
import Media from './frontend/Media';
import ContactIndex from './dashboard/Contact/Index';
import ContactFront from './dashboard/Contact/ContactFront';
import BrandStore from './frontend/brand-store/BrandStore';
import SingleBrandStore from './frontend/brand-store/SingleBrandStore';

import BrandStoreIndex from './dashboard/BrandStore/Index'
import BrandStoreAdd from './dashboard/BrandStore/AddBS'

import EditBs from './dashboard/BrandStore/EditBs';
import Common from './Common';
import { useState } from 'react';



function App() {

  const { tokenValue } = Common();
  const [auth, setauth] = useState(false);

  useEffect(() => {

    // if(window.localStorage.getItem("token") || tokenValue){
    //   setauth(true);
    // }
    // else{
    //   setauth(false);
    // }

    // const adminUrl = window.location.pathname.split( '/' );
    // if(adminUrl[1] === 'admin'){
    //   console.log(adminUrl[1] === 'admin');
    //   document.body.classList.add('dashboard');
    // }
  }, [])

  function AdminUser({ children }) {
  
      if (window.localStorage.getItem("token") || tokenValue) {
        return <>{children}</>;
      }
      else {
        return <>
          <Navigate to="/loginadmin" replace={true} />
        </>;
      }
  
  }
  

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Index />} >
          <Route path='/home' exact element={<Home />} />
          <Route path='/about-us' exact element={<AboutUs />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/media' exact element={<Media />} />

          <Route path='/pages' exact element={<FrontPages />} />
          <Route path='/pages/:slug' exact element={<FrontSinglePage />} />
          <Route path='/product' exact element={<ProductFront />} />
          <Route path='/category' exact element={<CategoryFront />} />
          <Route path='/category/:slug' exact element={<CategoryDetails />} />
          <Route path='/product/:id' exact element={<ProductDetails />} />

          {/* <Route path='/brand-store' exact element={<BrandStore />} /> */}
          <Route path='/brand-store/:slug' exact element={<SingleBrandStore />} />

          <Route
            path="/"
            element={<Navigate to="/home" />}
          />

        </Route>

        <Route path='/demo' exact element={<Demo />} />
        <Route path='/loginadmin' exact element={<Login />} />
        <Route path='/admin' exact element={<AdminUser><MasterLayout /></AdminUser>} >

          <Route path='/admin/dashboard' exact element={<AdminUser><Dashboard /></AdminUser>} />
          <Route path='/admin/product' exact element={<AdminUser><Product /></AdminUser>} />
          <Route path='/admin/product/add' exact element={<AdminUser><AddNewProd /></AdminUser>} />
          <Route path='/admin/product/add/img/:id' exact element={<AdminUser><AddProdImg /></AdminUser>} />
          <Route path='/admin/product/edit/:id' exact element={<AdminUser><EditProduct /></AdminUser>} />
          <Route path='/admin/product/edit/img/:id' exact element={<AdminUser><EditProdimg /></AdminUser>} />

          <Route path='/admin/category' exact element={<AdminUser><Category /></AdminUser>} />
          <Route path='/admin/category/add' exact element={<AdminUser><Addnewcat /></AdminUser>} />
          <Route path='/admin/category/edit/:id' exact element={<AdminUser><Editnewcat /></AdminUser>} />

          <Route path='/admin/pages' exact element={<AdminUser><Pages /></AdminUser>} />
          <Route path='/admin/pages/add' exact element={<AdminUser><AddPage /></AdminUser>} />
          <Route path='/admin/pages/edit/:id' exact element={<AdminUser><EditPage /></AdminUser>} />

          <Route path='/admin/banner' exact element={<AdminUser><Banner /></AdminUser>} />
          <Route path='/admin/banner/add' exact element={<AdminUser><AddBanner /></AdminUser>} />
          <Route path='/admin/banner/edit/:id' exact element={<AdminUser><EditBanner /></AdminUser>} />

          <Route path='/admin/media' exact element={<AdminUser><MediaIndex /></AdminUser>} />
          <Route path='/admin/media/add' exact element={<AdminUser><AddMedia /></AdminUser>} />
          <Route path='/admin/media/edit/:id' exact element={<AdminUser><EditMedia /></AdminUser>} />

          <Route path='/admin/brand-store' exact element={<AdminUser><BrandStoreIndex /></AdminUser>} />
          <Route path='/admin/brand-store/add' exact element={<AdminUser><BrandStoreAdd /></AdminUser>} />
          <Route path='/admin/brand-store/edit/:id' exact element={<AdminUser><EditBs /></AdminUser>} />


          <Route path='/admin/contact' exact element={<AdminUser><ContactIndex /></AdminUser>} />
          <Route path='/admin/contact/frontdata' exact element={<AdminUser><ContactFront /></AdminUser>} />

          {/* <Route path='/admin/seo' exact element={<SeoIndex />} />
          <Route path='/admin/seo/add' exact element={<AddSeo />} />
          <Route path='/admin/seo/edit/:id' exact element={<EditSeo />} /> */}
        </Route>

        <Route path='*' exact element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
