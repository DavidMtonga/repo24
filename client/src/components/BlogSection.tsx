import BlogCard from "./BlogCard";
import jump from "../assets/images/jump.jpg";

const data = [
    {
        img: jump,
        title:"Inovation with Technology",
        date: "Jan 29, 2024",
        Comment: 8,
    },
    {
        img: jump,
        title:"Inovation with Technology",
        date: "Jan 25, 2024",
        Comment: 1,
    },
    {
        img: jump,
        title:"Inovation with Technology",
        date: "Jan 17, 2024",
        Comment: 7,
    },
];


const BlogSection = () => {
  return (
    <div className=" container pt-16">
      <h2 className=" font-bold text-2xl">Latest Updates</h2>
      <p className=" text-gray-500">Present posts to highlight interesting moments of the blog.</p>
      {data.map((el) => (
      <BlogCard 
      key={el.date}
      img={el.img}
      title={el.title}
      date={el.date}
      comment={el.Comment}
      />
      ))}
    </div>
  )
}

export default BlogSection;
