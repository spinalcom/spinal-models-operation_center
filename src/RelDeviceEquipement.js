const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class RelDeviceEquipement extends globalType.Model {
  constructor(_equipement, name = "RelDeviceEquipement") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        equipement: new Ptr(_equipement),
      });
    }
  }
}

spinalCore.register_models([RelDeviceEquipement])