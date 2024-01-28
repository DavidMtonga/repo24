import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import MobNavbar from "./components/MobNavbar";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <main>
      <Navbar />
      <MobNavbar />
      <Hero />
      <CategoryCard img={""} name={""} count={""} />
    </main>
  );
};

export default App;
