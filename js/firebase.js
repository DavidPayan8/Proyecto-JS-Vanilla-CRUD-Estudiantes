// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  where,
  query,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9ENXulfMEUJNFFwXbBHleCr2QN3WQtck",
  authDomain: "proyecto-crud-firebase-js.firebaseapp.com",
  projectId: "proyecto-crud-firebase-js",
  storageBucket: "proyecto-crud-firebase-js.appspot.com",
  messagingSenderId: "527928684475",
  appId: "1:527928684475:web:17fa3ff70c250914c61e9e",
  measurementId: "G-QEH8TCBZYL"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();


//Guardar usuarios
export const guardarUsuario = async (datosUsuario) => {
  try {
    const usuarioRef = doc(collection(db, "estudiantes"), datosUsuario.id);
    await setDoc(usuarioRef, datosUsuario);
    alert("Estudiante guardado")
  } catch (error) {
    console.error("No se pudo guardar por:", error);
  }
};

//Obtener todos los usuarios 
export const obtenerTodosUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

//Obtener usuario por id
export const obtenerUsuarioPorId = async (id) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "estudiantes"), where("id", "==", id)));
    if (querySnapshot.length == 0) {
      return null;
    } else {
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    console.error("Error al obtener usuario por id:", error);
    return null;
  }
};

export const actualizarUsuario = async (datosActualizados) => {
  try {
    const usuarioRef = doc(collection(db, "estudiantes"), datosActualizados.id);
    await setDoc(usuarioRef, datosActualizados);
    return obtenerTodosUsuarios();
    alert("Datos actualizados")
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
  }
};


export const eliminarUsuario = async (id) => {
  try {
    await deleteDoc(doc(collection(db, "estudiantes"),id));
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
  }
};