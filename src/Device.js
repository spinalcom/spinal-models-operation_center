const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import OperationCenterObject from "./OperationCenterObject"
import Endpoint from "./Endpoint"
import EndpointGroup from "./EndpointGroup"

import RelEquipementDevice from "./RelEquipementDevice"
import RelDeviceEquipement from "./RelDeviceEquipement"

/**
 *
 *
 * @class Device
 * @extends {OperationCenterObject}
 */
class Device extends OperationCenterObject {
  /**
   *Creates an instance of Device.
   * @param {string} protocolType
   * @param {number} id
   * @param {string} ipAddress
   * @param {string} deviceType
   * @param {EndpointGroup} defaultEndpointGroup
   * @param {Endpoint} defaultMeasurement
   * @param {string} [name="Device"]
   * @memberof Device
   */
  constructor(_protocolType, _id, _ipAddress, _deviceType,
    _defaultEndpointGroup,
    _defaultMeasurement, name = "Device") {
    if (typeof _id === "undefined")
      super();
    else
      super(_id);
    if (FileSystem._sig_server) {
      let defaultEndpointGroup = null
      if (typeof _defaultEndpointGroup === "undefined")
        defaultEndpointGroup = new EndpointGroup(this)
      else
        defaultEndpointGroup = _defaultEndpointGroup
      this.add_attr({
        protocolType: new Choice(0, ["SNMP", "BACnet"]),
        ipAddress: _ipAddress || "127.0.0.1",
        deviceType: new Choice(0, ["Sensor", "Router", "Actuator"]),
        endpointGroupsPtrs: new Lst([new Ptr(defaultEndpointGroup)]),
        defaultMeasurement: new Choice(0, defaultEndpointGroup.list.get()),
        relEquipementDevice: new Ptr(new RelEquipementDevice(0, this)),
        relDeviceEquipement: new Ptr(new RelDeviceEquipement(0))
      });
      if (typeof _protocolType !== "undefined")
        this.protocolType.set(_protocolType);
      if (typeof _deviceType !== "undefined")
        this.deviceType.set(_deviceType);
      if (typeof _defaultMeasurement !== "undefined")
        this.defaultMeasurement.set(_defaultMeasurement);
      // defaultEndpointGroup.createEndpoint()
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
export default Device;
spinalCore.register_models([Device])