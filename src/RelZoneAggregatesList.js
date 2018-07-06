const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import RelZoneAggregates from "./RelZoneAggregates"
import ZoneForest from "./ZoneForest"



export default class RelZoneAggregatesList extends globalType.Model {
  constructor(name = "RelZoneAggregatesList") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst()
      })
    }
  }

  addRelZoneAggregates(relatingObject, relatedObjects) {
    let rel = new RelZoneAggregates(relatingObject, relatedObjects)
    this.list.push(rel);
  }

  contains(_rel) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element === _rel)
        return true;
    }
    return false;
  }

  containsByRelatingId(_relatingObjectId) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index].relatingObject;
      if (element.get() === 0 && _relatingObjectId === 0)
        return true;
      if (typeof element.id !== "undefined" &&
        element.id.get() === _relatingObjectId)
        return true;
    }
    return false;
  }

  getByRelatingId(_relatingObjectId) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element.relatingObject.get() === 0 && _relatingObjectId === 0)
        return element;
      if (typeof element.relatingObject.id !== "undefined" &&
        element.relatingObject.id.get() === _relatingObjectId)
        return element;
    }
    throw new Error("no relation with this relating Object" +
      _relatingObjectId);

  }

  build(_relOptions, _zoneList) {
    let zoneForest = new ZoneForest();
    zoneForest.setOptions(_relOptions);
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      let relatedObjects = element.relatedObjects
      if (element.relatingObject.get() === 0) {
        for (let index = 0; index < relatedObjects.length; index++) {
          const element = relatedObjects[index];
          // let zone = _zoneList.getById(element)
          // console.log("element");
          // console.log(element);
          let zone = element;
          if (zone != null)
            zoneForest.addTreeFromRelation(zone);
        }
      } else {
        let spinalNode = zoneForest.getSpinalNodeByZoneId(element.relatingObject
          .id
          .get())
        // let spinalNode = element.relatingObject;
        for (let index = 0; index < relatedObjects.length; index++) {
          const element = relatedObjects[index];
          // console.log("element");
          // console.log(element);

          // let zone1 = _zoneList.getById(element)
          let zone = element;
          if (zone != null)
            spinalNode.addTreeFromRelation(zone);
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

spinalCore.register_models([RelZoneAggregatesList])