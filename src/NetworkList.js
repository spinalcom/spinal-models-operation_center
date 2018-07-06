const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import DeviceForest from "./DeviceForest"
import RelForestOptions from "./RelForestOptions"
let getViewer = function() {
  return globalType.v;
}
export default class NetworkList extends globalType.Model {
  constructor() {
    super();
    this.add_attr({
      SNMPCounter: 0,
      BACnetCounter: 0,
    })
  }

  incrementSNMPCounter() {
    this.SNMPCounter.set(this.SNMPCounter.get() + 1);
    return this.SNMPCounter.get();
  }

  incrementBACnetCounter() {
    this.BACnetCounter.set(this.BACnetCounter.get() + 1);
    return this.BACnetCounter.get();
  }


  addNetwork(_protocolType) {
    let name = ""
    if (_protocolType === "SNMP")
      name = _protocolType + this.incrementSNMPCounter();
    else
      name = _protocolType + this.incrementBACnetCounter()


    let deviceForest = new DeviceForest();
    let relForestOptions = new RelForestOptions(
      "deviceForest", deviceForest);
    relForestOptions.options.load(options => {
      options.add_attr({
        protocolType: name,
        networkList: this
      })
    })
    let network = new Ptr(relForestOptions);
    this.add_attr({
      [name]: network
    })

  }

}

spinalCore.register_models([NetworkList])