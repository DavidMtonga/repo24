import { useState } from "react";
import { uploadImagesToStorage } from "../utils/functions";

const AddProduct = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const newImages = Array.from(selectedFiles).slice(0, 3);
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

  const handleUpload = async () => {
    if (!images || images.length === 0) {
      return alert("Please select one or more images");
    }

    try {
      const imageUrls = await uploadImagesToStorage(images);
      console.log("Image URLs:", imageUrls);
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };
  console.log(images);

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        className=" bg-red-300"
      />
      <div style={{ display: "flex", marginTop: "10px" }}>
        {imagePreviews.map((url, index) => (
          <div
            key={index}
            style={{ position: "relative", marginRight: "10px" }}
          >
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", marginBottom: "5px" }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AddProduct;
