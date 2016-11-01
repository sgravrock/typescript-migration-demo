import { TaskController } from "./taskController";
import { StorageService } from "./storageService";

var template =
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
    var that = this;
    var i: number;
    this._storageService = storageService;
    this._dom = document.createElement("div");
    this._dom.className = "todo-controller";
    this._dom.innerHTML = template;
    this._newTaskField = <HTMLInputElement> this._dom.querySelector(".new-task-name");
    this._list = this._dom.querySelector("ol");
    this._dom.querySelector(".add-task").addEventListener("click",
      function(event) {
        event.preventDefault();
        that._addClicked();
      });

    this._tasks = storageService.loadTasks();

    if (this._tasks) {
      for (i = 0; i < this._tasks.length; i++) {
        this._addTaskToDom(this._tasks[i], i);
      }
    }
  }

  appendTo(parent: Element): void {
    parent.appendChild(this._dom);
  }

  private _addClicked(): void {
    var taskName = this._newTaskField.value;
    this._addTaskToDom(taskName, this._tasks.length);
    this._tasks.push(taskName);
    this._storageService.saveTasks(this._tasks);
    this._newTaskField.value = "";
  }

  private _removeClicked(taskEl: Element, index: number) {
    taskEl.parentNode.removeChild(taskEl);
  }

  private _addTaskToDom(title: string, index: number) {
    var that = this;
    var taskController = new TaskController(title);
    taskController.appendTo(this._list);

    taskController.onRemove = function() {
      that._tasks.splice(index, 1);
      that._storageService.saveTasks(that._tasks);
    };
  }
}
