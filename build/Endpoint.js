"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

class Endpoint extends globalType.Model {
  constructor(_group, name = "Endpoint") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        name: "Endpoint " + this.incrementNameId(),
        id: this.guid(),
        dataType: new Choice(0, ["Temperature", "Humidity"]),
        currentValue: 0,
        path: "",
        min: 0,
        max: 0,
        unit: "",
        inGroup: new Ptr(_group || 0)
      });
    }
  }

  incrementNameId() {
    globalType.operationCenter.options.endpointNameId.set(globalType.operationCenter.options.endpointNameId.get() + 1);
    return globalType.operationCenter.options.endpointNameId.get();
  }

  setGroup(_group) {
    this.inGroup.set(_group);
  }

  guid() {
    return this.constructor.name + "-" + this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4() + "-" + Date.now().toString(16);
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
}

exports.default = Endpoint;
spinalCore.register_models([Endpoint]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FbmRwb2ludC5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJFbmRwb2ludCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJfZ3JvdXAiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpbmNyZW1lbnROYW1lSWQiLCJpZCIsImd1aWQiLCJkYXRhVHlwZSIsIkNob2ljZSIsImN1cnJlbnRWYWx1ZSIsInBhdGgiLCJtaW4iLCJtYXgiLCJ1bml0IiwiaW5Hcm91cCIsIlB0ciIsIm9wZXJhdGlvbkNlbnRlciIsIm9wdGlvbnMiLCJlbmRwb2ludE5hbWVJZCIsInNldCIsImdldCIsInNldEdyb3VwIiwiczQiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdWJzdHJpbmciLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsTUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjtBQUNBLE1BQU1DLGFBQWEsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVlLE1BQU1FLFFBQU4sU0FBdUJILFdBQVdJLEtBQWxDLENBQXdDO0FBQ3JEQyxjQUFZQyxNQUFaLEVBQW9CQyxPQUFPLFVBQTNCLEVBQXVDO0FBQ3JDO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkgsY0FBTSxjQUFjLEtBQUtJLGVBQUwsRUFEUjtBQUVaQyxZQUFJLEtBQUtDLElBQUwsRUFGUTtBQUdaQyxrQkFBVSxJQUFJQyxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQUMsYUFBRCxFQUFnQixVQUFoQixDQUFkLENBSEU7QUFJWkMsc0JBQWMsQ0FKRjtBQUtaQyxjQUFNLEVBTE07QUFNWkMsYUFBSyxDQU5PO0FBT1pDLGFBQUssQ0FQTztBQVFaQyxjQUFNLEVBUk07QUFTWkMsaUJBQVMsSUFBSUMsR0FBSixDQUFRaEIsVUFBVSxDQUFsQjtBQVRHLE9BQWQ7QUFXRDtBQUNGOztBQUVESyxvQkFBa0I7QUFDaEJYLGVBQVd1QixlQUFYLENBQTJCQyxPQUEzQixDQUFtQ0MsY0FBbkMsQ0FDR0MsR0FESCxDQUNPMUIsV0FBV3VCLGVBQVgsQ0FBMkJDLE9BQTNCLENBQW1DQyxjQUFuQyxDQUFrREUsR0FBbEQsS0FBMEQsQ0FEakU7QUFFQSxXQUFPM0IsV0FBV3VCLGVBQVgsQ0FBMkJDLE9BQTNCLENBQW1DQyxjQUFuQyxDQUFrREUsR0FBbEQsRUFBUDtBQUNEOztBQUVEQyxXQUFTdEIsTUFBVCxFQUFpQjtBQUNmLFNBQUtlLE9BQUwsQ0FBYUssR0FBYixDQUFpQnBCLE1BQWpCO0FBQ0Q7O0FBR0RPLFNBQU87QUFDTCxXQUNFLEtBQUtSLFdBQUwsQ0FBaUJFLElBQWpCLEdBQ0EsR0FEQSxHQUVBLEtBQUtzQixFQUFMLEVBRkEsR0FHQSxLQUFLQSxFQUFMLEVBSEEsR0FJQSxHQUpBLEdBS0EsS0FBS0EsRUFBTCxFQUxBLEdBTUEsR0FOQSxHQU9BLEtBQUtBLEVBQUwsRUFQQSxHQVFBLEdBUkEsR0FTQSxLQUFLQSxFQUFMLEVBVEEsR0FVQSxHQVZBLEdBV0EsS0FBS0EsRUFBTCxFQVhBLEdBWUEsS0FBS0EsRUFBTCxFQVpBLEdBYUEsS0FBS0EsRUFBTCxFQWJBLEdBY0EsR0FkQSxHQWVBQyxLQUFLQyxHQUFMLEdBQVdDLFFBQVgsQ0FBb0IsRUFBcEIsQ0FoQkY7QUFrQkQ7O0FBRURILE9BQUs7QUFDSCxXQUFPSSxLQUFLQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxLQUFLRSxNQUFMLEVBQUwsSUFBc0IsT0FBakMsRUFDSkgsUUFESSxDQUNLLEVBREwsRUFFSkksU0FGSSxDQUVNLENBRk4sQ0FBUDtBQUdEO0FBdERvRDs7a0JBQWxDakMsUTtBQXlEckJMLFdBQVd1QyxlQUFYLENBQTJCLENBQUNsQyxRQUFELENBQTNCIiwiZmlsZSI6IkVuZHBvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRwb2ludCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICBjb25zdHJ1Y3RvcihfZ3JvdXAsIG5hbWUgPSBcIkVuZHBvaW50XCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgbmFtZTogXCJFbmRwb2ludCBcIiArIHRoaXMuaW5jcmVtZW50TmFtZUlkKCksXG4gICAgICAgIGlkOiB0aGlzLmd1aWQoKSxcbiAgICAgICAgZGF0YVR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiVGVtcGVyYXR1cmVcIiwgXCJIdW1pZGl0eVwiXSksXG4gICAgICAgIGN1cnJlbnRWYWx1ZTogMCxcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDAsXG4gICAgICAgIHVuaXQ6IFwiXCIsXG4gICAgICAgIGluR3JvdXA6IG5ldyBQdHIoX2dyb3VwIHx8IDApXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbmNyZW1lbnROYW1lSWQoKSB7XG4gICAgZ2xvYmFsVHlwZS5vcGVyYXRpb25DZW50ZXIub3B0aW9ucy5lbmRwb2ludE5hbWVJZFxuICAgICAgLnNldChnbG9iYWxUeXBlLm9wZXJhdGlvbkNlbnRlci5vcHRpb25zLmVuZHBvaW50TmFtZUlkLmdldCgpICsgMSk7XG4gICAgcmV0dXJuIGdsb2JhbFR5cGUub3BlcmF0aW9uQ2VudGVyLm9wdGlvbnMuZW5kcG9pbnROYW1lSWQuZ2V0KCk7XG4gIH1cblxuICBzZXRHcm91cChfZ3JvdXApIHtcbiAgICB0aGlzLmluR3JvdXAuc2V0KF9ncm91cCk7XG4gIH1cblxuXG4gIGd1aWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArXG4gICAgICBcIi1cIiArXG4gICAgICB0aGlzLnM0KCkgK1xuICAgICAgdGhpcy5zNCgpICtcbiAgICAgIFwiLVwiICtcbiAgICAgIHRoaXMuczQoKSArXG4gICAgICBcIi1cIiArXG4gICAgICB0aGlzLnM0KCkgK1xuICAgICAgXCItXCIgK1xuICAgICAgdGhpcy5zNCgpICtcbiAgICAgIFwiLVwiICtcbiAgICAgIHRoaXMuczQoKSArXG4gICAgICB0aGlzLnM0KCkgK1xuICAgICAgdGhpcy5zNCgpICtcbiAgICAgIFwiLVwiICtcbiAgICAgIERhdGUubm93KCkudG9TdHJpbmcoMTYpXG4gICAgKTtcbiAgfVxuXG4gIHM0KCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgLnN1YnN0cmluZygxKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbRW5kcG9pbnRdKSJdfQ==