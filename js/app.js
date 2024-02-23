//Imports firebase
import {
    actualizarUsuario,
    eliminarUsuario,
    guardarUsuario,
    obtenerTodosUsuarios,
    obtenerUsuarioPorId,
} from "./firebase.js";


//Elementos del Html
const registerForm = document.getElementById("register-form");
const editForm = document.getElementById("editForm-form");
const viewContent = document.getElementById("view-content");
const closeView = document.getElementById("closeView");
const fullNameCard = document.getElementById("fullName");
const tlfCard = document.getElementById("tlfCard");
const emailCard = document.getElementById("emailCard");
const desCard = document.getElementById("desCard");
const tabla = document.getElementById("filas");

//Variables globales.
const NUMS_PARA_ID = 100;


//Inicio 
window.addEventListener("DOMContentLoaded", async (ev) => {

    const estudiantes = await obtenerTodosUsuarios();
    mostrarEstudiantes();

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

    //Mostrar los estudiantes y añadir los eventos
    async function mostrarEstudiantes() {
        const estudiantes = await obtenerTodosUsuarios();
        let htmlFilas = '';
        //Salen desordenados por que se inyectan en DB de manera "aleatoria"
        estudiantes.forEach(estudiante => {
            htmlFilas += generarFilaTabla(estudiante);
        });
        tabla.innerHTML = htmlFilas;

        //Este evento si estuviera fuera de aqui no podria acceder a los botones que se generan de forma dinamica.
        const btnsBorrar = document.querySelectorAll("#btnBorrar");
        btnsBorrar.forEach((btn) => {
            btn.addEventListener("click", (ev) => {
                try {
                    eliminarUsuario(btn.value);
                } catch (err) {
                    console.log(err)
                }
                mostrarEstudiantes();
            });
        });

        const btnsEditar = document.querySelectorAll("#btnEditar");
        btnsEditar.forEach((btn) => {
            btn.addEventListener("click", (ev) => {
                editarCampos(btn.value)
            });
        });

        const btnsView = document.querySelectorAll("#btnView");
        btnsView.forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                verEstudiante(btn.value);
            })
        });
    }


    //Crear una fila de usuario
    function generarFilaTabla(datosUsuario) {
        return `<tr>
                    <td>${datosUsuario.id}</td>
                    <td>${datosUsuario.nombre}</td>
                    <td>${datosUsuario.ape1}</td>
                    <td>${datosUsuario.ape2}</td>
                    <td>${datosUsuario.email}</td>
                    <td>
                         <button type="submit" id="btnEditar" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal"
                            value="${datosUsuario.id}">
                         <i class="fa fa-pen"></i>
                        </button>
                        <button type="submit" id="btnBorrar" class="btn btn-danger" value="${datosUsuario.id}">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button type="submit" id="btnView" class="btn btn-info" value="${datosUsuario.id}">
                        </i><i class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`;
    }

    //Actualiza los valores
    async function editarCampos(id) {
        const estudiante = await obtenerUsuarioPorId(id);
        editForm["nombreEdit"].value = estudiante.nombre;
        editForm['ape1Edit'].value = estudiante.ape1;
        editForm['ape2Edit'].value = estudiante.ape2;
        editForm['tlfEdit'].value = estudiante.telef;
        editForm['emailEdit'].value = estudiante.email;
        editForm['formControlDescripcion'].value = estudiante.desc;

        editForm.addEventListener("submit", (ev) => {
            ev.preventDefault()

            const datosUsuario = {
                id: id,
                nombre: editForm["nombreEdit"].value,
                ape1: editForm['ape1Edit'].value,
                ape2: editForm['ape2Edit'].value,
                telef: editForm['tlfEdit'].value,
                email: editForm['emailEdit'].value,
                desc: editForm['formControlDescripcion'].value,
            };
            actualizarUsuario(datosUsuario);
            mostrarEstudiantes();
        })


    }

    //Vista de un estudiante
    async function verEstudiante(id) {
        const estudiante = await obtenerUsuarioPorId(id);

        fullNameCard.innerHTML = `${estudiante.nombre} ${estudiante.ape1} ${estudiante.ape2} `;
        tlfCard.innerHTML = `<strong>Telefono: </strong>${estudiante.telef}`
        emailCard.innerHTML = `<strong>Email: </strong>${estudiante.email}`
        desCard.innerHTML = `<strong>Detalles: </strong>${estudiante.desc}`
        viewContent.style.display = "block";
    }

    //Evento para cerrar vista de estudiante
    closeView.addEventListener("click", (ev) => {
        viewContent.style.display = "none";
    });


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
                    Math.floor(Math.random() * NUMS_PARA_ID);
            }
            return id;
        } catch (err) {
            console.log(err)
        }
    }

});


