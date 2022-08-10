import './styles.css';

import { ToDo, ToDoList } from './classes'
import { crearToDoHtml } from './js/componentes';

export const tareaList = new ToDoList();

// tareaList.tareas.forEach(tarea => crearToDoHtml(tarea));
tareaList.tareas.forEach(crearToDoHtml);

console.log(tareaList.tareas);
