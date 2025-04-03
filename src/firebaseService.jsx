import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const absenceCollection = collection(db, "ausentismo");
const leadersCollection = collection(db, "uap_lideres");


// 📌 Obtener ausentismo desde Firestore
export const getAbsences = async () => {
  try {
    const querySnapshot = await getDocs(absenceCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo ausencias:", error);
  }
};


// 📌 Obtener líderes de UAP desde Firestore
export const getUAPLeaders = async () => {
  try {
    const querySnapshot = await getDocs(leadersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo líderes de UAP:", error);
  }
};

// 📌 Escuchar cambios en los líderes de UAP en tiempo real
export const listenToUAPLeaders = (callback) => {
  return onSnapshot(leadersCollection, (snapshot) => {
    const leaders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(leaders);
  });
};