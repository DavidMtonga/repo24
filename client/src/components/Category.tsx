import CategoryCard from "./CategoryCard";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";
import pic4 from "../assets/images/pic4.jpg";

const data = [
  {
    id: 0,
    name: "laptops",
    count: " 9 products",
    img: pic2,
  },
  {
    id: 1,
    name: "wireless headphones",
    count: "7 products",
    img: pic3,
  },
  {
    id: 2,
    name: "bluetooth speakers",
    count: "10 products",
    img: pic4,
  },
  {
    id: 3,
    name: "keyboards",
    count: "11 products",
    img: pic2,
  },
  {
    id: 4,
    name: "gamepads",
    count: "8 products",
    img: pic3,
  },
  {
    id: 5,
    name: "smart watch",
    count: "8 products",
    img: pic4,
  },
  {
    id: 6,
    name: "smart glasses",
    count: "5 products",
    img: pic2,
  },
  {
    id: 7,
    name: "mobile phones",
    count: "10 products",
    img: pic3,
  },
];

const Category = () => {
  return (
    <div className=" container pt-16 px-4 md:px-12">
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((el) => (
          <CategoryCard
            key={el.id}
            img={el.img}
            name={el.name}
            count={el.count}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
