describe("app", function() {
  "use strict";

  beforeEach(function() {
    this.dom = document.createElement("div");
    TodoMvc.app.run(this.dom);
  });

  it("shows a todo controller", function() {
    var root = this.dom.querySelector(".todo-controller");
    expect(root).toBeTruthy();
  });
});
