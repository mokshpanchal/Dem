import './App.css';
import React, {Fragment} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/SignUp';
import Header from './components/shared/Header';
import Welcome from './components/Welcome';
import Footer from './components/shared/Footer';
import Home from './components/Home';
import ForgotPasswordEmail from './components/ForgotPasswordEmail';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Header />
            <Routes>
              <Route path="/" element={<Welcome />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/forgot_password" element={<ForgotPasswordEmail />}/>
              <Route path="/forgot_password/:id" element={<ForgotPassword />}/>
            </Routes>
          <Footer/>
        </Fragment>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
