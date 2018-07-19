const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;


class Network extends OperationCenterObject {

  constructor(_name, configuration, name = "Network") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        name: _name,
        configuration: configuration
      });
    }
  }

}
export default Network;
spinalCore.register_models([Network])