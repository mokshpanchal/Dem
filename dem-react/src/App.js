/* eslint-disable */
import "./App.css";
import React, { createContext, Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Header from "./components/shared/Header";
import Welcome from "./components/Welcome";
import Footer from "./components/shared/Footer";
import Home from "./components/Home";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import ForgotPassword from "./components/ForgotPassword";
import ContentCreate from "./components/ContentCreate";
import ContentDetail from "./components/ContentDetail";
import Settings from "./components/Settings";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import Cart from "./components/Cart";
import ContentList from "./components/ContentList";
import Plan from "./components/Plan";
import { getAuthToken, getLocalCart } from "./helpers/local-service";
import PayPal from "./components/PayPal";

export const ThemeContext = createContext();

function App() {
  const [cart, setCart] = useState(0);

  const ProtectedRoute = ({ children }) => {
    const authToken = getAuthToken();
    if (!authToken) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  const AuthRoute = ({ children }) => {
    const authToken = getAuthToken();
    if (!authToken) {
      return children;
    }

    return <Navigate to="/" replace />;
  };
  const value = {
    cart,
    setCart,
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "justify-content",
    scrollBehavior: "auto"
  };

  useEffect(() => {
    const localCart = getLocalCart();
    setCart(localCart);
  }, []);
  return (
    <>
      <ThemeContext.Provider value={value}>
        <div className="App" style={style}>
          <BrowserRouter>
            <Fragment>
              <Header />
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <AuthRoute>
                      <Signup />
                    </AuthRoute>
                  }
                />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/forgot_password"
                  element={<ForgotPasswordEmail />}
                />
                <Route
                  path="/forgot_password/:id"
                  element={<ForgotPassword />}
                />
                {/* <Route path="/content" element={<Content />}/> */}
                <Route
                  path="/content/create"
                  element={
                    <ProtectedRoute>
                      <ContentCreate />
                    </ProtectedRoute>
                  }
                />
                <Route path="/setting" element={<Settings />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<Search />} />
                <Route path="/plan" element={<Plan />} />
                <Route
                  path="/content-list"
                  element={
                    <ProtectedRoute>
                      <ContentList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/content-detail/:id"
                  element={
                    <ProtectedRoute>
                      <ContentDetail />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout" element={<PayPal />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <ContentCreate />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </Fragment>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
