define(["./todoController", "./scripts/storageService"], function(TodoController, ss) {
  var StorageService = ss.StorageService;
  return {
    run: function(container) {
      var storage = new StorageService(localStorage);
      new TodoController(storage).appendTo(container);
    }
  };
});
