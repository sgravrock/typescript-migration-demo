define(["./scripts/todoController", "./scripts/storageService"], function(tc, ss) {
  var StorageService = ss.StorageService;
  var TodoController = tc.TodoController;
  
  return {
    run: function(container) {
      var storage = new StorageService(localStorage);
      new TodoController(storage).appendTo(container);
    }
  };
});
