import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai"
import { BsSearch } from "react-icons/bs"
import { IoIosMenu } from "react-icons/io"
import CartCoountBadge from "./CartCoountBadge"

const MobNavbar = () => {
  return (
       <div className=" sticky top-0 bg-white z-10">
      <div className="container p-8 lg:hidden">
        <div className="flex justify-between items-center">
            <div className=" flex items-center gap-6">
            <IoIosMenu size={30} />
            <BsSearch size={24} />
            </div>
            <h1 className=" text-4xl text-red-600">Logo</h1>

            <div className="flex gap-4 text-[30px]">
                    <AiOutlineUser />

                <div className=" relative cursor-pointer">
                    <AiOutlineShoppingCart />
                    <CartCoountBadge size=" w-[25px] h-[25px]" />
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default MobNavbar
