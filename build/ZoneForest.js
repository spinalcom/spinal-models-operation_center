"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ZoneNode = require("./ZoneNode");

var _ZoneNode2 = _interopRequireDefault(_ZoneNode);

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _Zone = require("./Zone");

var _Zone2 = _interopRequireDefault(_Zone);

var _RelZoneAggregates = require("./RelZoneAggregates");

var _RelZoneAggregates2 = _interopRequireDefault(_RelZoneAggregates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

let getViewer = function () {
  return globalType.v;
};
class ZoneForest extends _Forest2.default {
  constructor(_options) {
    super(_options);
    if (FileSystem._sig_server) {
      this.add_attr({
        coloringType: 0
      });
    }
  }

  addTree(_type, _relZoneAggregatesList, _zoneList) {
    let zone = new _Zone2.default(_type);
    zone.setName(_type + " " + this.incrementChildNameId().toString());
    _zoneList.addZone(zone);
    var tree = new _ZoneNode2.default(0, zone, this.relOptions);
    this.list.push(tree);
    if (!_relZoneAggregatesList.containsByRelatingId(0)) _relZoneAggregatesList.addRelZoneAggregates(0, [zone]);else {
      let rel = _relZoneAggregatesList.getByRelatingId(0);
      try {
        rel.addRelatedObjects(zone);
      } catch (error) {
        console.error('adding rel to _relZoneAggregatesList ');
      }
    }
  }

  addTreeFromRelation(_zone) {
    var tree = new _ZoneNode2.default(0, _zone, this.relOptions);
    this.list.push(tree);
  }

  getSpinalNodeByZoneId(_id) {
    for (let index = 0; index < this.list.length; index++) {
      const spinalNode = this.list[index];
      let res = spinalNode.getSpinalNodeByZoneId(_id);
      if (res != null) return spinalNode;
    }
  }

  getEquipements() {
    let equipementsArray = [];
    for (let i = 0; i < this.list.length; i++) {
      const tree = this.list[i].element;
      equipementsArray = equipementsArray.concat(tree.getEquipements());
    }
    return equipementsArray;
  }

  getAllBIMGroups() {
    let res = [];
    for (let i = 0; i < this.list.length; i++) {
      const tree = this.list[i];
      res = res.concat(tree.getAllBIMGroups());
    }
    return res;
  }

  getAllBIMObjectsIds() {
    let res = [];
    let BIMGroups = this.getAllBIMGroups();
    for (let index = 0; index < BIMGroups.length; index++) {
      const element = BIMGroups[index];
      res = res.concat(element.arrayOfId());
    }
    return res;
  }

  restoreColorMaterial() {
    if (this.coloringType === 1) getViewer().clearThemingColors();else {
      getViewer().restoreColorMaterial(this.getAllBIMObjectsIds());
    }
  }

  refreshAllColors() {
    let BIMGroups = this.getAllBIMGroups();
    for (let index = 0; index < BIMGroups.length; index++) {
      const element = BIMGroups[index];
      if (element.currentValue.get() !== 0 && element.display.get()) {
        element.refreshColors(this.coloringType);
      }
    }
  }

  activateAllBIMGroups() {
    let t = this.getAllBIMGroups();
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(true);
    }
  }

  disactivateAllBIMGroups() {
    let t = this.getAllBIMGroups();
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(false);
    }
  }

}

exports.default = ZoneForest;
spinalCore.register_models([ZoneForest]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ab25lRm9yZXN0LmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsImdldFZpZXdlciIsInYiLCJab25lRm9yZXN0IiwiRm9yZXN0IiwiY29uc3RydWN0b3IiLCJfb3B0aW9ucyIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiY29sb3JpbmdUeXBlIiwiYWRkVHJlZSIsIl90eXBlIiwiX3JlbFpvbmVBZ2dyZWdhdGVzTGlzdCIsIl96b25lTGlzdCIsInpvbmUiLCJab25lIiwic2V0TmFtZSIsImluY3JlbWVudENoaWxkTmFtZUlkIiwidG9TdHJpbmciLCJhZGRab25lIiwidHJlZSIsIlpvbmVOb2RlIiwicmVsT3B0aW9ucyIsImxpc3QiLCJwdXNoIiwiY29udGFpbnNCeVJlbGF0aW5nSWQiLCJhZGRSZWxab25lQWdncmVnYXRlcyIsInJlbCIsImdldEJ5UmVsYXRpbmdJZCIsImFkZFJlbGF0ZWRPYmplY3RzIiwiZXJyb3IiLCJjb25zb2xlIiwiYWRkVHJlZUZyb21SZWxhdGlvbiIsIl96b25lIiwiZ2V0U3BpbmFsTm9kZUJ5Wm9uZUlkIiwiX2lkIiwiaW5kZXgiLCJsZW5ndGgiLCJzcGluYWxOb2RlIiwicmVzIiwiZ2V0RXF1aXBlbWVudHMiLCJlcXVpcGVtZW50c0FycmF5IiwiaSIsImVsZW1lbnQiLCJjb25jYXQiLCJnZXRBbGxCSU1Hcm91cHMiLCJnZXRBbGxCSU1PYmplY3RzSWRzIiwiQklNR3JvdXBzIiwiYXJyYXlPZklkIiwicmVzdG9yZUNvbG9yTWF0ZXJpYWwiLCJjbGVhclRoZW1pbmdDb2xvcnMiLCJyZWZyZXNoQWxsQ29sb3JzIiwiY3VycmVudFZhbHVlIiwiZ2V0IiwiZGlzcGxheSIsInJlZnJlc2hDb2xvcnMiLCJhY3RpdmF0ZUFsbEJJTUdyb3VwcyIsInQiLCJhY3RpdmUiLCJzZXQiLCJkaXNhY3RpdmF0ZUFsbEJJTUdyb3VwcyIs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QjtBQUNBTyxjQUFRZSxNQUFSLENBQWVDLEdBQWYsQ0FBbUIsSUFBbkI7QUFDRDtBQUNGOztBQUVEQyw0QkFBMEI7QUFDeEIsUUFBSUgsSUFBSSxLQUFLWixlQUFMLEVBQVI7QUFDQSxTQUFLLElBQUlULFFBQVEsQ0FBakIsRUFBb0JBLFFBQVFxQixFQUFFcEIsTUFBOUIsRUFBc0NELE9BQXRDLEVBQStDO0FBQzdDLFlBQU1PLFVBQVVjLEVBQUVyQixLQUFGLENBQWhCO0FBQ0FPLGNBQVFlLE1BQVIsQ0FBZUMsR0FBZixDQUFtQixLQUFuQjtBQUNEO0FBQ0Y7O0FBeEc0Qzs7a0JBQTFCekQsVTtBQTRHckJQLFdBQVdrRSxlQUFYLENBQTJCLENBQUMzRCxVQUFELENBQTNCIiwiZmlsZSI6IlpvbmVGb3Jlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5pbXBvcnQgWm9uZU5vZGUgZnJvbSBcIi4vWm9uZU5vZGVcIlxuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIlxuaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiXG5pbXBvcnQgUmVsWm9uZUFnZ3JlZ2F0ZXMgZnJvbSBcIi4vUmVsWm9uZUFnZ3JlZ2F0ZXNcIlxubGV0IGdldFZpZXdlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2xvYmFsVHlwZS52O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZUZvcmVzdCBleHRlbmRzIEZvcmVzdCB7XG4gIGNvbnN0cnVjdG9yKF9vcHRpb25zKSB7XG4gICAgc3VwZXIoX29wdGlvbnMpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgY29sb3JpbmdUeXBlOiAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICBhZGRUcmVlKF90eXBlLCBfcmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0LCBfem9uZUxpc3QpIHtcbiAgICBsZXQgem9uZSA9IG5ldyBab25lKF90eXBlKVxuICAgIHpvbmUuc2V0TmFtZShfdHlwZSArIFwiIFwiICsgdGhpcy5pbmNyZW1lbnRDaGlsZE5hbWVJZCgpLnRvU3RyaW5nKCkpO1xuICAgIF96b25lTGlzdC5hZGRab25lKHpvbmUpO1xuICAgIHZhciB0cmVlID0gbmV3IFpvbmVOb2RlKDAsIHpvbmUsIHRoaXMucmVsT3B0aW9ucyk7XG4gICAgdGhpcy5saXN0LnB1c2godHJlZSk7XG4gICAgaWYgKCFfcmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0LmNvbnRhaW5zQnlSZWxhdGluZ0lkKDApKVxuICAgICAgX3JlbFpvbmVBZ2dyZWdhdGVzTGlzdC5hZGRSZWxab25lQWdncmVnYXRlcygwLCBbem9uZV0pXG4gICAgZWxzZSB7XG4gICAgICBsZXQgcmVsID0gX3JlbFpvbmVBZ2dyZWdhdGVzTGlzdC5nZXRCeVJlbGF0aW5nSWQoMClcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlbC5hZGRSZWxhdGVkT2JqZWN0cyh6b25lKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgJ2FkZGluZyByZWwgdG8gX3JlbFpvbmVBZ2dyZWdhdGVzTGlzdCAnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgYWRkVHJlZUZyb21SZWxhdGlvbihfem9uZSkge1xuICAgIHZhciB0cmVlID0gbmV3IFpvbmVOb2RlKDAsIF96b25lLCB0aGlzLnJlbE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5wdXNoKHRyZWUpO1xuICB9XG5cbiAgZ2V0U3BpbmFsTm9kZUJ5Wm9uZUlkKF9pZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBzcGluYWxOb2RlID0gdGhpcy5saXN0W2luZGV4XTtcbiAgICAgIGxldCByZXMgPSBzcGluYWxOb2RlLmdldFNwaW5hbE5vZGVCeVpvbmVJZChfaWQpO1xuICAgICAgaWYgKHJlcyAhPSBudWxsKVxuICAgICAgICByZXR1cm4gc3BpbmFsTm9kZTtcbiAgICB9XG4gIH1cblxuICBnZXRFcXVpcGVtZW50cygpIHtcbiAgICBsZXQgZXF1aXBlbWVudHNBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0cmVlID0gdGhpcy5saXN0W2ldLmVsZW1lbnQ7XG4gICAgICBlcXVpcGVtZW50c0FycmF5ID0gZXF1aXBlbWVudHNBcnJheS5jb25jYXQodHJlZS5nZXRFcXVpcGVtZW50cygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVxdWlwZW1lbnRzQXJyYXk7XG4gIH1cblxuICBnZXRBbGxCSU1Hcm91cHMoKSB7XG4gICAgbGV0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0cmVlID0gdGhpcy5saXN0W2ldO1xuICAgICAgcmVzID0gcmVzLmNvbmNhdCh0cmVlLmdldEFsbEJJTUdyb3VwcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldEFsbEJJTU9iamVjdHNJZHMoKSB7XG4gICAgbGV0IHJlcyA9IFtdXG4gICAgbGV0IEJJTUdyb3VwcyA9IHRoaXMuZ2V0QWxsQklNR3JvdXBzKCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJJTUdyb3Vwcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBCSU1Hcm91cHNbaW5kZXhdO1xuICAgICAgcmVzID0gcmVzLmNvbmNhdChlbGVtZW50LmFycmF5T2ZJZCgpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcmVzdG9yZUNvbG9yTWF0ZXJpYWwoKSB7XG4gICAgaWYgKHRoaXMuY29sb3JpbmdUeXBlID09PSAxKSBnZXRWaWV3ZXIoKS5jbGVhclRoZW1pbmdDb2xvcnMoKVxuICAgIGVsc2Uge1xuICAgICAgZ2V0Vmlld2VyKCkucmVzdG9yZUNvbG9yTWF0ZXJpYWwodGhpcy5nZXRBbGxCSU1PYmplY3RzSWRzKCkpXG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaEFsbENvbG9ycygpIHtcbiAgICBsZXQgQklNR3JvdXBzID0gdGhpcy5nZXRBbGxCSU1Hcm91cHMoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQklNR3JvdXBzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IEJJTUdyb3Vwc1tpbmRleF07XG4gICAgICBpZiAoZWxlbWVudC5jdXJyZW50VmFsdWUuZ2V0KCkgIT09IDAgJiYgZWxlbWVudC5kaXNwbGF5LmdldCgpKSB7XG4gICAgICAgIGVsZW1lbnQucmVmcmVzaENvbG9ycyh0aGlzLmNvbG9yaW5nVHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVBbGxCSU1Hcm91cHMoKSB7XG4gICAgbGV0IHQgPSB0aGlzLmdldEFsbEJJTUdyb3VwcygpXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdFtpbmRleF07XG4gICAgICBlbGVtZW50LmFjdGl2ZS5zZXQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWN0aXZhdGVBbGxCSU1Hcm91cHMoKSB7XG4gICAgbGV0IHQgPSB0aGlzLmdldEFsbEJJTUdyb3VwcygpXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdFtpbmRleF07XG4gICAgICBlbGVtZW50LmFjdGl2ZS5zZXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtab25lRm9yZXN0XSkiXX0=