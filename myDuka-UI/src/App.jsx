import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {

  const { currentUser } = useSelector(state => state.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    console.log("Cart: ", cart);
  }, [currentUser, cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/products' element={<ProductList />} />
        <Route path="/products/:category" element={currentUser ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={currentUser ? <Product /> : <Navigate to="/login" />} />
        <Route path="/cart" element={currentUser ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/success" element={currentUser ? <Success /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;