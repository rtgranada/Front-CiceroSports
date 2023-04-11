import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user?.uid);
        const getUser = async () => {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            user.dbUser = docSnap.data();
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        };
        getUser();
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return {
    currentUser,
  };
};

export default useAuth;
