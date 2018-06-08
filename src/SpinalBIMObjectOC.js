const globalType = typeof window === "undefined" ? global : window;
const spinalCore = require("spinal-core-connectorjs");
const BIMForge = require("spinal-models-bim_forge");

let getViewer = function() {
  return globalType.v;
}

export default class SpinalBIMObjectOC extends BIMForge.SpinalBIMObjectForge {
  constructor(itemId, groupId, name = "SpinalBIMObjectOC") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        groupId: groupId
      });
      this.id.set(itemId);
      this.display.set(true);
    }
  }

  fillInfo() {
    return new Promise((resolve, reject) => {
      getViewer().getProperties(this.id.get(), r => {
        this.name.set(r.name);
        resolve();
      });
    });
  }
}

spinalCore.register_models([SpinalBIMObjectOC])