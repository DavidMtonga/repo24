import { useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="sticky w-full bg-[#0a0a0a] top-0 z-10">
      <div className="flex justify-between relative items-center gap-12 px-4 md:px-12 py-5 border-b border-gray-800 shadow-md">
        <Link to={"/"} className="text-2xl text-red-600 font-bold">Retaila</Link>
        <div className="relative w-full max-w-sm border border-gray-500 rounded-full p-3 md:flex hidden items-center">
          <input
            className="outline-none bg-inherit flex-1 "
            type="text"
            placeholder="Search product..."
          />
          <BsSearch className=" text-gray-500" size={20} />
        </div>

        <div className="flex gap-4 items-center">
          <Link to={"/add-product"} className="border md:p-3 p-2 rounded-full border-gray-500">
            <AiOutlineUser size={20} />
          </Link>
          <div className="border md:p-3 p-2 rounded-full border-gray-500">
            <AiOutlineShoppingCart size={20} />
          </div>
          <button className=" md:hidden block" onClick={() => setOpen(!open)}>
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`bg-[#0a0a0a] origin-top bg-opacity-95 w-full absolute md:hidden top-[100%] right-0 ${
            open ? "scale-100" : "scale-y-0"
          } duration-300 delay-150 flex flex-col justify-end py-6 px-4`}
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="relative w-full max-w-sm border border-gray-500 rounded-full p-3 flex md:hidden items-center">
            <input
              className="outline-none bg-inherit flex-1 "
              type="text"
              placeholder="Search product..."
            />
            <BsSearch className=" text-gray-500" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
