define(function() {
  return {
    run: function(container) {
      new TodoMvc.TodoController().appendTo(container);
    }
  };
});
