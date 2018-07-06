"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceNode = require("./DeviceNode");

var _DeviceNode2 = _interopRequireDefault(_DeviceNode);

var _Device = require("./Device");

var _Device2 = _interopRequireDefault(_Device);

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

let getViewer = function () {
  return globalType.v;
};
class DeviceForest extends _Forest2.default {
  constructor(_options) {
    super(_options);
    if (FileSystem._sig_server) {
      this.add_attr({
        deviceNameId: 0
      });
    }
  }

  incrementDeviceNameId() {
    this.deviceNameId.set(this.deviceNameId.get() + 1);
    return this.deviceNameId.get();
  }

  addTree(_protocolType) {
    let device = new _Device2.default(_protocolType);
    device.setName(_protocolType + "-device" + " " + this.incrementChildNameId().toString());
    var tree = new _DeviceNode2.default(this, device, this.relOptions);
    this.list.push(tree);
  }

  addDevice(_protocolType) {
    this.list.push(new _Device2.default(_protocolType, this.incrementDeviceNameId()));
  }
}

exports.default = DeviceForest;
spinalCore.register_models([DeviceForest]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EZXZpY2VGb3Jlc3QuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiZ2V0Vmlld2VyIiwidiIsIkRldmljZUZvcmVzdCIsIkZvcmVzdCIsImNvbnN0cnVjdG9yIiwiX29wdGlvbnMiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJhZGRfYXR0ciIsImRldmljZU5hbWVJZCIsImluY3JlbWVudERldmljZU5hbWVJZCIsInNldCIsImdldCIsImFkZFRyZWUiLCJfcHJvdG9jb2xUeXBlIiwiZGV2aWNlIiwiRGV2aWNlIiwic2V0TmFtZSIsImluY3JlbWVudENoaWxkTmFtZUlkIiwidG9TdHJpbmciLCJ0cmVlIiwiRGV2aWNlTm9kZSIsInJlbE9wdGlvbnMiLCJsaXN0IiwicHVzaCIsImFkZERldmljZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFKQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBSUEsSUFBSUUsWUFBWSxZQUFXO0FBQ3pCLFNBQU9ILFdBQVdJLENBQWxCO0FBQ0QsQ0FGRDtBQUdlLE1BQU1DLFlBQU4sU0FBMkJDLGdCQUEzQixDQUFrQztBQUMvQ0MsY0FBWUMsUUFBWixFQUFzQjtBQUNwQixVQUFNQSxRQUFOO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsc0JBQWM7QUFERixPQUFkO0FBR0Q7QUFDRjs7QUFFREMsMEJBQXdCO0FBQ3RCLFNBQUtELFlBQUwsQ0FBa0JFLEdBQWxCLENBQXNCLEtBQUtGLFlBQUwsQ0FBa0JHLEdBQWxCLEtBQTBCLENBQWhEO0FBQ0EsV0FBTyxLQUFLSCxZQUFMLENBQWtCRyxHQUFsQixFQUFQO0FBQ0Q7O0FBRURDLFVBQVFDLGFBQVIsRUFBdUI7QUFDckIsUUFBSUMsU0FBUyxJQUFJQyxnQkFBSixDQUFXRixhQUFYLENBQWI7QUFDQUMsV0FBT0UsT0FBUCxDQUFlSCxnQkFBZ0IsU0FBaEIsR0FBNEIsR0FBNUIsR0FBa0MsS0FBS0ksb0JBQUwsR0FDOUNDLFFBRDhDLEVBQWpEO0FBRUEsUUFBSUMsT0FBTyxJQUFJQyxvQkFBSixDQUFlLElBQWYsRUFBcUJOLE1BQXJCLEVBQTZCLEtBQUtPLFVBQWxDLENBQVg7QUFDQSxTQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZUosSUFBZjtBQUNEOztBQUdESyxZQUFVWCxhQUFWLEVBQXlCO0FBQ3ZCLFNBQUtTLElBQUwsQ0FBVUMsSUFBVixDQUFlLElBQUlSLGdCQUFKLENBQVdGLGFBQVgsRUFBMEIsS0FBS0oscUJBQUwsRUFBMUIsQ0FBZjtBQUNEO0FBMUI4Qzs7a0JBQTVCUixZO0FBNkJyQlAsV0FBVytCLGVBQVgsQ0FBMkIsQ0FBQ3hCLFlBQUQsQ0FBM0IiLCJmaWxlIjoiRGV2aWNlRm9yZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IERldmljZU5vZGUgZnJvbSBcIi4vRGV2aWNlTm9kZVwiXG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuL0RldmljZVwiXG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiXG5sZXQgZ2V0Vmlld2VyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxUeXBlLnY7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2VGb3Jlc3QgZXh0ZW5kcyBGb3Jlc3Qge1xuICBjb25zdHJ1Y3Rvcihfb3B0aW9ucykge1xuICAgIHN1cGVyKF9vcHRpb25zKTtcbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGRldmljZU5hbWVJZDogMFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50RGV2aWNlTmFtZUlkKCkge1xuICAgIHRoaXMuZGV2aWNlTmFtZUlkLnNldCh0aGlzLmRldmljZU5hbWVJZC5nZXQoKSArIDEpO1xuICAgIHJldHVybiB0aGlzLmRldmljZU5hbWVJZC5nZXQoKTtcbiAgfVxuXG4gIGFkZFRyZWUoX3Byb3RvY29sVHlwZSkge1xuICAgIGxldCBkZXZpY2UgPSBuZXcgRGV2aWNlKF9wcm90b2NvbFR5cGUpXG4gICAgZGV2aWNlLnNldE5hbWUoX3Byb3RvY29sVHlwZSArIFwiLWRldmljZVwiICsgXCIgXCIgKyB0aGlzLmluY3JlbWVudENoaWxkTmFtZUlkKClcbiAgICAgIC50b1N0cmluZygpKTtcbiAgICB2YXIgdHJlZSA9IG5ldyBEZXZpY2VOb2RlKHRoaXMsIGRldmljZSwgdGhpcy5yZWxPcHRpb25zKTtcbiAgICB0aGlzLmxpc3QucHVzaCh0cmVlKTtcbiAgfVxuXG5cbiAgYWRkRGV2aWNlKF9wcm90b2NvbFR5cGUpIHtcbiAgICB0aGlzLmxpc3QucHVzaChuZXcgRGV2aWNlKF9wcm90b2NvbFR5cGUsIHRoaXMuaW5jcmVtZW50RGV2aWNlTmFtZUlkKCkpKVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtEZXZpY2VGb3Jlc3RdKSJdfQ==