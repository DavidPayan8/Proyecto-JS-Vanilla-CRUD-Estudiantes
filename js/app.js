//Imports firebase
import {
    eliminarUsuario,
    guardarUsuario,
    obtenerTodosUsuarios,
    obtenerUsuarioPorId,
} from "./firebase.js";


//Elementos del Html
const registerForm = document.getElementById("register-form");
const tabla = document.getElementById("filas");
const btnsBorrar = Array.from(document.querySelectorAll("#btnBorrar"));//Ponerlo con clases
const btnsEditar = document.querySelectorAll("#btnEditar");

//Variables globales.
const NUMS_PARA_ID = 100;


//Inicio 
window.addEventListener("DOMContentLoaded", async (e) => {

const estudiantes = await obtenerTodosUsuarios();
mostrarEstudiantes();
console.log(btnsBorrar)

async function mostrarEstudiantes() {
    const estudiantes = await obtenerTodosUsuarios();
    let htmlFilas = '';
    //Salen desordenados por que se inyectan en DB de manera "aleatoria"
    estudiantes.forEach(estudiante => {
        htmlFilas += generarFilaTabla(estudiante);
    });
    tabla.innerHTML = htmlFilas;
}

//Funcion para generar un id unico
async function generarNuevoId() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    let id = "";
    try {
        if (estudiantes.length > 0) {
            do {
                id += letras[Math.floor(Math.random() * letras.length)] +
                    Math.floor(Math.random() * NUMS_PARA_ID);
            } while (await obtenerUsuarioPorId(id) != null);
        } else {
            id += id += letras[Math.floor(Math.random() * letras.length)] +
                Math.floor(Math.random() * NUM_GENERAR_ID);
        }
        console.log(id + " " + typeof (id));
        return id;
    } catch (err) {
        console.log(err)
    }
}


//Crear una fila de usuario
function generarFilaTabla(datosUsuario) {
    return `<tr>
                    <td>${datosUsuario.id}</td>
                    <td>${datosUsuario.nombre}</td>
                    <td>${datosUsuario.ape1}</td>
                    <td>${datosUsuario.ape2}</td>
                    <td>${datosUsuario.telef}</td>
                    <td>${datosUsuario.email}</td>
                    <td>
                        <button type="submit" id="btnEditar" class="btn btn-warning" value="${datosUsuario.id}">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="submit" id="btnBorrar" class="btn btn-danger" value="${datosUsuario.id}">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`;
}


btnsBorrar.forEach((btn) =>{   
    btn.addEventListener("click", (ev) =>{
        try{
             eliminarUsuario(btn.value);
        }catch(err){
            console.log(err)
        }
        console.log("Click al boton con id: "+ ev.target.value)
        mostrarEstudiantes();
    });
});

});

//Registro de un nuevo estudiante
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
    mostrarEstudiantes();
});

/* // variables globales
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus = false;
let id = ""; */

/* // manejador de evento principal
window.addEventListener("DOMContentLoaded", async (e) => {
    await onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML = "";
        // bucle que recorre todos los documentos del objeto querySnapshot
        querySnapshot.forEach((doc) => {
            // método .data() convierte el objeto de la DB en un objeto JS
            const task = doc.data();

            // inyectamos el código HTML de forma dinámica
            tasksContainer.innerHTML += `
                <div class="card bg-light mb-1 p-1">
                  <div class="card-header">${task.title}</div>
                  <div class="card-body">${task.description}</div>
                  <div class="card-footer">
                    <button class="btn btn-danger btn-delete" data-id="${doc.id}">Borrar</button>
                    <button class="btn btn-success btn-edit" data-id="${doc.id}">Editar</button>
                  </div>
                </div>`;
        });

        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    await deleteTask(e.target.dataset.id);
                } catch (error) {
                    console.log(error);
                }
            });
        });

        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();
                    taskForm["task-title"].value = task.title;
                    taskForm["task-description"].value = task.description;

                    editStatus = true;
                    id = doc.id;
                    taskForm["btn-task-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
});

// manejador de evento de envío del formulario
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    try {
        if (!editStatus) {
            await saveTask(title.value, description.value);
        } else {
            await updateTask(id, {
                title: title.value,
                description: description.value,
            });

            editStatus = false;
            id = "";
            taskForm["btn-task-form"].innerText = "Grabar";
        }

        taskForm.reset();
        title.focus();
    } catch (error) {
        console.log(error);
    }
}); */

