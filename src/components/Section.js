export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    if (this._container) {
      this._container.innerHTML = '';
    }
  }

  // renderItems() {
  //   this.clear();

  //   this._renderItems.forEach((item) => {
  //     this._renderer(item);
  //   })

  // }

  renderElements(data) {
    //this.clear();

    data.forEach(element => {
      this._renderer(element)});

  }
}

////////////
// export default class Section {
//   constructor({ items, renderer }, containerSelector) {
//     //this._renderItems = items;
//     this._renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

//   addItem(element) {
//     this._container.prepend(element);
//   }

//   clear() {
//     if (this._container) {
//       this._container.innerHTML = '';
//     }
//   }

//   renderItems() {
//     this.clear();

//     this._renderItems.forEach((item) => {
//       this._renderer(item);
//     })

//   }

// }