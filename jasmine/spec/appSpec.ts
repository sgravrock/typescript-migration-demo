/// <reference path="../../typings/index.d.ts" />
import { run } from "../../src/app"
describe("app", () => {
  "use strict";

  beforeEach(() => {
    this.dom = document.createElement("div");
    run(this.dom);
  });

  it("shows a todo controller", () => {
    const root = this.dom.querySelector(".todo-controller");
    expect(root).toBeTruthy();
  });
});
