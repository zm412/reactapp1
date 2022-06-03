import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import lib from "../stores/data_store.js";
import node_sp from "../stores/small_data.js";

const LiPoint = observer(({ node, children }) => {
  let data = lib.data;

  const clickNode = (e) => {
    let temp = data.find((n) => {
      return n.id == e.target.dataset.key;
    });
    console.log(temp, "temp");
    node_sp.setNode(temp);
  };

  return (
    <li data-key={node.id} className={"def-mark "} onClick={clickNode}>
      {node.label}
      {children && <ol>{children}</ol>}
    </li>
  );
});

export default LiPoint;
