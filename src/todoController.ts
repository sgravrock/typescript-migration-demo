import { StorageService } from "./storageService";
import { TaskController } from "./taskController";

const template =
  '<input type="text" class="new-task-name" placeholder="new task">' +
  '<button class="add-task">Add</button>' +
  '<ol></ol>';

export class TodoController {
  private _storageService: StorageService;
  private _dom: Element;
  private _newTaskField: HTMLInputElement;
  private _list: Element;
  private _tasks: string[];

  constructor(storageService: StorageService) {
    this._storageService = storageService;
    this._dom = document.createElement("div");
    this._dom.className = "todo-controller";
    this._dom.innerHTML = template;
    this._newTaskField = <HTMLInputElement> this._dom.querySelector(".new-task-name");
    this._list = this._dom.querySelector("ol");
    this._dom.querySelector(".add-task").addEventListener("click", (e: Event) => {
      event.preventDefault();
      this._addClicked();
    });

    this._tasks = storageService.loadTasks();

    if (this._tasks) {
      for (let i = 0; i < this._tasks.length; i++) {
        this._addTaskToDom(this._tasks[i], i);
      }
    }
  }

  appendTo(parent: Element): void {
    parent.appendChild(this._dom);
  }

  private _addClicked(): void {
    const taskName = this._newTaskField.value;
    this._addTaskToDom(taskName, this._tasks.length);
    this._tasks.push(taskName);
    this._storageService.saveTasks(this._tasks);
    this._newTaskField.value = "";
  }

  private _addTaskToDom(title: string, index: number) {
    let taskController = new TaskController(title);
    taskController.appendTo(this._list);

    taskController.onRemove = () => {
      this._tasks.splice(index, 1);
      this._storageService.saveTasks(this._tasks);
    };
  }
}
