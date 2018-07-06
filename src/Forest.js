import OperationCenterObject from "./OperationCenterObject";
import SpinalNode from "./SpinalNode";

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
let getViewer = function() {
  return globalType.v;
}
export default class Forest extends globalType.Model {
  constructor(_options) {
    if (typeof _options === "undefined") _options = new globalType.Ptr(0)
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst(),
        childNameId: 0,
        relOptions: _options
      });
    }
  }
  setOptions(_options) {
    this.relOptions.set(_options);
  }

  incrementChildNameId() {
    this.childNameId.set(this.childNameId.get() + 1);
    return this.childNameId.get();
  }

  addTree(_name) {
    let operationCenterObject = new OperationCenterObject()
    operationCenterObject.setName(_name + " " + this.incrementChildNameId()
      .toString());
    var tree = new SpinalNode(0, operationCenterObject, this.relOptions);
    this.list.push(tree);
  }



  removeTree(root) {
    let i = this.list.indexOf(root);
    if (i >= 0) {
      this.list.splice(i, 1);
      delete FileSystem._objects[root._server_id];
    }
    return i;
  }

}

spinalCore.register_models([Forest])