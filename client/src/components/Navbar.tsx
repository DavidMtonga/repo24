import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CartCountBadge from "./CartCountBadge";

const Navbar = () => {
  return (
    <div className=" sticky top-0 z-10">
      <div className="hidden lg:block px-4 md:px-12">
        <div className="flex justify-between items-center gap-12">
          <h1 className=" text-4xl text-red-600 font-medium">Logo</h1>
          <div className=" relative w-full">
            <input
              className="outline-none border-gray-500 px-6 py-3 bg-inherit border rounded-[30px] w-full"
              type="text"
              placeholder="Search product..."
            />
            <BsSearch
              className=" absolute top-0 right-0 mt-4 mr-5 text-gray-500"
              size={20}
            />
          </div>

          <div className="flex gap-4">
            <div className="icon__wrapper">
              <AiOutlineUser />
            </div>
            <div className="icon__wrapper relative">
              <AiOutlineShoppingCart />
              <CartCountBadge size=" w-[25px] h-[25px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
