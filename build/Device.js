"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OperationCenterObject = require("./OperationCenterObject");

var _OperationCenterObject2 = _interopRequireDefault(_OperationCenterObject);

var _Endpoint = require("./Endpoint");

var _Endpoint2 = _interopRequireDefault(_Endpoint);

var _EndpointGroup = require("./EndpointGroup");

var _EndpointGroup2 = _interopRequireDefault(_EndpointGroup);

var _RelEquipementDevice = require("./RelEquipementDevice");

var _RelEquipementDevice2 = _interopRequireDefault(_RelEquipementDevice);

var _RelDeviceEquipement = require("./RelDeviceEquipement");

var _RelDeviceEquipement2 = _interopRequireDefault(_RelDeviceEquipement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;


/**
 *
 *
 * @class Device
 * @extends {OperationCenterObject}
 */
class Device extends _OperationCenterObject2.default {
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
  constructor(_protocolType, _id, _ipAddress, _deviceType, _defaultEndpointGroup, _defaultMeasurement, name = "Device") {
    if (typeof _id === "undefined") super();else super(_id);
    if (FileSystem._sig_server) {
      let defaultEndpointGroup = null;
      if (typeof _defaultEndpointGroup === "undefined") defaultEndpointGroup = new _EndpointGroup2.default(this);else defaultEndpointGroup = _defaultEndpointGroup;
      this.add_attr({
        protocolType: new Choice(0, ["SNMP", "BACnet"]),
        ipAddress: _ipAddress || "127.0.0.1",
        deviceType: new Choice(0, ["Sensor", "Router", "Actuator"]),
        endpointGroupsPtrs: new Lst([new Ptr(defaultEndpointGroup)]),
        defaultMeasurement: new Choice(0, defaultEndpointGroup.list.get()),
        relEquipementDevice: new Ptr(new _RelEquipementDevice2.default(0, this)),
        relDeviceEquipement: new Ptr(new _RelDeviceEquipement2.default(0))
      });
      if (typeof _protocolType !== "undefined") this.protocolType.set(_protocolType);
      if (typeof _deviceType !== "undefined") this.deviceType.set(_deviceType);
      if (typeof _defaultMeasurement !== "undefined") this.defaultMeasurement.set(_defaultMeasurement);
      // defaultEndpointGroup.createEndpoint()
    }
  }

  createEndpointGroup() {
    let endpointGroup = new _EndpointGroup2.default(this);
    this.addEndpointGroup(endpointGroup);
  }

  addEndpointGroup(_endpointGroup) {
    this.endpointGroupsPtrs.push(new Ptr(_endpointGroup));
  }

  createEndpoint() {
    let endpoint = new _Endpoint2.default();
    this.addEndpoint(endpoint);
  }

  addEndpoint(_endpoint) {
    if (this.endpointGroupsPtrs.length === 0) {
      let defaultEndpointGroup = new _EndpointGroup2.default(this);
      this.endpointGroupsPtrs.push(new Ptr(defaultEndpointGroup));
    }
    this.endpointGroupsPtrs[0].load(defaultEndpointGroup => {
      _endpoint.setGroup(defaultEndpointGroup);
      defaultEndpointGroup.addEndpoint(_endpoint);
    });
  }

}
exports.default = Device;

spinalCore.register_models([Device]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EZXZpY2UuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiRGV2aWNlIiwiT3BlcmF0aW9uQ2VudGVyT2JqZWN0IiwiY29uc3RydWN0b3IiLCJfcHJvdG9jb2xUeXBlIiwiX2lkIiwiX2lwQWRkcmVzcyIsIl9kZXZpY2VUeXBlIiwiX2RlZmF1bHRFbmRwb2ludEdyb3VwIiwiX2RlZmF1bHRNZWFzdXJlbWVudCIsIm5hbWUiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJkZWZhdWx0RW5kcG9pbnRHcm91cCIsIkVuZHBvaW50R3JvdXAiLCJhZGRfYXR0ciIsInByb3RvY29sVHlwZSIsIkNob2ljZSIsImlwQWRkcmVzcyIsImRldmljZVR5cGUiLCJlbmRwb2ludEdyb3Vwc1B0cnMiLCJMc3QiLCJQdHIiLCJkZWZhdWx0TWVhc3VyZW1lbnQiLCJsaXN0IiwiZ2V0IiwicmVsRXF1aXBlbWVudERldmljZSIsIlJlbEVxdWlwZW1lbnREZXZpY2UiLCJyZWxEZXZpY2VFcXVpcGVtZW50IiwiUmVsRGV2aWNlRXF1aXBlbWVudCIsInNldCIsImNyZWF0ZUVuZHBvaW50R3JvdXAiLCJlbmRwb2ludEdyb3VwIiwiYWRkRW5kcG9pbnRHcm91cCIsIl9lbmRwb2ludEdyb3VwIiwicHVzaCIsImNyZWF0ZUVuZHBvaW50IiwiZW5kcG9pbnQiLCJFbmRwb2ludCIsImFkZEVuZHBvaW50IiwiX2VuZHBvaW50IiwibGVuZ3RoIiwibG9hZCIsInNldEdyb3VwIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFQQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7OztBQVFB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IkRldmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCBPcGVyYXRpb25DZW50ZXJPYmplY3QgZnJvbSBcIi4vT3BlcmF0aW9uQ2VudGVyT2JqZWN0XCJcbmltcG9ydCBFbmRwb2ludCBmcm9tIFwiLi9FbmRwb2ludFwiXG5pbXBvcnQgRW5kcG9pbnRHcm91cCBmcm9tIFwiLi9FbmRwb2ludEdyb3VwXCJcblxuaW1wb3J0IFJlbEVxdWlwZW1lbnREZXZpY2UgZnJvbSBcIi4vUmVsRXF1aXBlbWVudERldmljZVwiXG5pbXBvcnQgUmVsRGV2aWNlRXF1aXBlbWVudCBmcm9tIFwiLi9SZWxEZXZpY2VFcXVpcGVtZW50XCJcblxuLyoqXG4gKlxuICpcbiAqIEBjbGFzcyBEZXZpY2VcbiAqIEBleHRlbmRzIHtPcGVyYXRpb25DZW50ZXJPYmplY3R9XG4gKi9cbmNsYXNzIERldmljZSBleHRlbmRzIE9wZXJhdGlvbkNlbnRlck9iamVjdCB7XG4gIC8qKlxuICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGV2aWNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdG9jb2xUeXBlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXBBZGRyZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkZXZpY2VUeXBlXG4gICAqIEBwYXJhbSB7RW5kcG9pbnRHcm91cH0gZGVmYXVsdEVuZHBvaW50R3JvdXBcbiAgICogQHBhcmFtIHtFbmRwb2ludH0gZGVmYXVsdE1lYXN1cmVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cIkRldmljZVwiXVxuICAgKiBAbWVtYmVyb2YgRGV2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihfcHJvdG9jb2xUeXBlLCBfaWQsIF9pcEFkZHJlc3MsIF9kZXZpY2VUeXBlLFxuICAgIF9kZWZhdWx0RW5kcG9pbnRHcm91cCxcbiAgICBfZGVmYXVsdE1lYXN1cmVtZW50LCBuYW1lID0gXCJEZXZpY2VcIikge1xuICAgIGlmICh0eXBlb2YgX2lkID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgc3VwZXIoKTtcbiAgICBlbHNlXG4gICAgICBzdXBlcihfaWQpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICBsZXQgZGVmYXVsdEVuZHBvaW50R3JvdXAgPSBudWxsXG4gICAgICBpZiAodHlwZW9mIF9kZWZhdWx0RW5kcG9pbnRHcm91cCA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgZGVmYXVsdEVuZHBvaW50R3JvdXAgPSBuZXcgRW5kcG9pbnRHcm91cCh0aGlzKVxuICAgICAgZWxzZVxuICAgICAgICBkZWZhdWx0RW5kcG9pbnRHcm91cCA9IF9kZWZhdWx0RW5kcG9pbnRHcm91cFxuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIHByb3RvY29sVHlwZTogbmV3IENob2ljZSgwLCBbXCJTTk1QXCIsIFwiQkFDbmV0XCJdKSxcbiAgICAgICAgaXBBZGRyZXNzOiBfaXBBZGRyZXNzIHx8IFwiMTI3LjAuMC4xXCIsXG4gICAgICAgIGRldmljZVR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiU2Vuc29yXCIsIFwiUm91dGVyXCIsIFwiQWN0dWF0b3JcIl0pLFxuICAgICAgICBlbmRwb2ludEdyb3Vwc1B0cnM6IG5ldyBMc3QoW25ldyBQdHIoZGVmYXVsdEVuZHBvaW50R3JvdXApXSksXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlbWVudDogbmV3IENob2ljZSgwLCBkZWZhdWx0RW5kcG9pbnRHcm91cC5saXN0LmdldCgpKSxcbiAgICAgICAgcmVsRXF1aXBlbWVudERldmljZTogbmV3IFB0cihuZXcgUmVsRXF1aXBlbWVudERldmljZSgwLCB0aGlzKSksXG4gICAgICAgIHJlbERldmljZUVxdWlwZW1lbnQ6IG5ldyBQdHIobmV3IFJlbERldmljZUVxdWlwZW1lbnQoMCkpXG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgX3Byb3RvY29sVHlwZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgdGhpcy5wcm90b2NvbFR5cGUuc2V0KF9wcm90b2NvbFR5cGUpO1xuICAgICAgaWYgKHR5cGVvZiBfZGV2aWNlVHlwZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgdGhpcy5kZXZpY2VUeXBlLnNldChfZGV2aWNlVHlwZSk7XG4gICAgICBpZiAodHlwZW9mIF9kZWZhdWx0TWVhc3VyZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHRoaXMuZGVmYXVsdE1lYXN1cmVtZW50LnNldChfZGVmYXVsdE1lYXN1cmVtZW50KTtcbiAgICAgIC8vIGRlZmF1bHRFbmRwb2ludEdyb3VwLmNyZWF0ZUVuZHBvaW50KClcbiAgICB9XG4gIH1cblxuICBjcmVhdGVFbmRwb2ludEdyb3VwKCkge1xuICAgIGxldCBlbmRwb2ludEdyb3VwID0gbmV3IEVuZHBvaW50R3JvdXAodGhpcylcbiAgICB0aGlzLmFkZEVuZHBvaW50R3JvdXAoZW5kcG9pbnRHcm91cCk7XG4gIH1cblxuICBhZGRFbmRwb2ludEdyb3VwKF9lbmRwb2ludEdyb3VwKSB7XG4gICAgdGhpcy5lbmRwb2ludEdyb3Vwc1B0cnMucHVzaChuZXcgUHRyKF9lbmRwb2ludEdyb3VwKSlcbiAgfVxuXG4gIGNyZWF0ZUVuZHBvaW50KCkge1xuICAgIGxldCBlbmRwb2ludCA9IG5ldyBFbmRwb2ludCgpXG4gICAgdGhpcy5hZGRFbmRwb2ludChlbmRwb2ludClcbiAgfVxuXG4gIGFkZEVuZHBvaW50KF9lbmRwb2ludCkge1xuICAgIGlmICh0aGlzLmVuZHBvaW50R3JvdXBzUHRycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBkZWZhdWx0RW5kcG9pbnRHcm91cCA9IG5ldyBFbmRwb2ludEdyb3VwKHRoaXMpXG4gICAgICB0aGlzLmVuZHBvaW50R3JvdXBzUHRycy5wdXNoKG5ldyBQdHIoZGVmYXVsdEVuZHBvaW50R3JvdXApKVxuICAgIH1cbiAgICB0aGlzLmVuZHBvaW50R3JvdXBzUHRyc1swXS5sb2FkKGRlZmF1bHRFbmRwb2ludEdyb3VwID0+IHtcbiAgICAgIF9lbmRwb2ludC5zZXRHcm91cChkZWZhdWx0RW5kcG9pbnRHcm91cCk7XG4gICAgICBkZWZhdWx0RW5kcG9pbnRHcm91cC5hZGRFbmRwb2ludChfZW5kcG9pbnQpXG4gICAgfSlcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBEZXZpY2U7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbRGV2aWNlXSkiXX0=