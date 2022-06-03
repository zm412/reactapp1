import { makeAutoObservable, observable, action } from "mobx";
import lib from "../stores/data_store.js";

class smallData {
  tree = this.createTree(lib.data);

  constructor() {
    makeAutoObservable(this);
  }

  createTree(arr) {
    if (!arr || !arr.length) {
      return [];
    }
    let tree = [],
      map = new Map();
    for (let i = 0, len = arr.length; i < len; ++i) {
      let item = arr[i];
      let mapItem = map.get(item.id);
      if (!mapItem || Array.isArray(mapItem)) {
        if (mapItem) {
          item.children = mapItem;
        }
        map.set(item.id, item);
      }
      if (item.parentId === -1) {
        tree.push(item);
      } else {
        let parentItem = map.get(item.parentId);
        if (!parentItem) {
          map.set(item.parentId, [item]);
        } else {
          let children = Array.isArray(parentItem)
            ? parentItem
            : (parentItem.children = parentItem.children || []);
          children.push(item);
        }
      }
    }
    this.tree = tree;
    return tree;
  }
}

export default new smallData();
