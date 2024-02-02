import { useState } from "react";
import { uploadImagesToStorage } from "../utils/functions";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "../api/urls";
import IconAdd from "../assets/icons/AddIcon";
import CloseIcon from "../assets/icons/CloseIcon";
import { ICategory } from "../types/interface";
import Cookies from "js-cookie";

const AddProduct = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const token = Cookies.get("token");

  const { isLoading } = useQuery(
    "getCategories",
    async () => {
      const res = await API_URL.get("/category/all", {
        headers: {
          "auth-token": `${token}`,
        },
      });
      return res.data;
    },
    {
      onSuccess(data) {
        setCategories(data);
      },
    }
  );

  const handleUpload = async () => {
    if (!images || images.length === 0) {
      return alert("Please select one or more images");
    }

    try {
      const imageUrls = await uploadImagesToStorage(images);
      mutate(imageUrls);
      console.log("Image URLs:", imageUrls);
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };

  const { mutate } = useMutation(
    "addProducts",
    async (imagesToUpload: string[]) => {
      const res = await API_URL.post(
        "/product/add",
        {
          name: name,
          description: description,
          price: parseInt(price),
          stock: 1,
          categoryId: parseInt(selectedCategory),
          imageUrl: imagesToUpload,
        },
        {
          headers: {
            "auth-token": `${token}`,
          },
        }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const newImages = Array.from(selectedFiles).slice(0, 3);
      if (newImages.length + (images ? images.length : 0) > 3) {
        alert("You can only upload up to 3 images");
        return;
      }
      const existingImages = images ? Array.from(images) : [];
      const combinedImages = [...existingImages, ...newImages];

      const dataTransfer = new DataTransfer();
      combinedImages.forEach((file) => dataTransfer.items.add(file));

      const newFileList = dataTransfer.files;
      setImages(newFileList);

      const newImagePreviews = combinedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(newImagePreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images && images.length > index) {
      const updatedImages = Array.from(images);
      updatedImages.splice(index, 1);

      const dataTransfer = new DataTransfer();
      updatedImages.forEach((file) => dataTransfer.items.add(file));

      const newFileList = dataTransfer.files;
      setImages(newFileList);

      const updatedImagePreviews = updatedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(updatedImagePreviews);
    }
  };

  return (
    <section className=" min-h-screen py-12 px-4 md:px-12 flex flex-col w-full items-center justify-center">
      <h1 className=" mb-5 font-bold text-3xl">Add Products</h1>
      <main className=" flex flex-col gap-4  items-center justify-center w-full md:max-w-md lg:max-w-lg">
        <div className=" w-full">
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
          />
        </div>
        <div className=" w-full">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className=" bg-inherit text-white w-full capitalize appearance-none focus:outline-none border border-gray-400 p-3 rounded"
          >
            <option className=" bg-black accent-inherit">
              Select Category
            </option>
            {isLoading ? (
              <option className=" bg-black accent-inherit">Loading...</option>
            ) : (
              <>
                {categories.map((c) => (
                  <option
                    key={c.id}
                    className=" bg-black accent-inherit border-none appearance-none"
                    value={c.id}
                  >
                    {c.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className=" w-full">
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
          />
        </div>
        <div className=" w-full">
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
          ></textarea>
        </div>

        <div className=" w-full">
          <input
            type="file"
            multiple
            title="Upload"
            onChange={handleImageChange}
            accept="image/*"
            className=" bg-inherit text-white w-full hover:file:opacity-80 file:bg-white file:p-3 file:rounded file:border-none focus:outline-none border border-gray-400 p-3 rounded"
          />
          {imagePreviews.length > 0 && (
            <div className=" bg-inherit text-white focus:outline-none border-t-0 border-dashed border grid md:grid-cols-3 grid-cols-1 gap-3 border-gray-400 p-3 rounded">
              {imagePreviews.map((url, index) => (
                <div
                  key={index}
                  className="w-full md:h-32 h-40 flex items-center justify-center relative"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className=" w-full h-full object-cover relative rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className=" absolute top-0 right-0 z-10 bg-red-500 rounded p-1"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleUpload}
          className="bg-white text-black flex items-center gap-2 p-3 rounded-md w-full justify-center"
        >
          <span>Upload</span>
          <IconAdd />
        </button>
      </main>
    </section>
  );
};

export default AddProduct;
