import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebase } from "./firebase";

const firestore = getFirestore(firebase);

export async function createUser(uid, data) {
  const userRef = doc(firestore, "users", uid);

  try {
    return await setDoc(userRef, { ...data }, { merge: true });
  } catch (error) {
    console.log(error);
  }
}

export async function createUpdate(data) {
  const commentRef = collection(firestore, "updates");
  try {
    const docRef = await addDoc(commentRef, data);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(id) {
  const docRef = doc(firestore, "users", id);
  const snapshot = await getDoc(docRef);
  const user = { id: snapshot.id, ...snapshot.data() };
  return { user };
}

export async function getUsers() {
  const users = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    users.push({ id: doc.id, ...doc.data() });
  });

  return { users };
}

export async function getTrucks() {
  const trucks = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    trucks.push({ id: doc.id, ...doc.data() });
  });

  return { trucks };
}

export async function getTruck(truckId) {
  const docRef = doc(firestore, "foodtrucks", truckId);
  const snapshot = await getDoc(docRef);
  const truck = { id: snapshot.id, ...snapshot.data() };
  return { truck };
}

export async function updateTruck(truckId, data) {
  const ref = doc(firestore, "foodtrucks", truckId);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function updateLocation(truckId) {
  const ref = doc(firestore, "foodtrucks", truckId);

  const { truck } = await getTruck(truckId);

  const lat = truck.geo.lat + 0.0001;
  const lng = truck.geo.lng;

  await updateDoc(ref, {
    geo: {
      lat: lat,
      lng: lng,
    },
    updatedAt: serverTimestamp(),
  });
}
