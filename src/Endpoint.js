const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class Endpoint extends globalType.Model {
  constructor(_group, name = "Endpoint") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        name: "Endpoint " + this.incrementNameId(),
        id: this.guid(),
        dataType: new Choice(0, ["Temperature", "Humidity"]),
        currentValue: 0,
        path: "",
        min: 0,
        max: 0,
        unit: "",
        inGroup: new Ptr(_group || 0)
      });
    }
  }

  incrementNameId() {
    globalType.operationCenter.options.endpointNameId
      .set(globalType.operationCenter.options.endpointNameId.get() + 1);
    return globalType.operationCenter.options.endpointNameId.get();
  }

  setGroup(_group) {
    this.inGroup.set(_group);
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
}

spinalCore.register_models([Endpoint])