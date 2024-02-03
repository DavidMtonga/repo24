import Banner from "./components/Banner";
import Category from "./components/Category";
import FeatureSectionAccessories from "./components/FeatureSectionAccessories";
import FeatureSectionTech from "./components/FeatureSectionTech";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Category/>
      <FeatureSectionTech />
      <FeatureSectionAccessories />
      <Banner />
    </main>
  );
};

export default App;
