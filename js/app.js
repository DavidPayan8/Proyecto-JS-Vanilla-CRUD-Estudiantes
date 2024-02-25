//Imports firebase
import {
    actualizarUsuario,
    eliminarUsuario,
    guardarUsuario,
    obtenerTodosUsuarios,
    obtenerUsuarioPorId,
} from "./firebase.js";


//Elementos del Html
const crudContainer = document.getElementById("crud-container");
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
let estudiantes = [];
let idSelec = "";


//Inicio 
window.addEventListener("DOMContentLoaded", async (ev) => {

    actualizarTabla();

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
        estudiantes.push(datosUsuario);
        mostrarEstudiantes(estudiantes);
    });

    //Mostrar los estudiantes y añadir los eventos
    async function mostrarEstudiantes(estudiantes) {
        let htmlFilas = '';
        //Salen desordenados por que se inyectan en DB de manera "aleatoria"
        estudiantes.forEach(estudiante => {
            htmlFilas += generarFilaTabla(estudiante);
        });
        tabla.innerHTML = htmlFilas;

        //Este evento si estuviera fuera de aqui no podria acceder a los botones que se generan de forma dinamica.
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

        //Controla el boton de editar 
        const btnsEditar = document.querySelectorAll("#btnEditar");
        btnsEditar.forEach((btn) => {
            btn.addEventListener("click", async (ev) => {
                editarCampos(btn.value)
            });
        });

        //Controla el boton de vista
        const btnsView = document.querySelectorAll("#btnView");
        btnsView.forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                crudContainer.style.display = 'none';
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
                         <button type="button" id="btnEditar" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal"
                            value="${datosUsuario.id}">
                         <i class="fa fa-pen"></i>
                        </button>
                        <button type="button" id="btnBorrar" class="btn btn-danger" value="${datosUsuario.id}">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button type="button" id="btnView" class="btn btn-info" value="${datosUsuario.id}">
                        </i><i class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`;
    }

    //Actualiza los valores
    editForm.addEventListener("submit", async (ev) => {
        ev.preventDefault()

        const datosUsuario = {
            id: idSelec,
            nombre: editForm["nombreEdit"].value,
            ape1: editForm['ape1Edit'].value,
            ape2: editForm['ape2Edit'].value,
            telef: editForm['tlfEdit'].value,
            email: editForm['emailEdit'].value,
            desc: editForm['formControlDescripcion'].value,
        };
        await actualizarUsuario(datosUsuario);
        actualizarTabla()
    })

    //Edita los campos
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
        crudContainer.style.display = "block";
    });

    //Evento controla el filtro de busqueda.
    filtro.addEventListener("change", (ev) => {
        ev.preventDefault();
        filtrarDatos(ev.target.value);
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

    async function actualizarTabla(){
        estudiantes = await obtenerTodosUsuarios();
        mostrarEstudiantes(estudiantes);
    }

});


