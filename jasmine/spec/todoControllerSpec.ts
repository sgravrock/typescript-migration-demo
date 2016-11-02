/// <reference path="../../typings/index.d.ts" />
import { TodoController } from "../../src/todoController";

describe("TodoController", () => {
  beforeEach(() => {
    this.existingTasks = [];
    this.storageService = {
      saveTasks: jasmine.createSpy("saveTasks"),
      loadTasks: () => {
        return this.existingTasks;
      }
    };

    this.setup = () => {
      this.dom = document.createElement("div");
      this.subject = new TodoController(this.storageService);
      this.subject.appendTo(this.dom);
      this.textField = this.dom.querySelector("input.new-task-name");
      this.addButton = this.dom.querySelector(".add-task");
    };
  });

  it("shows a text entry box", () => {
    this.setup();
    expect(this.textField).toBeTruthy();
    expect(this.textField.placeholder).toEqual("new task");
  });

  describe("When the user enters a name and clicks Add", () => {
    beforeEach(() => {
      this.setup();
      this.textField.value = "New Task 1";
      this.addButton.click();
    });

    it("shows the new task", () => {
      const item = this.dom.querySelector("li .title");
      expect(item).toBeTruthy();
      expect(item.textContent).toEqual("New Task 1");
    });

    it("clears the text field", () => {
      expect(this.textField.value).toBeFalsy();
    });

    it("saves the task to local storage", () => {
      expect(this.storageService.saveTasks).toHaveBeenCalledWith([
        "New Task 1"
      ]);
    });
  });

  describe("When there are tasks from a previous session", () => {
    beforeEach(() => {
      this.existingTasks = ["Existing Task 1", "Existing Task 2"];
      this.setup();
    });

    it("shows the existing tasks", () => {
      const titles = this.dom.querySelectorAll("li .title");
      expect(titles.length).toEqual(2);
      expect(titles[0].textContent).toEqual("Existing Task 1");
      expect(titles[1].textContent).toEqual("Existing Task 2");
    });

    describe("When the user adds another task", () => {
      beforeEach(() => {
        this.textField.value = "Another Task";
        this.addButton.click();
      });

      it("saves all the tasks", () => {
        expect(this.storageService.saveTasks).toHaveBeenCalledWith([
          "Existing Task 1",
          "Existing Task 2",
          "Another Task"
        ]);
      });
    });
  });

  describe("When the user clicks a task's Remove button", () => {
    beforeEach(() => {
      this.existingTasks = ["Existing Task 1", "Existing Task 2"];
      this.setup();
      this.dom.querySelector("li button").click();
    });

    it("removes the task from the DOM", () => {
      const titles = this.dom.querySelectorAll("li .title");
      expect(titles.length).toEqual(1);
      expect(titles[0].textContent).toEqual("Existing Task 2");
    });

    it("saves the updated task list", () => {
      expect(this.storageService.saveTasks).toHaveBeenCalledWith([
        "Existing Task 2"
      ]);
    });
  });
});