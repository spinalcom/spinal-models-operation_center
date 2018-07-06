const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import OperationCenterObject from "./OperationCenterObject"
import SpinalBIMGroupOC from "./SpinalBIMGroupOC"


export default class Zone extends OperationCenterObject {
  constructor(_type, _id, name = "Zone") {
    if (typeof _id === "undefined")
      super();
    else
      super(_id);
    if (FileSystem._sig_server) {
      this.add_attr({
        BIMGroup: new SpinalBIMGroupOC(),
        type: new Choice(0, ["Zone", "Equipement", "Structure"])
      });
      this.type.set(_type || "Zone");
    }
  }


  isEquipement() {
    return this.type.get() === "Equipement";
  }

  toString() {
    return "Zone(" + this.name.get() + ", " + this.id.get() + ", " +
      this.BIMGroup.id.get() + ", " + this.type.get() + ");"
  }
}

spinalCore.register_models([Zone])