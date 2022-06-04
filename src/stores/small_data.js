import { makeAutoObservable } from "mobx";

class smallData {
  node = null;

  constructor() {
    makeAutoObservable(this);
  }

  setNode(node) {
    this.node = node;
  }

  clearNode() {
    this.node = null;
  }
}

export default new smallData();
