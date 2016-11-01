define(["./todoController", "./storageService"], function(TodoController, storageService) {
  return {
    run: function(container) {
      new TodoController(storageService).appendTo(container);
    }
  };
});
