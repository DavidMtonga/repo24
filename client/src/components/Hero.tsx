import bg from "../assets/images/hero.jpg";
import bg2 from "../assets/images/bg2.jpg";
import { BsArrowRight } from "react-icons/bs";
import pic3 from "../assets/images/pic3.jpg";

const Hero = () => {
  return (
    <div className="container py-16 min-h-screen px-4 md:px-12">
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-8">
        <div
          className=" bg-cover bg-center xl:col-span-2 rounded-lg p-4 md:p-12 xl:row-start-1 xl:row-end-[-1]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <p className="text-2xl hidden backdrop-blur w-fit sm:block">
            {" "}
            100% Original Apple headphones
          </p>
          <h2 className=" text-2xl sm:text-4xl backdrop-blur w-fit md:text-6xl font-bold">
            {" "}
            High quality products!
          </h2>
          <p className=" text-gray-300 text-xl pt-4 sm:pt-8"> Starting At</p>
          <div className=" text-red-200 font-bold text-2xl sm:text-4xl pb-4 sm:bp-8">
            {" "}
            K18.39
          </div>
          <div className="text-white bg-red-700 hover:bg-black duration-300 delay-200 hover:text-red-100 rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
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
        <div className="p-4 md:p-8 rounded-lg" style={{ backgroundImage: `url(${bg2})` }}>
          <div className="">
            <h2 className=" text-xl sm:text-2xl font-bold backdrop-blur w-fit">
              {" "}
              Tech world products!
            </h2>
            <p className=" backdrop-blur w-fit text-xl pt-2"> Starting At</p>
            <div className=" text-red-200 font-bold text-2xl sm:text-4xl pb-2 sm:bp-8">
              {" "}
              K18.39
            </div>
            <div className="bg-red-700 hover:bg-black duration-300 delay-200 hover:text-red-100 text-white rounded-full w-fit flex items-center gap-4 px-2 py-1 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
              Shop Now <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
