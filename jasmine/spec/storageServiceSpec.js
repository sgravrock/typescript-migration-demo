define(["../../storageService"], function(subject) {
  describe("storageService", function() {
    "use strict";

    beforeEach(function() {
      var that = this;
      this.items = {};
      subject._localStorage = {
        getItem: jasmine.createSpy("getItem"),
        setItem: jasmine.createSpy("setItem")
      };

      subject._localStorage.getItem.and.callFake(function(k) {
        if (that.items.hasOwnProperty(k)) {
          return that.items[k];
        }

        return null;
      });

      subject._localStorage.setItem.and.callFake(function(k, v) {
        that.items[k] = v.toString();
      });
    });

    describe("loadTasks", function() {
      describe("when there is no task data", function() {
        it("returns an empty list", function() {
          expect(subject.loadTasks()).toEqual([]);
        });
      });

      describe("When there is task data", function() {
        beforeEach(function() {
          subject.saveTasks([
            "Task 0",
            "Task 1"
          ]);
        });

        it("returns the tasks", function() {
          expect(subject.loadTasks()).toEqual([
            "Task 0",
            "Task 1"
          ]);
        });
      });
    });

    describe("saveTasks", function() {
      it("saves the task count", function() {
        subject.saveTasks(["a", "b"]);
        expect(this.items["ntasks"]).toEqual("2");
      });

      it("saves the task titles", function() {
        subject.saveTasks(["a", "b"]);
        expect(this.items["task0title"]).toEqual("a");
        expect(this.items["task1title"]).toEqual("b");
      });
    });
  });
});
