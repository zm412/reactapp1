import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import lib from "../stores/data_store.js";
import node_sp from "../stores/small_data.js";
import { useDrag, useDrop } from "react-dnd";

const LiPoint = observer(({ node, children, id }) => {
  let data = lib.data;

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop(() => {
    return {
      accept: "item",
      hover: (item, monitor) => {
        const dragIndex = item.id;
        const hoverIndex = node.id;
        if (dragIndex && hoverIndex) return lib.moveNode(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    };
  });
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const clickNode = (e) => {
    let temp = data.find((n) => {
      return n.id.toString() === e.target.dataset.key;
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
