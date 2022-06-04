import { observer } from "mobx-react-lite";
import { useState, useEffect, useCallback } from "react";
import lib from "../stores/data_store.js";
import LiPoint from "./liPoint.js";
import { useDrag, useDrop } from "react-dnd";

const LibraryView = observer(() => {
  let data = lib.data;
  let tree = lib.tree;

  const moveListItem = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex, "indexes");
    lib.moveNode(dragIndex, hoverIndex);
  };

  const createList = (arr) => {
    let result = arr.map((node, i) => {
      if (!node.children) {
        return <LiPoint node={node} key={node.id} />;
      } else {
        return (
          <LiPoint
            node={node}
            moveListItem={moveListItem}
            key={node.id}
            id={node.id}
            children={createList(node.children)}
          />
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
