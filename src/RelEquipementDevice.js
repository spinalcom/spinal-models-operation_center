const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class RelEquipementDevice extends globalType.Model {
  constructor(_equipement, _device, name = "RelEquipementDevice") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        equipement: new Ptr(_equipement),
        device: new Ptr(_device)
      });
    }
  }
}

spinalCore.register_models([RelEquipementDevice])