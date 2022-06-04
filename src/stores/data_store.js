import { makeAutoObservable } from "mobx";

class Library {
  data = null;

  constructor() {
    makeAutoObservable(this);

    if (this.data) {
      return this.data;
    } else {
      this.get_library();
    }
  }
  moveNode(id, newParentId) {
    let node = this.data.find((n) => n.id === id);
    let oldParentNode = this.data.find((n) => n.id === node.parentId);
    let nodeParent = this.data.find((n) => n.id === newParentId);
    if (node && nodeParent && oldParentNode) {
      oldParentNode.children = oldParentNode.children.filter(
        (n) => n.id !== node.id
      );
      node.parentId = newParentId;

      this.getChildrenNodes();
    }
  }

  removeNode(id) {
    const removeItem = (id) => {
      let node = this.data.find((n) => n.id === id);
      let oldParentNode = this.data.find((n) => n.id === node.parentId);

      if (oldParentNode) {
        oldParentNode.children = oldParentNode.children.filter(
          (n) => n.id !== node.id
        );
      }
      if (node.children) {
        node.children.forEach((n) => {
          removeItem(n.id);
        });
      }
      this.data = this.data.filter((n) => n.id !== id);
    };
    removeItem(id);
    this.getChildrenNodes();
  }

  refreshData() {
    this.get_library();
  }

  getNodes(obj) {
    let temp = [];
    for (let i = 0; i < obj.labels.length; i++) {
      temp.push({
        label: obj.labels[i],
        id: obj.entityLongIds[i],
        parentId: obj.parentEntityLongIds[i],
      });
    }
    return temp;
  }

  get tree() {
    return this.createTree2(this.data);
  }

  createTree2(array = []) {
    var map = new Map();

    for (const i in array) {
      let item = array[i];
      if (map.has(item.parentId)) map.get(item.parentId).push(item);
      else map.set(item.parentId, [item]);
    }
    return map.get(-1);
  }

  getChildrenNodes() {
    var map = new Map();

    for (const i in this.data) {
      let item = this.data[i];
      if (map.has(item.parentId)) {
        map.get(item.parentId).push(item);
      } else {
        map.set(item.parentId, [item]);
      }
    }
    for (const [parentId, items] of map) {
      for (const item of items) {
        if (map.has(item.id)) {
          item.children = map.get(item.id);
        }
      }
    }
  }

  get_library() {
    fetch("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62")
      .then((res) => {
        res.json().then((data) => {
          let temp = JSON.parse(data.files["view.json"].content)[
            "entityLabelPages"
          ][0];
          let temp2 = this.getNodes(temp);
          this.data = temp2;
          this.getChildrenNodes();
        });
      })
      .catch((err) => {});
  }

  get_tree() {
    return this.tree;
  }
}
export default new Library();
