import { StorageService } from "./storageService";
import { TodoController } from "./todoController";

export function run(container: Element) {
  var storage = new StorageService(localStorage);
  new TodoController(storage).appendTo(container);
}
