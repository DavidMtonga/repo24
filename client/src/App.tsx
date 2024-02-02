import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Layout from "./components/Global/Layout";
import Login from "./Pages/Auth/Login";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/add-product" Component={AddProduct} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Layout>
  );
};

export default App;
