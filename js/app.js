//Imports firebase
import {
    guardarUsuario,
    obtenerTodosUsuarios,
} from "./firebase.js";


//Elementos del Html
const registerForm = document.getElementById("register-form");
const tabla = document.getElementById("filas");
const btnBorrar = document.getElementById("btnBorrar");
const btnEditar = document.getElementById("btnEditar");

//Variables


//Crear una fila de usuario
function generarFilaTabla(datosUsuario) {
    var fila = `<tr>
                    <td>${datosUsuario.id}<td>
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
    return fila;
}



registerForm.addEventListener("click", (ev) => {
    console.log("Hola")
    ev.preventDefault();

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
    tabla.innerHTML = generarFilaTabla(datosUsuario);
});


function buscarUsuarioPorId(id) {
    estudiantes = obtenerTodosUsuarios();
    // Iterar sobre el array de objetos datosUsuario
    for (let i = 0; i < estudiantes.length; i++) {
        if (listaDatosUsuarios[i].id === id) {
            return listaDatosUsuarios[i];
        }
    }
    return null;
}

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

