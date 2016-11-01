(function () {
  "use strict";
  window.TodoMvc = {
    app: {
      run: function(container) {
        new TodoMvc.TodoController().appendTo(container);
      }
    }
  };
}());
