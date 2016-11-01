const template =
  '<span class="title"></span>' +
  '<button>Remove</button>';

export class TaskController {
  private title: string;
  private dom: Element;

  constructor(title: string) {
    const that = this;
    this.title = title;
    this.dom = document.createElement("li");
    this.dom.innerHTML = template;
    this.dom.querySelector(".title").textContent = title;
    this.dom.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        that.remove();
      });
  }

  appendTo(parent: Element): void {
    parent.appendChild(this.dom);
  }

  remove(): void {
    this.dom.parentNode.removeChild(this.dom);
    this.onRemove();
  }

  onRemove(): void {
    // Replaceable
  }
}
