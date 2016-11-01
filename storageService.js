(function() {
  "use strict";

  TodoMvc.storageService = {
    loadTasks: function() {
      var tasks = [];
      var n = 0 + localStorage.getItem("ntasks");
      var i;

      for (i = 0; i < n; i++) {
        tasks.push(localStorage.getItem("task" + i + "title"));
      }

      return tasks;
    },
    saveTasks: function(tasks) {
      var i;
      localStorage.setItem("ntasks", tasks.length);

      for (i = 0; i < tasks.length; i++) {
        localStorage.setItem("task" + i + "title", tasks[i]);
      }
    }
  };
}());
