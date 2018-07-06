const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import Endpoint from "./Endpoint"

export default class EndpointGroup extends globalType.Model {
  constructor(_device, name = "EndpointGroup") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        name: "EndpointGroup " + this.incrementNameId(),
        id: this.guid(),
        list: new Lst(),
        inDevice: new Ptr(_device),
        type: new Choice(0, ["CVC", "other"]),
      });
    }
  }

  incrementNameId() {
    globalType.operationCenter.options.endpointGroupNameId
      .set(globalType.operationCenter.options.endpointGroupNameId.get() + 1);
    return globalType.operationCenter.options.endpointGroupNameId.get();
  }

  guid() {
    return (
      this.constructor.name +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4() +
      "-" +
      Date.now().toString(16)
    );
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  createEndpoint() {
    let endpoint = new Endpoint(this)
    this.addEndpoint(endpoint)
  }

  addEndpoint(_endpoint) {
    this.list.push(_endpoint)
    this.inDevice.load(device => {
      device.defaultMeasurement.lst.push(_endpoint.name.get())
    })
  }
}

spinalCore.register_models([EndpointGroup])