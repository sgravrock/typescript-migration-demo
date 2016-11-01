define(function() {
  "use strict";

  return {
    loadTasks: function() {
      var tasks = [];
      var n = 0 + this._localStorage.getItem("ntasks");
      var i;

      for (i = 0; i < n; i++) {
        tasks.push(this._localStorage.getItem("task" + i + "title"));
      }

      return tasks;
    },
    saveTasks: function(tasks) {
      var i;
      this._localStorage.setItem("ntasks", tasks.length);

      for (i = 0; i < tasks.length; i++) {
        this._localStorage.setItem("task" + i + "title", tasks[i]);
      }
    },
    _localStorage: localStorage
  };
}());
