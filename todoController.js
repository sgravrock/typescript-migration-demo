define(["./scripts/taskController"], function(tc) {
  "use strict";
  var TaskController = tc.TaskController;
  var template =
    '<input type="text" class="new-task-name" placeholder="new task">' +
    '<button class="add-task">Add</button>' +
    '<ol></ol>';

  function TodoController(storageService) {
    var that = this;
    var i;
    this._storageService = storageService;
    this._dom = document.createElement("div");
    this._dom.className = "todo-controller";
    this._dom.innerHTML = template;
    this._newTaskField = this._dom.querySelector(".new-task-name");
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
  };

  TodoController.prototype.appendTo = function(parent) {
    parent.appendChild(this._dom);
  };

  TodoController.prototype._addClicked = function() {
    var taskName = this._newTaskField.value;
    this._addTaskToDom(taskName, this._tasks.length);
    this._tasks.push(taskName);
    this._storageService.saveTasks(this._tasks);
    this._newTaskField.value = "";
  };

  TodoController.prototype._removeClicked = function(taskEl, index) {
    taskEl.parentNode.removeChild(taskEl);
  };

  TodoController.prototype._addTaskToDom = function(title, index) {
    var that = this;
    var taskController = new TaskController(title);
    taskController.appendTo(this._list);

    taskController.onRemove = function() {
      that._tasks.splice(index, 1);
      that._storageService.saveTasks(that._tasks);
    };
  };

  return TodoController;
});
