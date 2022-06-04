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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/my-account" element={<MyAccount />} />
          <Route exact path="/sale-ok" element={<SaleOK />} />
          <Route path="/:category" element={<Home />} />
          <Route path="product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
