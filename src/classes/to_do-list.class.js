import { ToDo } from "./to_do.class";

export class ToDoList {

    constructor() {
        // this.tareas = [];
        this.cargarLocalStorage();
    }

    nuevoToDo(toDo) {
        this.tareas.push(toDo);
        this.guardarLocalStorage();
    }

    eliminarToDo(id) {
        this.tareas = this.tareas.filter((tarea) => tarea.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const tarea of this.tareas) {
            if (tarea.id == id) {
                tarea.completado = !tarea.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.tareas = this.tareas.filter((tarea) => !tarea.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('tareas-obj', JSON.stringify(this.tareas));
    }

    cargarLocalStorage() {
        this.tareas = (localStorage.getItem('tareas-obj')) ? JSON.parse(localStorage.getItem('tareas-obj')) : [];
        this.tareas = this.tareas.map((obj) => ToDo.fromJson(obj));
    }

}