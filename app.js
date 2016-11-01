define(["./todoController", "./scripts/storageService"], function(TodoController, StorageService) {
  return {
    run: function(container) {
      var storage = new StorageService(localStorage);
      new TodoController(storage).appendTo(container);
    }
  };
});
