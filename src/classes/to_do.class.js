export class ToDo {

    static fromJson({ nombre, id, completado, creado }) {
        const tempTarea = new ToDo(nombre);
        this.id = id;
        this.completado = completado;
        this.creado = creado;
        return tempTarea;
    }

    constructor(tarea) {
        this.nombre = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

}