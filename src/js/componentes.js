// Referencias al HTML

import { ToDo } from "../classes";
import { tareaList } from "../index";

const divToDoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearToDoHtml = (tarea) => {

    const htmlToDo = `
    <li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(tarea.completado) ? 'checked' : ''} />
            <label>${tarea.nombre}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template" />
    </li>`

    const div = document.createElement("div");
    div.innerHTML = htmlToDo;
    divToDoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevaTarea = new ToDo(txtInput.value);
        tareaList.nuevoToDo(nuevaTarea);
        console.log(tareaList);
        crearToDoHtml(nuevaTarea);
        txtInput.value = "";
    }

});

divToDoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // input, label, button
    const tareaElemento = event.target.parentElement.parentElement;
    const tareaId = tareaElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // click en el check
        tareaList.marcarCompletado(tareaId);
        tareaElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        tareaList.eliminarToDo(tareaId);
        divToDoList.removeChild(tareaElemento);
    }

});

btnBorrar.addEventListener('click', () => {

    tareaList.eliminarCompletados();
    for (let i = divToDoList.children.length - 1; i >= 0; i--) {
        const elemento = divToDoList.children[i];
        if (elemento.classList.contains('completed')) {
            divToDoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) { return };

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divToDoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});
