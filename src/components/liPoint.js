import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import lib from "../stores/data_store.js";
import node_sp from "../stores/small_data.js";
import { useDrag, useDrop } from "react-dnd";

const LiPoint = observer(({ node, children, id, moveListItem }) => {
  let data = lib.data;

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  //console.log(data, "data");
  //let start, end;

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop(() => {
    return {
      accept: "item",
      hover: (item, monitor) => {
        console.log(item, "item");
        const dragIndex = item.id;
        const hoverIndex = id;
        console.log(dragIndex, hoverIndex, "indexes");
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY =
          monitor.getClientOffset().y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

        moveListItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    };
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  //<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  //<br>
  //<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">

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
    >
      {node.label}
      {children && <ol>{children}</ol>}
    </li>
  );
});

export default LiPoint;
