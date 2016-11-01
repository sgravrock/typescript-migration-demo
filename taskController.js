(function() {
  "use strict";
  var template =
    '<span class="title"></span>' +
    '<button>Remove</button>';

  function TaskController(title) {
    var that = this;
    this._dom = document.createElement("li");
    this._dom.innerHTML = template;
    this._dom.querySelector(".title").textContent = title;

    this._dom.querySelector("button").addEventListener("click",
        function (e) {
          e.preventDefault();
          that.remove();
        }
    );
  };

  TaskController.prototype.appendTo = function(parent) {
    parent.appendChild(this._dom);
  };

  TaskController.prototype.remove = function() {
    this._dom.parentNode.removeChild(this._dom);
    this.onRemove();
  };

  TaskController.prototype.onRemove = function(parent) {
  };

  TodoMvc.TaskController = TaskController;
}());
