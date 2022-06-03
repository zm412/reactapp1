import { makeAutoObservable, observable, action } from "mobx";
import lib from "../stores/data_store.js";

class smallData {
  node = null;

  constructor() {
    makeAutoObservable(this);
  }

  setNode(node) {
    this.node = node;
    console.log(this.node, "thisnode");
  }
}

export default new smallData();
