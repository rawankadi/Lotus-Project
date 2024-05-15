import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Headers/Header';
import Footer from './Components/Footers/Footer';
import Aboutus from './Components/Aboutus/Aboutus';
import Contactus from './Components/Contactus/Contactus';
import SignIn from './Components/SignIn/SignIn';
import HomePage from './Components/Service/Service';


export default function Layout(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/AboutUs' element={<Aboutus/>}/>
                <Route path='/ContactUs' element={<Contactus/>}/>
                <Route path='/SignIn' element={<SignIn/>}/>
                <Route path='/HomePage' element={<HomePage/>}/>
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}