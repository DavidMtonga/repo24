import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/add-product" Component={AddProduct}/>
      </Routes>
    </>
  );
};

export default App;
