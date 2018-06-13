const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class Options extends globalType.Model {
  constructor(name = "Options") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: Options.OptionsId++
      });
    }
  }
}
Options.OptionsId = 0;

spinalCore.register_models([Options])