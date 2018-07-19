const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class Options extends globalType.Model {
  constructor(name = "Options") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: this.guid()
      });
    }
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



spinalCore.register_models([Options])