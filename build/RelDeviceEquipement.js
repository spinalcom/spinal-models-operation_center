"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

class RelDeviceEquipement extends globalType.Model {
  constructor(_equipement, name = "RelDeviceEquipement") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        equipement: new Ptr(_equipement)
      });
    }
  }
}

exports.default = RelDeviceEquipement;
spinalCore.register_models([RelDeviceEquipement]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWxEZXZpY2VFcXVpcGVtZW50LmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlJlbERldmljZUVxdWlwZW1lbnQiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiX2VxdWlwZW1lbnQiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJlcXVpcGVtZW50IiwiUHRyIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFZSxNQUFNRSxtQkFBTixTQUFrQ0gsV0FBV0ksS0FBN0MsQ0FBbUQ7QUFDaEVDLGNBQVlDLFdBQVosRUFBeUJDLE9BQU8scUJBQWhDLEVBQXVEO0FBQ3JEO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsb0JBQVksSUFBSUMsR0FBSixDQUFRTixXQUFSO0FBREEsT0FBZDtBQUdEO0FBQ0Y7QUFSK0Q7O2tCQUE3Q0gsbUI7QUFXckJMLFdBQVdlLGVBQVgsQ0FBMkIsQ0FBQ1YsbUJBQUQsQ0FBM0IiLCJmaWxlIjoiUmVsRGV2aWNlRXF1aXBlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsRGV2aWNlRXF1aXBlbWVudCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICBjb25zdHJ1Y3RvcihfZXF1aXBlbWVudCwgbmFtZSA9IFwiUmVsRGV2aWNlRXF1aXBlbWVudFwiKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGVxdWlwZW1lbnQ6IG5ldyBQdHIoX2VxdWlwZW1lbnQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtSZWxEZXZpY2VFcXVpcGVtZW50XSkiXX0=