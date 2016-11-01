import TaskController = require("./taskController");

const template =
  '<input type="text" class="new-task-name" placeholder="new task">' +
  '<button class="add-task">Add</button>' +
  '<ol></ol>';

class TodoController {
  private storageService: IStorageService;
  private dom: Element;
  private newTaskField: HTMLInputElement;
  private list: Element;
  private tasks: string[];

  constructor(storageService: IStorageService) {
    this.storageService = storageService;
    this.dom = document.createElement("div");
    this.dom.className = "todo-controller";
    this.dom.innerHTML = template;
    this.newTaskField = <HTMLInputElement> this.dom.querySelector(".new-task-name");
    this.list = this.dom.querySelector("ol");
    const btn = <HTMLButtonElement> this.dom.querySelector(".add-task");
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      this._addClicked();
    });

    this.tasks = storageService.loadTasks();

    if (this.tasks) {
      for (let i = 0; i < this.tasks.length; i++) {
        this._addTaskToDom(this.tasks[i], i);
      }
    }
  }

  appendTo(parent: Element): void {
    parent.appendChild(this.dom);
  }

  private _addClicked(): void {
    const taskName = this.newTaskField.value;
    this._addTaskToDom(taskName, this.tasks.length);
    this.tasks.push(taskName);
    this.storageService.saveTasks(this.tasks);
    this.newTaskField.value = "";
  }

  private _addTaskToDom(title: string, index: number) {
    const taskController = new TaskController(title);
    taskController.appendTo(this.list);

    taskController.onRemove = () => {
      this.tasks.splice(index, 1);
      this.storageService.saveTasks(this.tasks);
    };
  }
}

export = TodoController;
