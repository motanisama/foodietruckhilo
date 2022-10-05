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

const firestore = getFirestore(firebase);

export function useLocationData() {
  const [locations, setLocations] = useState(null);

  const q = query(collection(firestore, "foodtrucks"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const foodtrucks = [];

      querySnapShot.forEach((doc) => {
        foodtrucks.push(doc.data());
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
        newUpdates.push(doc.data());
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
        newUpdates.push(doc.data());
      });
      setFoodTruckData(newUpdates);
    });
    return unsubscribe;
  }, []);

  return { foodTruckData };
}
