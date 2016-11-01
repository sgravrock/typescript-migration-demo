interface IStorageService {
  loadTasks(): string[];
  saveTasks(tasks: string[]): void;
}
