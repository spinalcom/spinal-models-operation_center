"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OperationCenterObject = require("./OperationCenterObject");

var _OperationCenterObject2 = _interopRequireDefault(_OperationCenterObject);

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
class Zone extends _OperationCenterObject2.default {
  constructor(_type, _id, name = "Zone") {
    if (typeof _id === "undefined") super();else super(_id);
    if (FileSystem._sig_server) {
      this.add_attr({
        BIMGroup: new _SpinalBIMGroupOC2.default(),
        type: new Choice(0, ["Zone", "Equipement", "Structure"])
      });
      this.type.set(_type || "Zone");
    }
  }

  isEquipement() {
    return this.type.get() === "Equipement";
  }

  toString() {
    return "Zone(" + this.name.get() + ", " + this.id.get() + ", " + this.BIMGroup.id.get() + ", " + this.type.get() + ");";
  }
}

exports.default = Zone;
spinalCore.register_models([Zone]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ab25lLmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlpvbmUiLCJPcGVyYXRpb25DZW50ZXJPYmplY3QiLCJjb25zdHJ1Y3RvciIsIl90eXBlIiwiX2lkIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiQklNR3JvdXAiLCJTcGluYWxCSU1Hcm91cE9DIiwidHlwZSIsIkNob2ljZSIsInNldCIsImlzRXF1aXBlbWVudCIsImdldCIsInRvU3RyaW5nIiwiaWQiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUhBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUtlLE1BQU1FLElBQU4sU0FBbUJDLCtCQUFuQixDQUF5QztBQUN0REMsY0FBWUMsS0FBWixFQUFtQkMsR0FBbkIsRUFBd0JDLE9BQU8sTUFBL0IsRUFBdUM7QUFDckMsUUFBSSxPQUFPRCxHQUFQLEtBQWUsV0FBbkIsRUFDRSxRQURGLEtBR0UsTUFBTUEsR0FBTjtBQUNGLFFBQUlFLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLGtCQUFVLElBQUlDLDBCQUFKLEVBREU7QUFFWkMsY0FBTSxJQUFJQyxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQUMsTUFBRCxFQUFTLFlBQVQsRUFBdUIsV0FBdkIsQ0FBZDtBQUZNLE9BQWQ7QUFJQSxXQUFLRCxJQUFMLENBQVVFLEdBQVYsQ0FBY1YsU0FBUyxNQUF2QjtBQUNEO0FBQ0Y7O0FBR0RXLGlCQUFlO0FBQ2IsV0FBTyxLQUFLSCxJQUFMLENBQVVJLEdBQVYsT0FBb0IsWUFBM0I7QUFDRDs7QUFFREMsYUFBVztBQUNULFdBQU8sVUFBVSxLQUFLWCxJQUFMLENBQVVVLEdBQVYsRUFBVixHQUE0QixJQUE1QixHQUFtQyxLQUFLRSxFQUFMLENBQVFGLEdBQVIsRUFBbkMsR0FBbUQsSUFBbkQsR0FDTCxLQUFLTixRQUFMLENBQWNRLEVBQWQsQ0FBaUJGLEdBQWpCLEVBREssR0FDb0IsSUFEcEIsR0FDMkIsS0FBS0osSUFBTCxDQUFVSSxHQUFWLEVBRDNCLEdBQzZDLElBRHBEO0FBRUQ7QUF2QnFEOztrQkFBbkNmLEk7QUEwQnJCTCxXQUFXdUIsZUFBWCxDQUEyQixDQUFDbEIsSUFBRCxDQUEzQiIsImZpbGUiOiJab25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IE9wZXJhdGlvbkNlbnRlck9iamVjdCBmcm9tIFwiLi9PcGVyYXRpb25DZW50ZXJPYmplY3RcIlxuaW1wb3J0IFNwaW5hbEJJTUdyb3VwT0MgZnJvbSBcIi4vU3BpbmFsQklNR3JvdXBPQ1wiXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIE9wZXJhdGlvbkNlbnRlck9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKF90eXBlLCBfaWQsIG5hbWUgPSBcIlpvbmVcIikge1xuICAgIGlmICh0eXBlb2YgX2lkID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgc3VwZXIoKTtcbiAgICBlbHNlXG4gICAgICBzdXBlcihfaWQpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgQklNR3JvdXA6IG5ldyBTcGluYWxCSU1Hcm91cE9DKCksXG4gICAgICAgIHR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiWm9uZVwiLCBcIkVxdWlwZW1lbnRcIiwgXCJTdHJ1Y3R1cmVcIl0pXG4gICAgICB9KTtcbiAgICAgIHRoaXMudHlwZS5zZXQoX3R5cGUgfHwgXCJab25lXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgaXNFcXVpcGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUuZ2V0KCkgPT09IFwiRXF1aXBlbWVudFwiO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiWm9uZShcIiArIHRoaXMubmFtZS5nZXQoKSArIFwiLCBcIiArIHRoaXMuaWQuZ2V0KCkgKyBcIiwgXCIgK1xuICAgICAgdGhpcy5CSU1Hcm91cC5pZC5nZXQoKSArIFwiLCBcIiArIHRoaXMudHlwZS5nZXQoKSArIFwiKTtcIlxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtab25lXSkiXX0=