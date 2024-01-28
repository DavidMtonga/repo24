interface propsType {
  img: string;
  name: string;
  count: string;
}

const CategoryCard: React.FC<propsType> = ({ img, name, count }) => {
  return (
    <div className=" border border-gray-600 rounded-lg">
      <div className="gap-12 w-full grid grid-cols-2 p-6">
        <div className=" space-y-4 capitalize">
          <h3 className=" font-medium text-xl">{name}</h3>
          <p className=" text-gray-500">{count}</p>
        </div>
        <div className=" flex items-center rounded-full overflow-hidden h-24 w-24 justify-end">
          <img
            className="w-full h-full object-center object-cover"
            src={img}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
