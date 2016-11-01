define(["./todoController"], function(TodoController) {
  return {
    run: function(container) {
      new TodoController().appendTo(container);
    }
  };
});
