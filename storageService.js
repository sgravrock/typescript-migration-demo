define(function() {
  "use strict";

  function StorageService(localStorage) {
    this._localStorage = localStorage;
  };

  StorageService.prototype.loadTasks = function() {
    var tasks = [];
    var n = 0 + this._localStorage.getItem("ntasks");
    var i;

    for (i = 0; i < n; i++) {
      tasks.push(this._localStorage.getItem("task" + i + "title"));
    }

    return tasks;
  };

  StorageService.prototype.saveTasks = function(tasks) {
    var i;
    this._localStorage.setItem("ntasks", tasks.length);

    for (i = 0; i < tasks.length; i++) {
      this._localStorage.setItem("task" + i + "title", tasks[i]);
    }
  };

  return StorageService;
});
