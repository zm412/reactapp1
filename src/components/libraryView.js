import { observer } from "mobx-react-lite";
import lib from "../stores/data_store.js";
import LiPoint from "./liPoint.js";

const LibraryView = observer(() => {
  let tree = lib.tree;

  const createList = (arr) => {
    let result = arr.map((node, i) => {
      if (!node.children) {
        return <LiPoint node={node} key={node.id} />;
      } else {
        return (
          <LiPoint
            node={node}
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
