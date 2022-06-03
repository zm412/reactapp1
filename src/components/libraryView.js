import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import lib from "../stores/data_store.js";
import small_d from "../stores/small_data.js";

const LibraryView = observer(({ getDetalesFunc, detales }) => {
  const [nodeInfo, setNodeInfo] = useState(null);
  let data = lib.data;
  let tree = lib.tree;
  console.log(data ? data.length : "", "data");
  console.log(lib.tree, "tree");

  const clickNode = (e) => {
    let temp = data.find((n) => {
      return n.id == e.target.dataset.key;
    });
    getDetalesFunc(temp);
  };

  const createList = (arr) => {
    let result = arr.map((node, i) => {
      let none_displ_class = node.parentId != -1 ? "display_none" : "";
      if (!node.children) {
        return (
          <li
            key={i}
            onClick={clickNode}
            className={"def-mark"}
            data-key={node.id}
          >
            {node.label}
          </li>
        );
      } else {
        return (
          <li
            data-key={node.id}
            className={"def-mark "}
            onClick={clickNode}
            key={i}
          >
            {node.label}
            <ol>{createList(node.children)}</ol>
          </li>
        );
      }
    });
    return result;
  };

  if (tree && tree.length > 0) {
    let elem = <ol>{createList(tree)}</ol>;
    return elem;
  }
});

export default LibraryView;
