import bg from "../assets/images/hero.jpg";
import { BsArrowRight } from "react-icons/bs";
import pic4 from "../assets/images/pic4.jpg";
import pic3 from "../assets/images/pic3.jpg";

const Hero = () => {
  return (
    <div className="container py-16 min-h-screen">
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-8">
        <div
          className=" bg-cover bg-center xl:col-span-2 p-4 md:p-12 xl:row-start-1 xl:row-end-[-1]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <p className="text-2xl hidden backdrop-blur w-fit sm:block">
            {" "}
            100% Original Apple headphones
          </p>
          <h2 className=" text-2xl sm:text-4xl md:text-6xl font-bold">
            {" "}
            High quality products!
          </h2>
          <p className=" text-gray-500 text-xl pt-4 sm:pt-8"> Starting At</p>
          <div className=" text-red-600 font-bold text-2xl sm:text-4xl pb-4 sm:bp-8">
            {" "}
            K18.39
          </div>
          <div className=" bg-accentDark hover:bg-accent text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
            Shop Now <BsArrowRight />
          </div>
        </div>
        <div className="relative">
          <img
            className=" h-full w-full object-cover rounded-lg"
            src={pic3}
            alt="hero image"
          />
        </div>
        <div className="relative">
          <img
            className=" h-full w-full object-cover rounded-lg"
            src={pic4}
            alt="hero image"
          />
          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-4">
            <h2 className=" text-xl sm:text-2xl font-bold text-blue-400">
              {" "}
              Tech world products!
            </h2>
            <p className=" text-blue-400 text-xl pt-2"> Starting At</p>
            <div className=" font-medium text-red-600 text-2xl sm:text-4xl pb-2 sm:bp-8">
              {" "}
              $18.39
            </div>
            <div className=" bg-accentDark hover:bg-accent text-white rounded-full w-fit flex items-center gap-4 px-2 py-1 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
              Shop Now <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
