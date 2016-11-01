var template =
  '<span class="title"></span>' +
  '<button>Remove</button>';

class TaskController {
  private _title: string;
  private _dom: Element;

  constructor(title: string) {
    var that = this;
    this._title = title;
    this._dom = document.createElement("li");
    this._dom.innerHTML = template;
    this._dom.querySelector(".title").textContent = title;
    this._dom.querySelector("button").addEventListener("click",
        function (e) {
          e.preventDefault();
          that.remove();
        }
    );
  }

  appendTo(parent: Element): void {
    parent.appendChild(this._dom);
  }

  remove(): void {
    this._dom.parentNode.removeChild(this._dom);
    this.onRemove();
  }

  onRemove(): void {
  }
}

export = TaskController;