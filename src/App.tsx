import React from 'react';
import './App.css';
import {RegisterPage} from "./pages/RegisterPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ChangePasswordPage} from "./pages/ChangePasswordPage";
import {Navbar} from "./components/Navbar";

function App() {
    return (
        <div>
            <Navbar/>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Navigate to='/home'/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/changePassword' element={<ChangePasswordPage/>}/>
                    <Route path='/register'
                           element={<RegisterPage/>}/>
                    <Route path='*' element={<div>404 NOT FOUND :(</div>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
