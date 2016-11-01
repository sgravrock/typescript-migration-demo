describe("TodoController", function() {
  beforeEach(function() {
    this.dom = document.createElement("div");
    this.subject = new TodoMvc.TodoController();
    this.subject.appendTo(this.dom);
  });

  it("says hello", function() {
    expect(this.dom.textContent).toEqual("Hello, world!");
  });
});
