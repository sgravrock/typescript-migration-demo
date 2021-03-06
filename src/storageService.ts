export class StorageService {
  // For the definition of Storage and other browser types, see
  // https://github.com/Microsoft/TypeScript/blob/master/src/lib/dom.generated.d.ts
  private _localStorage: Storage;

  constructor(localStorage: Storage) {
    this._localStorage = localStorage;
  }

  loadTasks(): string[] {
    let tasks: string[] = [];
    const n = +this._localStorage.getItem("ntasks");

    for (let i = 0; i < n; i++) {
      tasks.push(this._localStorage.getItem("task" + i + "title"));
    }

    return tasks;
  }

  saveTasks(tasks: string[]): void {
    this._localStorage.setItem("ntasks", "" + tasks.length);

    for (let i = 0; i < tasks.length; i++) {
      this._localStorage.setItem("task" + i + "title", tasks[i]);
    }
  }
}
