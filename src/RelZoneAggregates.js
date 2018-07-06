const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import RelOperationCenter from "./RelOperationCenter"

export default class RelZoneAggregates extends RelOperationCenter {
  constructor(_relatingObject, _relatedObjects, name = "RelZoneAggregates") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        relatingObject: _relatingObject,
        relatedObjects: _relatedObjects
      })
    }
  }
  addRelatedObjects(_newRelatedObjects) {
    if (Array.isArray(_newRelatedObjects)) {
      for (let index = 0; index < _newRelatedObjects.length; index++) {
        const element = _newRelatedObjects[index];
        // if (element.constructor.name === "RelZoneAggregates")
        this.relatedObjects.push(element);
      }
    } else {
      // if (_newRelatedObjects.constructor.name === "RelZoneAggregates")
      this.relatedObjects.push(_newRelatedObjects)
    }
  }

  toString(_zoneList) {
    let relatedObjectsIds = "("
    let elementIndex = null;
    for (let index = 0; index < this.relatedObjects.length - 1; index++) {
      const element = this.relatedObjects[index];
      elementIndex = _zoneList.getIndexById(element.id.get()) + 1;
      relatedObjectsIds += "#" + elementIndex + ",";
    }
    let last = this.relatedObjects[this.relatedObjects.length - 1];
    elementIndex = _zoneList.getIndexById(last.id.get()) + 1
    relatedObjectsIds += "#" + elementIndex + ")";

    let relatingId = null;
    if (typeof this.relatingObject.id === "undefined")
      relatingId = "#" + 0
    else {
      elementIndex = _zoneList.getIndexById(this.relatingObject.id.get()) + 1
      relatingId = "#" + elementIndex
    }
    return "RelZoneAggregates(" + this.id.get() + "," + relatingId +
      "," + relatedObjectsIds + ");";
  }
}

spinalCore.register_models([RelZoneAggregates])