import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyApGbBRV2VNPBICRlWNNUgoPCrjNGLE0EM",
  authDomain: "sunsetskulls-minting-dapp.firebaseapp.com",
  projectId: "sunsetskulls-minting-dapp",
  storageBucket: "sunsetskulls-minting-dapp.appspot.com",
  messagingSenderId: "381032742896",
  appId: "1:381032742896:web:9bce7cf2a1ca8a5045a735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const setUserData = (obj) => {
  return new Promise(async (rsv, rej) => {
    try {
      const result = addDoc(collection(db, "customersData"), {
        name: obj.name,
        shippingAddress: obj.shippingAddress,
        walletAddress: obj.walletAddress,
        tokenNumber: obj.tokenNumber
      });
      rsv(result);
    } catch (error) {
      rej(error);
    }
  });
}

export default setUserData;