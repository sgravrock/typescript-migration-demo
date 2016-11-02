/// <reference path="../../typings/index.d.ts" />
import { StorageService } from "../../src/storageService";

describe("storageService", () => {
  "use strict";

  beforeEach(() => {
    this.items = {};
    const localStorage = {
      getItem: jasmine.createSpy("getItem"),
      setItem: jasmine.createSpy("setItem"),

      // Unused
      clear: jasmine.createSpy("clear"),
      key: jasmine.createSpy("key"),
      length: 0,
      removeItem: jasmine.createSpy("removeItem"),
    };

    localStorage.getItem.and.callFake((k: string) => {
      if (this.items.hasOwnProperty(k)) {
        return this.items[k];
      }

      return null;
    });

    localStorage.setItem.and.callFake((k: string, v: any) => {
      this.items[k] = v.toString();
    });

    this.subject = new StorageService(localStorage);
  });

  describe("loadTasks", () => {
    describe("when there is no task data", () => {
      it("returns an empty list", () => {
        expect(this.subject.loadTasks()).toEqual([]);
      });
    });

    describe("When there is task data", () => {
      beforeEach(() => {
        this.subject.saveTasks([
          "Task 0",
          "Task 1"
        ]);
      });

      it("returns the tasks", () => {
        expect(this.subject.loadTasks()).toEqual([
          "Task 0",
          "Task 1"
        ]);
      });
    });
  });

  describe("saveTasks", () => {
    it("saves the task count", () => {
      this.subject.saveTasks(["a", "b"]);
      expect(this.items["ntasks"]).toEqual("2");
    });

    it("saves the task titles", () => {
      this.subject.saveTasks(["a", "b"]);
      expect(this.items["task0title"]).toEqual("a");
      expect(this.items["task1title"]).toEqual("b");
    });
  });
});
