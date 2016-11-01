define(["../../todoController"], function(TodoController) {
  describe("TodoController", function() {
    beforeEach(function() {
      var that = this;
      this.existingTasks = [];
      this.storageService = {
        saveTasks: jasmine.createSpy("saveTasks"),
        loadTasks: function() {
          return that.existingTasks;
        }
      };

      this.setup = function() {
        this.dom = document.createElement("div");
        this.subject = new TodoController(this.storageService);
        this.subject.appendTo(this.dom);
        this.textField = this.dom.querySelector("input.new-task-name");
        this.addButton = this.dom.querySelector(".add-task");
      };
    });

    it("shows a text entry box", function() {
      this.setup();
      expect(this.textField).toBeTruthy();
      expect(this.textField.placeholder).toEqual("new task");
    });

    describe("When the user enters a name and clicks Add", function() {
      beforeEach(function() {
        this.setup();
        this.textField.value = "New Task 1";
        this.addButton.click();
      });

      it("shows the new task", function() {
        var item = this.dom.querySelector("li .title");
        expect(item).toBeTruthy();
        expect(item.textContent).toEqual("New Task 1");
      });

      it("clears the text field", function() {
        expect(this.textField.value).toBeFalsy();
      });

      it("saves the task to local storage", function() {
        expect(this.storageService.saveTasks).toHaveBeenCalledWith([
          "New Task 1"
        ]);
      });
    });

    describe("When there are tasks from a previous session", function() {
      beforeEach(function() {
        this.existingTasks = ["Existing Task 1", "Existing Task 2"];
        this.setup();
      });

      it("shows the existing tasks", function() {
        var titles = this.dom.querySelectorAll("li .title");
        expect(titles.length).toEqual(2);
        expect(titles[0].textContent).toEqual("Existing Task 1");
        expect(titles[1].textContent).toEqual("Existing Task 2");
      });

      describe("When the user adds another task", function() {
        beforeEach(function() {
          this.textField.value = "Another Task";
          this.addButton.click();
        });

        it("saves all the tasks", function() {
          expect(this.storageService.saveTasks).toHaveBeenCalledWith([
            "Existing Task 1",
            "Existing Task 2",
            "Another Task"
          ]);
        });
      });
    });

    describe("When the user clicks a task's Remove button", function() {
      beforeEach(function() {
        this.existingTasks = ["Existing Task 1", "Existing Task 2"];
        this.setup();
        this.dom.querySelector("li button").click();
      });

      it("removes the task from the DOM", function() {
        var titles = this.dom.querySelectorAll("li .title");
        expect(titles.length).toEqual(1);
        expect(titles[0].textContent).toEqual("Existing Task 2");
      });

      it("saves the updated task list", function() {
        expect(this.storageService.saveTasks).toHaveBeenCalledWith([
          "Existing Task 2"
        ]);
      });
    });
  });
});
