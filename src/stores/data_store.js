import {
  makeAutoObservable,
  autorun,
  computed,
  observable,
  action,
} from "mobx";

class Library {
  data = null;

  constructor() {
    makeAutoObservable(this, {
      tree: computed,
    });

    if (this.data) {
      return this.data;
    } else {
      this.get_library();
    }
  }
  removeNode(id) {
    const removeItem = (id) => {
      let node = this.data.find((n) => n.id == id);
      if (node.children) {
        node.children.forEach((n) => {
          removeItem(n.id);
        });
      }
      this.data = this.data.filter((n) => n.id !== id);
    };
    removeItem(id);
    console.log(this.data.length, "thisdata");
  }

  rmById(id) {
    let rmQueque = [id];
    for (let i = 0; i < rmQueque.length; i++) {
      for (let j in this.data) {
        if (this.data[j].id == rmQueque[i]) {
          this.data.splice(j, 1);
          j--;
        } else if (this.data[j].parentId == rmQueque[i]) {
          rmQueque.push(this.data[j].id);
          this.data.splice(j, 1);
          j--;
        }
      }
      console.log(rmQueque, "queque");
    }
    console.log(this.data, "newd");
  }

  removeElement(id) {
    console.log(id, "id");
    let filteredArr = this.data.filter((n) => n.id !== id);
    console.log(filteredArr, "arr");
    this.data = filteredArr;
    console.log(this.data, "thisdata");
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
    return this.createTree(this.data);
  }

  createTree(arr) {
    console.log(arr, "arr");
    if (!arr || !arr.length) {
      return [];
    }
    let tree = [],
      map = new Map();
    for (let i = 0, len = arr.length; i < len; ++i) {
      let item = JSON.parse(JSON.stringify(arr[i]));
      //console.log(map, "map");
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
          console.log(children, item, "children");
          children.push(item);
        }
      }
    }
    console.log(tree, "treeIII");
    return tree;
  }

  get_data() {
    return this.data;
  }

  get_library() {
    fetch("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62")
      .then((res) => {
        res.json().then((data) => {
          let temp = JSON.parse(data.files["view.json"].content)[
            "entityLabelPages"
          ][0];
          let temp2 = this.getNodes(temp);
          console.log(temp2, "ROW");
          this.data = temp2;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get_tree() {
    return this.tree;
  }
}
export default new Library();
