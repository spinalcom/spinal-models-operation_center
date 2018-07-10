const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import OperationCenterObject from "./OperationCenterObject"
import Endpoint from "./Endpoint"
import EndpointGroup from "./EndpointGroup"

import RelEquipementDevice from "./RelEquipementDevice"
import RelDeviceEquipement from "./RelDeviceEquipement"
export default class Device extends OperationCenterObject {
  constructor(_protocolType, _id, name = "Device") {
    if (typeof _id === "undefined")
      super();
    else
      super(_id);
    if (FileSystem._sig_server) {
      let defaultEndpointGroup = new EndpointGroup(this)
      this.add_attr({
        protocolType: new Choice(0, ["SNMP", "BACnet"]),
        ipAddress: "127.0.0.1",
        deviceType: new Choice(0, ["Sensor", "Router", "Actuator"]),
        endpointGroupsPtrs: new Lst([new Ptr(defaultEndpointGroup)]),
        defaultMeasurement: new Choice(0, defaultEndpointGroup.list.get()),
        relEquipementDevice: new Ptr(new RelEquipementDevice(0, this)),
        relDeviceEquipement: new Ptr(new RelDeviceEquipement(0))
      });
      this.protocolType.set(_protocolType || "SNMP");
      defaultEndpointGroup.createEndpoint()
    }
  }

  createEndpointGroup() {
    let endpointGroup = new EndpointGroup(this)
    this.addEndpointGroup(endpointGroup);
  }

  addEndpointGroup(_endpointGroup) {
    this.endpointGroupsPtrs.push(new Ptr(_endpointGroup))
  }

  createEndpoint() {
    let endpoint = new Endpoint()
    this.addEndpoint(endpoint)
  }

  addEndpoint(_endpoint) {
    if (this.endpointGroupsPtrs.length === 0) {
      let defaultEndpointGroup = new EndpointGroup(this)
      this.endpointGroupsPtrs.push(new Ptr(defaultEndpointGroup))
    }
    this.endpointGroupsPtrs[0].load(defaultEndpointGroup => {
      _endpoint.setGroup(defaultEndpointGroup);
      defaultEndpointGroup.addEndpoint(_endpoint)
    })
  }

}

spinalCore.register_models([Device])