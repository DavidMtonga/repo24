import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CartCountBadge from "./CartCountBadge";

const Navbar = () => {
  return (
    <div className=" sticky top-0 z-10">
      <div className="flex justify-between items-center gap-12 px-4 md:px-12 py-5">
        <h1 className="text-2xl text-red-600 font-bold">Retaila</h1>
        <div className="relative w-full max-w-sm border border-gray-500 rounded-full p-3 md:flex hidden items-center">
          <input
            className="outline-none bg-inherit flex-1 "
            type="text"
            placeholder="Search product..."
          />
          <BsSearch className=" text-gray-500" size={20} />
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
  );
};

export default Navbar;
