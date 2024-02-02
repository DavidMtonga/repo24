import { useState } from "react";
import { uploadImagesToStorage } from "../utils/functions";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../api/urls";

const AddProduct = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  //   const { isError } = useQuery(
  //     "getCategories",
  //     async () => {
  //       const res = await API_URL.get("/");
  //       return res.data;
  //     },
  //     {
  //       onSuccess(data) {
  //         console.log(data);
  //       },
  //     }
  //   );

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
      const res = await axios.post("server-url", {
        name: name,
        description: description,
        price: parseInt(price),
        stock: 1,
        categoryId: selectedCategory,
        imageUrl: imagesToUpload,
      });
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
    <div className=" grid gap-4 w-full">
      <div>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
        />
      </div>
      <div>
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
        />
      </div>
      <div>
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
        ></textarea>
      </div>

      <div>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
          className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
        />
        {imagePreviews.length > 0 && (
          <div className=" bg-inherit text-white focus:outline-none border border-gray-400 p-3 rounded">
            {imagePreviews.map((url, index) => (
              <div
                key={index}
                className="w-32 h-32 flex items-center justify-center relative"
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className=" w-full h-full object-cover relative rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className=" absolute top-0 right-0 z-10 bg-red-400 rounded-full p-2"
                >
                  <svg
                    viewBox="0 0 470 1000"
                    fill="currentColor"
                    height="1.3em"
                    width="1.3em"
                  >
                    <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AddProduct;
