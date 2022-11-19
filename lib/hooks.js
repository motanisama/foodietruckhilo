import { useEffect, useState } from "react";
import { firebase } from "./firebase";
import {
  query,
  onSnapshot,
  collection,
  getFirestore,
  where,
  orderBy,
  getDocs,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

export function useLocationData() {
  const [locations, setLocations] = useState(null);

  const q = query(collection(firestore, "foodtrucks"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const foodtrucks = [];

      querySnapShot.forEach((doc) => {
        foodtrucks.push({ id: doc.id, ...doc.data() });
      });
      setLocations(foodtrucks);
    });
    return unsubscribe;
  }, []);

  return { locations };
}

export function useCurrentMarker() {
  const [currentMarker, setCurrentMarker] = useState(null);

  return { currentMarker, setCurrentMarker };
}

export function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);

  return { currentLocation, setCurrentLocation };
}

export function useUpdateData(id) {
  const [updates, setUpdates] = useState(null);

  const q = query(
    collection(firestore, "updates"),
    where("foodTruck", "==", id),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newUpdates = [];

      querySnapShot.forEach((doc) => {
        newUpdates.push({ id: doc.id, ...doc.data() });
      });
      setUpdates(newUpdates);
    });
    return unsubscribe;
  }, []);

  return { updates };
}

export function useFoodtruckData(id) {
  const [foodTruckData, setFoodTruckData] = useState(null);

  const q = query(
    collection(firestore, "foodtrucks"),
    where("userId", "==", id)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newUpdates = [];

      querySnapShot.forEach((doc) => {
        newUpdates.push({ id: doc.id, ...doc.data() });
      });
      setFoodTruckData(newUpdates);
    });
    return unsubscribe;
  }, []);

  return { foodTruckData };
}

export function useSingleFoodTruck(id) {
  const [foodTruckData, setFoodTruckData] = useState(null);

  const d = doc(firestore, "foodtrucks", id);

  useEffect(() => {
    const unsubscribe = onSnapshot(d, (querySnapShot) => {
      setFoodTruckData(querySnapShot.data());
    });
    return unsubscribe;
  }, []);

  return { foodTruckData };
}

export function useSingleSchedule(id) {
  const [scheduleData, setScheduleData] = useState(null);

  const d = doc(firestore, "schedules", id);

  useEffect(() => {
    const unsubscribe = onSnapshot(d, (querySnapShot) => {
      setScheduleData(querySnapShot.data());
    });
    return unsubscribe;
  }, []);

  return { scheduleData };
}

//create hook for storage

export function useStorage(file) {
  const [fileUrl, setFileUrl] = useState("");
  const [imageList, setImageList] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const storageRef = ref(storage, file.name);

  useEffect(() => {
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setLoadingPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        console.log("success");
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url = downloadURL;
        });
      }
    );
  }, []);

  return {
    loadingPercentage,
    setFileUrl,
  };
}
