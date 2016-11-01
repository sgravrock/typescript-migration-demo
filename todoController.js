(function() {
  "use strict";
  function TodoController() {
    this._dom = document.createElement("div");
    this._dom.className = "todo-controller";
    this._dom.textContent = "Hello, world!";
  };

  TodoController.prototype.appendTo = function(parent) {
    parent.appendChild(this._dom);
  };

  TodoMvc.TodoController = TodoController;
}());
