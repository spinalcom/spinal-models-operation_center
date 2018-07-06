"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RelZoneAggregates = require("./RelZoneAggregates");

var _RelZoneAggregates2 = _interopRequireDefault(_RelZoneAggregates);

var _ZoneForest = require("./ZoneForest");

var _ZoneForest2 = _interopRequireDefault(_ZoneForest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
class RelZoneAggregatesList extends globalType.Model {
  constructor(name = "RelZoneAggregatesList") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst()
      });
    }
  }

  addRelZoneAggregates(relatingObject, relatedObjects) {
    let rel = new _RelZoneAggregates2.default(relatingObject, relatedObjects);
    this.list.push(rel);
  }

  contains(_rel) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element === _rel) return true;
    }
    return false;
  }

  containsByRelatingId(_relatingObjectId) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index].relatingObject;
      if (element.get() === 0 && _relatingObjectId === 0) return true;
      if (typeof element.id !== "undefined" && element.id.get() === _relatingObjectId) return true;
    }
    return false;
  }

  getByRelatingId(_relatingObjectId) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element.relatingObject.get() === 0 && _relatingObjectId === 0) return element;
      if (typeof element.relatingObject.id !== "undefined" && element.relatingObject.id.get() === _relatingObjectId) return element;
    }
    throw new Error("no relation with this relating Object" + _relatingObjectId);
  }

  build(_relOptions, _zoneList) {
    let zoneForest = new _ZoneForest2.default();
    zoneForest.setOptions(_relOptions);
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      let relatedObjects = element.relatedObjects;
      if (element.relatingObject.get() === 0) {
        for (let index = 0; index < relatedObjects.length; index++) {
          const element = relatedObjects[index];
          // let zone = _zoneList.getById(element)
          // console.log("element");
          // console.log(element);
          let zone = element;
          if (zone != null) zoneForest.addTreeFromRelation(zone);
        }
      } else {
        let spinalNode = zoneForest.getSpinalNodeByZoneId(element.relatingObject.id.get());
        // let spinalNode = element.relatingObject;
        for (let index = 0; index < relatedObjects.length; index++) {
          const element = relatedObjects[index];
          // console.log("element");
          // console.log(element);

          // let zone1 = _zoneList.getById(element)
          let zone = element;
          if (zone != null) spinalNode.addTreeFromRelation(zone);
        }
      }
    }
    return zoneForest;
  }

  toString(_fromIndex, _zoneList) {
    let s = "";
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      s += "#" + _fromIndex++ + " = " + element.toString(_zoneList) + "\n";
    }
    return s;
  }
}

exports.default = RelZoneAggregatesList;
spinalCore.register_models([RelZoneAggregatesList]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWxab25lQWdncmVnYXRlc0xpc3QuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiUmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0IiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJhZGRfYXR0ciIsImxpc3QiLCJMc3QiLCJhZGRSZWxab25lQWdncmVnYXRlcyIsInJlbGF0aW5nT2JqZWN0IiwicmVsYXRlZE9iamVjdHMiLCJyZWwiLCJSZWxab25lQWdncmVnYXRlcyIsInB1c2giLCJjb250YWlucyIsIl9yZWwiLCJpbmRleCIsImxlbmd0aCIsImVsZW1lbnQiLCJjb250YWluc0J5UmVsYXRpbmdJZCIsIl9yZWxhdGluZ09iamVjdElkIiwiZ2V0IiwiaWQiLCJnZXRCeVJlbGF0aW5nSWQiLCJFcnJvciIsImJ1aWxkIiwiX3JlbE9wdGlvbnMiLCJfem9uZUxpc3QiLCJ6b25lRm9yZXN0IiwiWm9uZUZvcmVzdCIsInNldE9wdGlvbnMiLCJ6b25lIiwiYWRkVHJlZUZyb21SZWxhdGlvbiIsInNwaW5hbE5vZGUiLCJnZXRTcGluYWxOb2RlQnlab25lSWQiLCJ0b1N0cmluZyIsIl9mcm9tSW5kZXgiLCJzIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFIQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7QUFNZSxNQUFNRSxxQkFBTixTQUFvQ0gsV0FBV0ksS0FBL0MsQ0FBcUQ7QUFDbEVDLGNBQVlDLE9BQU8sdUJBQW5CLEVBQTRDO0FBQzFDO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsY0FB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QWpCLEVBQW9CQSxRQUFRTixlQUFlTyxNQUEzQyxFQUFtREQsT0FBbkQsRUFBNEQ7QUFDMUQsZ0JBQU1FLFVBQVVSLGVBQWVNLEtBQWYsQ0FBaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBSWUsT0FBT2IsT0FBWDtBQUNBLGNBQUlhLFFBQVEsSUFBWixFQUNFRSxXQUFXRCxtQkFBWCxDQUErQkQsSUFBL0I7QUFDSDtBQUNGO0FBQ0Y7QUFDRCxXQUFPSCxVQUFQO0FBQ0Q7O0FBRURPLFdBQVNDLFVBQVQsRUFBcUJULFNBQXJCLEVBQWdDO0FBQzlCLFFBQUlVLElBQUksRUFBUjtBQUNBLFNBQUssSUFBSXJCLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVEsS0FBS1YsSUFBTCxDQUFVVyxNQUF0QyxFQUE4Q0QsT0FBOUMsRUFBdUQ7QUFDckQsWUFBTUUsVUFBVSxLQUFLWixJQUFMLENBQVVVLEtBQVYsQ0FBaEI7QUFDQXFCLFdBQUssTUFBTUQsWUFBTixHQUFxQixLQUFyQixHQUE2QmxCLFFBQVFpQixRQUFSLENBQWlCUixTQUFqQixDQUE3QixHQUEyRCxJQUFoRTtBQUNEO0FBQ0QsV0FBT1UsQ0FBUDtBQUNEO0FBN0ZpRTs7a0JBQS9DdEMscUI7QUFnR3JCTCxXQUFXNEMsZUFBWCxDQUEyQixDQUFDdkMscUJBQUQsQ0FBM0IiLCJmaWxlIjoiUmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IFJlbFpvbmVBZ2dyZWdhdGVzIGZyb20gXCIuL1JlbFpvbmVBZ2dyZWdhdGVzXCJcbmltcG9ydCBab25lRm9yZXN0IGZyb20gXCIuL1pvbmVGb3Jlc3RcIlxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0IGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUgPSBcIlJlbFpvbmVBZ2dyZWdhdGVzTGlzdFwiKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGxpc3Q6IG5ldyBMc3QoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBhZGRSZWxab25lQWdncmVnYXRlcyhyZWxhdGluZ09iamVjdCwgcmVsYXRlZE9iamVjdHMpIHtcbiAgICBsZXQgcmVsID0gbmV3IFJlbFpvbmVBZ2dyZWdhdGVzKHJlbGF0aW5nT2JqZWN0LCByZWxhdGVkT2JqZWN0cylcbiAgICB0aGlzLmxpc3QucHVzaChyZWwpO1xuICB9XG5cbiAgY29udGFpbnMoX3JlbCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5saXN0W2luZGV4XTtcbiAgICAgIGlmIChlbGVtZW50ID09PSBfcmVsKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29udGFpbnNCeVJlbGF0aW5nSWQoX3JlbGF0aW5nT2JqZWN0SWQpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdFtpbmRleF0ucmVsYXRpbmdPYmplY3Q7XG4gICAgICBpZiAoZWxlbWVudC5nZXQoKSA9PT0gMCAmJiBfcmVsYXRpbmdPYmplY3RJZCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQuaWQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgZWxlbWVudC5pZC5nZXQoKSA9PT0gX3JlbGF0aW5nT2JqZWN0SWQpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRCeVJlbGF0aW5nSWQoX3JlbGF0aW5nT2JqZWN0SWQpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubGlzdFtpbmRleF07XG4gICAgICBpZiAoZWxlbWVudC5yZWxhdGluZ09iamVjdC5nZXQoKSA9PT0gMCAmJiBfcmVsYXRpbmdPYmplY3RJZCA9PT0gMClcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQucmVsYXRpbmdPYmplY3QuaWQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgZWxlbWVudC5yZWxhdGluZ09iamVjdC5pZC5nZXQoKSA9PT0gX3JlbGF0aW5nT2JqZWN0SWQpXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyByZWxhdGlvbiB3aXRoIHRoaXMgcmVsYXRpbmcgT2JqZWN0XCIgK1xuICAgICAgX3JlbGF0aW5nT2JqZWN0SWQpO1xuXG4gIH1cblxuICBidWlsZChfcmVsT3B0aW9ucywgX3pvbmVMaXN0KSB7XG4gICAgbGV0IHpvbmVGb3Jlc3QgPSBuZXcgWm9uZUZvcmVzdCgpO1xuICAgIHpvbmVGb3Jlc3Quc2V0T3B0aW9ucyhfcmVsT3B0aW9ucyk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RbaW5kZXhdO1xuICAgICAgbGV0IHJlbGF0ZWRPYmplY3RzID0gZWxlbWVudC5yZWxhdGVkT2JqZWN0c1xuICAgICAgaWYgKGVsZW1lbnQucmVsYXRpbmdPYmplY3QuZ2V0KCkgPT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlbGF0ZWRPYmplY3RzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZWxhdGVkT2JqZWN0c1tpbmRleF07XG4gICAgICAgICAgLy8gbGV0IHpvbmUgPSBfem9uZUxpc3QuZ2V0QnlJZChlbGVtZW50KVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZWxlbWVudFwiKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgICBsZXQgem9uZSA9IGVsZW1lbnQ7XG4gICAgICAgICAgaWYgKHpvbmUgIT0gbnVsbClcbiAgICAgICAgICAgIHpvbmVGb3Jlc3QuYWRkVHJlZUZyb21SZWxhdGlvbih6b25lKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNwaW5hbE5vZGUgPSB6b25lRm9yZXN0LmdldFNwaW5hbE5vZGVCeVpvbmVJZChlbGVtZW50LnJlbGF0aW5nT2JqZWN0XG4gICAgICAgICAgLmlkXG4gICAgICAgICAgLmdldCgpKVxuICAgICAgICAvLyBsZXQgc3BpbmFsTm9kZSA9IGVsZW1lbnQucmVsYXRpbmdPYmplY3Q7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZWxhdGVkT2JqZWN0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVsYXRlZE9iamVjdHNbaW5kZXhdO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZWxlbWVudFwiKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbGVtZW50KTtcblxuICAgICAgICAgIC8vIGxldCB6b25lMSA9IF96b25lTGlzdC5nZXRCeUlkKGVsZW1lbnQpXG4gICAgICAgICAgbGV0IHpvbmUgPSBlbGVtZW50O1xuICAgICAgICAgIGlmICh6b25lICE9IG51bGwpXG4gICAgICAgICAgICBzcGluYWxOb2RlLmFkZFRyZWVGcm9tUmVsYXRpb24oem9uZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHpvbmVGb3Jlc3Q7XG4gIH1cblxuICB0b1N0cmluZyhfZnJvbUluZGV4LCBfem9uZUxpc3QpIHtcbiAgICBsZXQgcyA9IFwiXCI7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmxpc3RbaW5kZXhdO1xuICAgICAgcyArPSBcIiNcIiArIF9mcm9tSW5kZXgrKyArIFwiID0gXCIgKyBlbGVtZW50LnRvU3RyaW5nKF96b25lTGlzdCkgKyBcIlxcblwiO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbUmVsWm9uZUFnZ3JlZ2F0ZXNMaXN0XSkiXX0=