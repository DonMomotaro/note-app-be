import { firebaseConfig } from "@/config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

initializeApp(firebaseConfig);

const storage = getStorage();

export const firebaseStorage = {
  async uploadFile(file: any) {
    const storageRef = ref(storage, `files/${file.originalname}`);
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    return await getDownloadURL(snapshot.ref);
  },
};
