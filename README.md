## CRUD con Firebase para Estudiantes

Este repositorio contiene un código JavaScript para realizar operaciones básicas de CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Firebase Firestore para gestionar los datos que en este caso seran registros de estudiantes.

### Configuración

- Configura tu proyecto de Firebase en la consola de Firebase.
- Reemplaza el objeto de configuración de Firebase en `firebaseConfig` con tus propias credenciales.
```javascript
 const firebaseConfig = {
  apiKey: "xxxxxxxxxxx",
  authDomain: "proyecto-crud-firebase-js.firebaseapp.com",
  projectId: "proyecto-crud-firebase-js",
  storageBucket: "proyecto-crud-firebase-js.appspot.com",
  messagingSenderId: "xxxxxxxxxx",
  appId: "xxxxxxxxxxxxx",
  measurementId: "xxxxxxxx"
};
Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
```
### Funciones de firebase necesarias
```javascript
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
```

##Funcionalidades: 

- Registro de nuevos estudiantes.
  ```javascript
  registerForm.addEventListener("submit", async (ev) => {
        ev.preventDefault();

        let id = await generarNuevoId();
        let nombre = registerForm["nombre"].value;
        let ape1 = registerForm["apellido1"].value;
        let ape2 = registerForm["apellido2"].value;
        let telef = registerForm["telefono"].value;
        let email = registerForm["email"].value;
        let desc = registerForm["descripcion"].value;

        const datosUsuario = {
            id: id,
            nombre: nombre,
            ape1: ape1,
            ape2: ape2,
            telef: telef,
            email: email,
            desc: desc,
        };

        guardarUsuario(datosUsuario);
        estudiantes.push(datosUsuario);
        mostrarEstudiantes(estudiantes);
    });
  ```
- Edición de datos de estudiantes existentes. Mediante un controlador de eventos, para cambiar los datos.
  ```javascript
  //Controla el boton de editar 
        const btnsEditar = document.querySelectorAll("#btnEditar");
        btnsEditar.forEach((btn) => {
            btn.addEventListener("click", async (ev) => {
                editarCampos(btn.value)
            });
        });
      async function editarCampos(id) {
        const estudiante = await obtenerUsuarioPorId(id);

        idSelec = id;
        editForm["nombreEdit"].value = estudiante.nombre;
        editForm['ape1Edit'].value = estudiante.ape1;
        editForm['ape2Edit'].value = estudiante.ape2;
        editForm['tlfEdit'].value = estudiante.telef;
        editForm['emailEdit'].value = estudiante.email;
        editForm['formControlDescripcion'].value = estudiante.desc;
    }
  ```
- Eliminación de estudiantes, pasandole el id del estudiante.
  ```javascript
          const btnsBorrar = document.querySelectorAll("#btnBorrar");
        btnsBorrar.forEach((btn) => {
            btn.addEventListener("click", async (ev) => {
                try {
                    eliminarUsuario(btn.value);
                } catch (err) {
                    console.log(err)
                }
                actualizarTabla();
            });
        });
  ```
- Opcion de ordenar la tabla por filtros.
```javascript
      async function filtrarDatos(filtro) {
        if (filtro != "-") {
            const auxArray = await obtenerTodosUsuarios();
            auxArray.sort((a, b) => {
                if (a[filtro] > b[filtro]) {
                    return 1;
                }
                if (a[filtro] < b[filtro]) {
                    return -1;
                }
                return 0;
            })
            estudiantes = auxArray;
            mostrarEstudiantes(estudiantes)
        }
    }
```


