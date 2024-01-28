import CategoryCard from "./CategoryCard";

const data= [
    {
        id:0,
        name: "laptops",
        count: " 9 products",
        img: "/pic2.jpg",
    },
    {
        id:1,
        name: "wireless headphones",
        count: "7 products",
        img: "/pic2.jpg",
    },
    {
        id:2,
        name: "bluetooth speakers",
        count: "10 products",
        img: "/pic2.jpg",
    },
    {
        id:3,
        name: "keyboards",
        count: "11 products",
        img: "/pic2.jpg",
    },
    {
        id:4,
        name: "gamepads",
        count: "8 products",
        img: "/pic2.jpg",
    },
    {
        id:5,
        name: "smart watch",
        count: "8 products",
        img: "/pic2.jpg",
    },
    {
        id:6,
        name: "smart glasses",
        count: "5 products",
        img: "/pic2.jpg",
    },
    {
        id:7,
        name: "mobile phones",
        count: "10 products",
        img: "/pic2.jpg",
    },
    
];


const Category = () => {
  return (
    <div className=" container pt-16">
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((el)=> ( <CategoryCard key={el.id} img={el.img} name={el.name} count={el.count} />))}
      </div>
    </div>
  )
}

export default Category
