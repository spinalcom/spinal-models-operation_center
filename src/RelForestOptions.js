const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import Options from "./Options"

export default class RelForestOptions extends globalType.Model {
  constructor(_type, _forest, name = "RelForestOptions") {
    super();
    if (FileSystem._sig_server) {
      let opt = new Options;
      _forest.setOptions(opt);
      this.add_attr({
        options: new Ptr(opt),
        [_type]: new Ptr(_forest)
      });
    }
  }
}

spinalCore.register_models([RelForestOptions])