import TodoController = require("./todoController");
import StorageService = require("./storageService");

export = {
  run(container: Element): void {
    const storage = new StorageService(localStorage);
    new TodoController(storage).appendTo(container);
  }
};
