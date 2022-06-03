import { observer } from "mobx-react";
import { useState, useEffect } from "react";

const InfoBlock = ({ info }) => {
  console.log(info, "info");
  const [nodeInfo, setNodeInfo] = useState(null);
  const list = (
    <ul>
      <li>{info.label}</li>
      <li>{info.id}</li>
      <li>{info.parentId}</li>
    </ul>
  );

  return <div>{info && list}</div>;
};

export default InfoBlock;
