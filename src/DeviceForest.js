const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import DeviceNode from "./DeviceNode"
import Device from "./Device"
import Forest from "./Forest"
let getViewer = function() {
  return globalType.v;
}
export default class DeviceForest extends Forest {
  constructor(_options) {
    super(_options);
    if (FileSystem._sig_server) {
      this.add_attr({
        deviceNameId: 0
      });
    }
  }

  incrementDeviceNameId() {
    this.deviceNameId.set(this.deviceNameId.get() + 1);
    return this.deviceNameId.get();
  }

  addDevice(_protocolType) {
    let device = new Device(_protocolType)
    device.setName(_protocolType + "-device" + " " + this.incrementChildNameId()
      .toString());
    var tree = new DeviceNode(this, device, this.relOptions);
    this.list.push(tree);
  }


  // addDevice(_protocolType) {
  //   this.list.push(new Device(_protocolType, this.incrementDeviceNameId()))
  // }
}

spinalCore.register_models([DeviceForest])