/// <reference path="storageService.d.ts" />

class StorageService implements IStorageService {
  // For the definition of Storage and other browser types, see
  // https://github.com/Microsoft/TypeScript/blob/master/src/lib/dom.generated.d.ts
  private localStorage: Storage;
  constructor(localStorage: Storage) {
    this.localStorage = localStorage;
  }

  loadTasks(): string[] {
    const tasks: string[] = [];
    const n = +this.localStorage.getItem("ntasks");

    for (let i = 0; i < n; i++) {
      tasks.push(this.localStorage.getItem("task" + i + "title"));
    }

    return tasks;
  }

  saveTasks(tasks: string[]): void {
    this.localStorage.setItem("ntasks", "" + tasks.length);

    for (let i = 0; i < tasks.length; i++) {
      this.localStorage.setItem("task" + i + "title", tasks[i]);
    }
  }
}

export = StorageService;
