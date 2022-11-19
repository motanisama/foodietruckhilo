import { async } from "@firebase/util";
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
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { firebase } from "./firebase";

const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

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
    updatedAt: new Date().toISOString(),
  });
}

export async function updateSchedule(scheduleId, data) {
  const ref = doc(firestore, "schedules", scheduleId);

  await updateDoc(ref, {
    ...data,
    updatedAt: new Date().toISOString(),
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
    lastLocationUpdate: new Date().toISOString(),
  });
}

export async function uploadPhotos(file, user) {
  const storage = getStorage();
  const storageRef = ref(storage, `${user}/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);

  return storageRef;
}

export async function getPaginatedUpdates(lastdoc) {
  const q = query(
    collection(firestore, "updates"),
    orderBy("createdAt"),
    startAfter(lastdoc || 0),
    limit(3)
  );

  const querySnapShot = await getDocs(q);

  return querySnapShot;
}

export async function deleteUpdate(id) {
  const updateRef = doc(firestore, "updates", id);

  await deleteDoc(updateRef);
}
