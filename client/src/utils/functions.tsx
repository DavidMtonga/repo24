import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

export const uploadImagesToStorage = async (images: FileList): Promise<string[]> => {
  const imageUrls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const imageRef = ref(storage, `/multi/${images[i].name}`);

    try {
      await uploadBytes(imageRef, images[i]);
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    } catch (error) {
      console.error(`Error uploading image ${images[i].name}:`, error);
    }
  }

  return imageUrls;
};
