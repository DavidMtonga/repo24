import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../firebase/config";

const AddProduct = () => {
  const [images, setImages] = useState<FileList | null>(null);

  const uploadImages = async () => {
    if (!images) {
      return alert("Please select one ore more images");
    }
    for (let i = 0; i < images?.length; i++) {
      const imageRef = ref(storage, `/multi/${images[i].name}`);

      const result = await uploadBytes(imageRef, images[i])
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(result);
    }
  };

  console.log(images);

  return (
    <div>
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <button onClick={uploadImages}>Upload</button>
    </div>
  );
};

export default AddProduct;
