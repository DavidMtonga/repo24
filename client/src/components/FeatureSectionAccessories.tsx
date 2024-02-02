import banner1 from "../assets/images/banner1.jpg";
import airpro from "../assets/images/airpro.webp";
import hplaptop from "../assets/images/hplaptop.jpg";
import ss23 from "../assets/images/ss23.jpg";
import jbl from "../assets/images/jbl.webp";
import ProductCard from "./ProductCard";


const data =[
    { id: 0, img: airpro, name: "Airpods pro", price: "k250"},
    { id: 1, img: hplaptop, name: "Hp laptop", price: "k5500"},
    { id: 2, img: ss23, name: "Samsung s24", price: "k3800"},
    { id: 3, img: jbl, name: "JBL speaker", price: "k500"},
]

const FeatureSectionAccessories = () => {
  return (
    <div className=" container pt-16">
      <div className=" lg:flex justify-between items-center">
        <div>
            <h3 className=" font-medium text-2xl"> Gadgets and Accessories</h3>
            <p className=" text-gray-600 mt-2">Buy quality tech at affordable prices online</p>
        </div>
        <div className=" space-x-4 mt-8 lg:mt-0">
            <button className=" feature_btn">Accessories</button>
            <button className=" text-gray-600 hover:text-accent">Gadgets</button>
            <button className=" text-gray-600 hover:text-accent">Things</button>
        </div>
      </div>
      <div className=" grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
            <img className=" w-full h-full object-cover" src={banner1} alt="banner" />
        </div>
        {data.map((el) => (
            <ProductCard
            key={el.id}
            img={el.img}
            name={el.name}
            price={el.price}
            />
        ))}
      </div>
    </div>
  )
}

export default FeatureSectionAccessories;
