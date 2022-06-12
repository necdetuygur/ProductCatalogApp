import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import MyAccount from "./components/MyAccount";
import SaleOK from "./components/SaleOK";

function App() {
  return (
    <>
      <Header />
      <div className="container content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/sale-ok" element={<SaleOK />} />
          <Route path="/:category" element={<Home />} />
          <Route path="product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
