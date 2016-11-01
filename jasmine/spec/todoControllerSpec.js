describe("TodoController", function() {
  beforeEach(function() {
    this.dom = document.createElement("div");
    this.subject = new TodoMvc.TodoController();
    this.subject.appendTo(this.dom);
    this.textField = this.dom.querySelector("input.new-task-name");
    this.addButton = this.dom.querySelector(".add-task");
  });

  it("shows a text entry box", function() {
    expect(this.textField).toBeTruthy();
    expect(this.textField.placeholder).toEqual("new task");
  });

  describe("When the user enters a name and clicks Add", function() {
    beforeEach(function() {
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
  });
});
