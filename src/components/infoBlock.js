import { useState, useEffect } from "react";
import node_sp from "../stores/small_data.js";
import { observer } from "mobx-react-lite";

const InfoBlock = observer(() => {
  let info = node_sp.node;
  console.log(info, "infoTTTT");
  let list;
  if (info) {
    list = (
      <ul>
        <li>{info.label}</li>
        <li>{info.id}</li>
        <li>{info.parentId}</li>
      </ul>
    );
  }

  return <div>{info && list}</div>;
});

export default InfoBlock;
