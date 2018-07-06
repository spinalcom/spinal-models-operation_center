const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import ZoneNode from "./ZoneNode"
import Forest from "./Forest"
import Zone from "./Zone"
import RelZoneAggregates from "./RelZoneAggregates"
let getViewer = function() {
  return globalType.v;
}
export default class ZoneForest extends Forest {
  constructor(_options) {
    super(_options);
    if (FileSystem._sig_server) {
      this.add_attr({
        coloringType: 0,
      });
    }
  }


  addTree(_type, _relZoneAggregatesList, _zoneList) {
    let zone = new Zone(_type)
    zone.setName(_type + " " + this.incrementChildNameId().toString());
    _zoneList.addZone(zone);
    var tree = new ZoneNode(0, zone, this.relOptions);
    this.list.push(tree);
    if (!_relZoneAggregatesList.containsByRelatingId(0))
      _relZoneAggregatesList.addRelZoneAggregates(0, [zone])
    else {
      let rel = _relZoneAggregatesList.getByRelatingId(0)
      try {
        rel.addRelatedObjects(zone);
      } catch (error) {
        console.error(
          'adding rel to _relZoneAggregatesList ')
      }
    }
  }


  addTreeFromRelation(_zone) {
    var tree = new ZoneNode(0, _zone, this.relOptions);
    this.list.push(tree);
  }

  getSpinalNodeByZoneId(_id) {
    for (let index = 0; index < this.list.length; index++) {
      const spinalNode = this.list[index];
      let res = spinalNode.getSpinalNodeByZoneId(_id);
      if (res != null)
        return spinalNode;
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
    let res = []
    let BIMGroups = this.getAllBIMGroups();
    for (let index = 0; index < BIMGroups.length; index++) {
      const element = BIMGroups[index];
      res = res.concat(element.arrayOfId())
    }
    return res;
  }

  restoreColorMaterial() {
    if (this.coloringType === 1) getViewer().clearThemingColors()
    else {
      getViewer().restoreColorMaterial(this.getAllBIMObjectsIds())
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
    let t = this.getAllBIMGroups()
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(true);
    }
  }

  disactivateAllBIMGroups() {
    let t = this.getAllBIMGroups()
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(false);
    }
  }

}

spinalCore.register_models([ZoneForest])