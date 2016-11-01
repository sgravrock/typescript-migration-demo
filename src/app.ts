import { StorageService } from "./storageService";
import { TodoController } from "./todoController";

export function run(container: Element) {
  const storage = new StorageService(localStorage);
  new TodoController(storage).appendTo(container);
}
