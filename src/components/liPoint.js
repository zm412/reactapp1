import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import lib from "../stores/data_store.js";
import node_sp from "../stores/small_data.js";
import { useDrag, useDrop } from "react-dnd";

const LiPoint = observer(({ node, children, id, moveListItem }) => {
  let data = lib.data;

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop(() => {
    return {
      accept: "item",
      hover: (item, monitor) => {
        console.log(item, "item1");
        console.log(node.id, "parent1");
        const dragIndex = item.id;
        const hoverIndex = node.id;
        console.log(isOver, "isOver");
        if (dragIndex && hoverIndex) return lib.moveNode(dragIndex, hoverIndex);
        console.log(dragIndex, hoverIndex, "indexes1");
        item.index = hoverIndex;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    };
  });
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const clickNode = (e) => {
    let temp = data.find((n) => {
      return n.id == e.target.dataset.key;
    });
    node_sp.setNode(temp);
  };

  return (
    <li
      data-key={node.id}
      ref={dragDropRef}
      className={"def-mark "}
      onClick={clickNode}
      style={{ color: isDragging ? "pink" : "" }}
    >
      {node.label}
      {children && <ol>{children}</ol>}
    </li>
  );
});

export default LiPoint;
