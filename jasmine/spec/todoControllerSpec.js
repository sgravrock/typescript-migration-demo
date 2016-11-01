describe("TodoController", function() {
  beforeEach(function() {
    var that = this;
    this.existingTasks = [];
    spyOn(TodoMvc.storageService, "saveTasks");
    spyOn(TodoMvc.storageService, "loadTasks").and.callFake(function() {
      return that.existingTasks;
    });

    this.setup = function() {
      this.dom = document.createElement("div");
      this.subject = new TodoMvc.TodoController();
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
      var item = this.dom.querySelector("li");
      expect(item).toBeTruthy();
      expect(item.textContent).toEqual("New Task 1");
    });

    it("clears the text field", function() {
      expect(this.textField.value).toBeFalsy();
    });

    it("saves the task to local storage", function() {
      expect(TodoMvc.storageService.saveTasks).toHaveBeenCalledWith([
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
      var lis = this.dom.querySelectorAll("li");
      expect(lis.length).toEqual(2);
      expect(lis[0].textContent).toEqual("Existing Task 1");
      expect(lis[1].textContent).toEqual("Existing Task 2");
    });

    describe("When the user adds another task", function() {
      beforeEach(function() {
        this.textField.value = "Another Task";
        this.addButton.click();
      });

      it("saves all the tasks", function() {
        expect(TodoMvc.storageService.saveTasks).toHaveBeenCalledWith([
          "Existing Task 1",
          "Existing Task 2",
          "Another Task"
        ]);
      });
    });
  });
});
