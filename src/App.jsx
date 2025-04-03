import React, { useState, useEffect } from "react";

import { db } from "./firebaseConfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

import "./styles.css";

import TablaDotacion from "./components/TablaDotacion";
import UAPLeadersTable from "./components/UAPLeadersTable";
import Footer from "./components/Footer";
import AbsenceTable from "./components/AbsenceTable";


const lineasProduccion = ["Línea 310", "Línea 320", "Línea 330", "Línea 340"];
const turnos = ["Mañana", "Tarde", "Noche"];

function App() {

  const [enMantenimiento, setEnMantenimiento] = useState(false);

  useEffect(() => {

    const docRef = doc(db, "config", "mantenimiento");

    const unsubscribes = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setEnMantenimiento(snapshot.data().activo);
      }
    });


    fetchFromFirebase();
    const unsubscribe = listenToUAPLeaders(setDotacionUAP);
    return () => unsubscribe(); // Detener la escucha cuando el componente se desmonta
  }, []);

  const [isLoading, setIsLoading] = useState(false)

  const [dotaciones, setDotaciones] = useState(
    lineasProduccion.reduce((acc, linea) => {
      acc[linea] = turnos.reduce((tAcc, turno) => {
        tAcc[turno] = Array(5).fill("");
        return tAcc;
      }, {});
      return acc;
    }, {})
  );

  const [dotacionUAP, setDotacionUAP] = useState(Array(4).fill(""));

  const [ausentismo, setAusentismo] = useState([]);

  const fetchFromFirebase = async () => {
    try {
      const docRef = doc(collection(db, "dotaciones"), "turnos");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDotaciones(docSnap.data().dotaciones || {});
        setAusentismo(docSnap.data().ausentismo || []);
      }

      const uapRef = doc(collection(db, "dotaciones"), "uap");
      const uapSnap = await getDoc(uapRef);

      if (uapSnap.exists()) {
        setDotacionUAP(uapSnap.data().lista || []);
      }

      setIsLoading(true)
    } catch (error) {
      console.error("Error al leer datos:", error);
    }
  };

  const leadersCollection = collection(db, "uap_lideres");
  // 📌 Escuchar cambios en los líderes de UAP en tiempo real
  const listenToUAPLeaders = (callback) => {
    return onSnapshot(leadersCollection, (snapshot) => {
      const leaders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(leaders);
    });
  };

  if (enMantenimiento) {
    return (
      <div className="mantenimiento-container">
        <h1>⚠️ Dotaciones en desarrollo ⚠️</h1>
        <p>Estamos armando los turnos. Vuelve más tarde.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {
          !isLoading && (<h7 className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </h7>)
        }
        <h1>Dotación de Producción Aero</h1>
        <TablaDotacion
          lineasProduccion={lineasProduccion}
          turnos={turnos}
          dotaciones={dotaciones}
        />
      </div>

      <div className="container">
        <AbsenceTable
          ausentismo={ausentismo}
        />
      </div>

      <div className="container">
        <UAPLeadersTable
          dotacionUAP={dotacionUAP}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;


