/// <reference path="../../typings/index.d.ts" />
import { run } from "../../src/app"
describe("app", function() {
  "use strict";

  beforeEach(function() {
    this.dom = document.createElement("div");
    run(this.dom);
  });

  it("shows a todo controller", function() {
    var root = this.dom.querySelector(".todo-controller");
    expect(root).toBeTruthy();
  });
});
