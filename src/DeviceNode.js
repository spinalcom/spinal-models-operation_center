const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import SpinalNode from "./SpinalNode"
import Device from "./Device"


export default class DeviceNode extends SpinalNode {
  constructor(_parent, _element, _options, name = "DeviceNode") {
    super(_parent, _element, _options);
  }

  createChild(_protocolType) {
    let device = new Device(_protocolType)
    device.setName(
      this.element.name.get() + "-" + this.incrementChildNameId().toString()
    )
    let child = new DeviceNode(this, device);
    this.addChild(child);
  }


}

spinalCore.register_models([DeviceNode])