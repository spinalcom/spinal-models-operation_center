const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import Forest from "./Forest"
import Options from "./Options"

export default class RelForestOptions extends globalType.Model {
  constructor(name = "RelForestOptions") {
    super();
    if (FileSystem._sig_server) {
      let opt = new Options;
      let ptr = new Ptr(opt);
      this.add_attr({
        options: ptr,
        zoneForest: new Ptr(new Forest(ptr))
      });
    }
  }
}

spinalCore.register_models([RelForestOptions])