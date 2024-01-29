import bg2 from "../assets/images/bg2.jpg";
import pic4 from "../assets/images/pic4.jpg";

const Banner = () => {
  return (
    <div className=" container pt-16 flex items-center">
      <div className=" grid sm:grid-cols-2 gap-2 sm:gap-4">
        <div className=" overflow-hidden rounded-lg">
            <img className=" hover:scale-105 transition-transform" src={pic4} alt="banner" />
        </div>
      </div>
      <div className=" grid sm:grid-cols-2 gap-2 sm:gap-4">
        <div className=" overflow-hidden rounded-lg">
            <img className=" hover:scale-105 transition-transform" src={bg2} alt="banner" />
        </div>
      </div>
    </div>
  )
}

export default Banner;
