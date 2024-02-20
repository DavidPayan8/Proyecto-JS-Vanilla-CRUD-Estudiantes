// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
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


/*
// salvar tareas

export const saveTask = (title, description) => {
    return addDoc(collection(db, "tasks"), { title, description });
};

// Listar tareas

export const onGetTasks = (callback) => {
    return onSnapshot(collection(db, "tasks"), callback);
};

// Borrar tareas

export const deleteTask = (id) => {
    return deleteDoc(doc(db, "tasks", id));
};

// Recuperar tarea

export const getTask = (id) => {
    return getDoc(doc(db, "tasks", id));
};

// Actualizar tarea

export const updateTask = (id, newFields) => {
    return updateDoc(doc(db, "tasks", id), newFields);
}; */


//Guardar usuarios
export const guardarUsuario = async (datosUsuario) => {
    try {
        await addDoc(collection(db, "usuarios"), datosUsuario);
        console.log("Usuario guardado");
    } catch (error) {
        console.error("No se pudo guardar por:", error);
    }
};

//Obtener todos los usuarios 
export const obtenerTodosUsuarios = async (callback) => {
    try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        querySnapshot.forEach((doc) => {
            callback(doc.data());
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
};

export const obtenerUsuarioPorCorreo = async (correo) => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"), where("correo", "==", correo));
      if (querySnapshot.empty) {
        return null;
      }
      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error("Error al obtener usuario por correo:", error);
    }
  };

  export const actualizarUsuario = async (id, datosActualizados) => {
    try {
      await updateDoc(doc(db, "usuarios", id), datosActualizados);
      console.log("Usuario actualizado");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };


  export const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      console.log("Usuario eliminado");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };