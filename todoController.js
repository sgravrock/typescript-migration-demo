(function() {
  "use strict";
  var template =
    '<input type="text" class="new-task-name" placeholder="new task">' +
    '<button class="add-task">Add</button>' +
    '<ol></ol>';

  function TodoController() {
    var that = this;
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

    this._tasks = TodoMvc.storageService.loadTasks();

    if (this._tasks) {
      this._tasks.forEach(function(title) {
        that._addTaskToDom(title);
      });
    }
  };

  TodoController.prototype.appendTo = function(parent) {
    parent.appendChild(this._dom);
  };

  TodoController.prototype._addClicked = function() {
    var taskName = this._newTaskField.value;
    this._addTaskToDom(taskName);
    this._tasks.push(taskName);
    TodoMvc.storageService.saveTasks(this._tasks);
    this._newTaskField.value = "";
  };

  TodoController.prototype._addTaskToDom = function(title) {
    var li = document.createElement("li");
    li.textContent = title;
    this._list.appendChild(li);
  };

  TodoMvc.TodoController = TodoController;
}());
