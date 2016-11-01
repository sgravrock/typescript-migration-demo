define(["../../scripts/storageService"], function(ss) {
  var StorageService = ss.StorageService;
  describe("storageService", function() {
    "use strict";

    beforeEach(function() {
      var that = this;
      this.items = {};
      var localStorage = {
        getItem: jasmine.createSpy("getItem"),
        setItem: jasmine.createSpy("setItem")
      };

      localStorage.getItem.and.callFake(function(k) {
        if (that.items.hasOwnProperty(k)) {
          return that.items[k];
        }

        return null;
      });

      localStorage.setItem.and.callFake(function(k, v) {
        that.items[k] = v.toString();
      });

      this.subject = new StorageService(localStorage);
    });

    describe("loadTasks", function() {
      describe("when there is no task data", function() {
        it("returns an empty list", function() {
          expect(this.subject.loadTasks()).toEqual([]);
        });
      });

      describe("When there is task data", function() {
        beforeEach(function() {
          this.subject.saveTasks([
            "Task 0",
            "Task 1"
          ]);
        });

        it("returns the tasks", function() {
          expect(this.subject.loadTasks()).toEqual([
            "Task 0",
            "Task 1"
          ]);
        });
      });
    });

    describe("saveTasks", function() {
      it("saves the task count", function() {
        this.subject.saveTasks(["a", "b"]);
        expect(this.items["ntasks"]).toEqual("2");
      });

      it("saves the task titles", function() {
        this.subject.saveTasks(["a", "b"]);
        expect(this.items["task0title"]).toEqual("a");
        expect(this.items["task1title"]).toEqual("b");
      });
    });
  });
});
