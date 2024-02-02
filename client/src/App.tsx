import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Layout from "./components/Global/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/add-product" Component={AddProduct} />
      </Routes>
    </Layout>
  );
};

export default App;
