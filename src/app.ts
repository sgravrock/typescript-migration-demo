import { StorageService } from "./storageService";
import { TodoController } from "./todoController";

export = {
  run(container: Element): void {
    const storage = new StorageService(localStorage);
    new TodoController(storage).appendTo(container);
  }
};
