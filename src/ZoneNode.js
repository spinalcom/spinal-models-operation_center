const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import SpinalNode from "./SpinalNode"
import Zone from "./Zone";
let getViewer = function() {
  return globalType.v;
};

export default class ZoneNode extends SpinalNode {
  constructor(_parent, _element, _options) {
    super(_parent, _element, _options);
  }

  incrementEquipementNameId() {
    globalType.operationCenter.options.equipementNameId
      .set(globalType.operationCenter.options.equipementNameId.get() + 1);
    return globalType.operationCenter.options.equipementNameId.get();
  }

  createChild(_type, _relZoneAggregatesList, _zoneList) {
    let zone = new Zone(_type)
    if (_type === "Zone")
      zone.setName(
        this.element.name.get() + "-" + this.incrementChildNameId().toString()
      )
    if (_type === "Equipement")
      zone.setName(" Equipement-" + this.incrementEquipementNameId().toString())
    _zoneList.addZone(zone);
    let tree = new ZoneNode(this, zone);
    this.addChild(tree);
    if (!_relZoneAggregatesList.containsByRelatingId(this.element.id.get()))
      _relZoneAggregatesList.addRelZoneAggregates(this.element, [zone])
    else {
      let rel = _relZoneAggregatesList.getByRelatingId(this.element.id.get())
      try {
        rel.addRelatedObjects(zone);
      } catch (error) {
        console.error(e)
      }
    }
  }

  addTreeFromRelation(_zone) {
    var tree = new ZoneNode(this, _zone);
    this.addChild(tree);
  }

  getSpinalNodeByZoneId(_id) {
    if (this.element.id.get() == _id)
      return this
    else {
      for (let index = 0; index < this.children.length; index++) {
        const spinalNode = this.children[index];
        let res = spinalNode.getSpinalNodeByZoneId(_id);
        if (res != null)
          return spinalNode;
      }
    }
  }

  getEquipements() {
    let equipementsArray = [];
    for (let i = 0; i < this.children.length; i++) {
      const equip = this.children[i].element;
      const node = this.children[i];
      // console.log("recur", equip.type.get());
      // console.log(equipementsArray);
      // console.log(equip.isEquipement());
      if (equip.isEquipement())
        equipementsArray = equipementsArray.concat(equip.element);
      else equipementsArray = equipementsArray.concat(node.getEquipements());
    }
    return equipementsArray;
  }

  getAllBIMGroups() {
    let res = [];
    res.push(this.element.BIMGroup);
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      res = res.concat(child.getAllBIMGroups());
    }
    return res;
  }




  getItems() {
    let t = [];
    t = t.concat(this.element.BIMGroup.arrayOfId());
    for (let i = 0; i < this.children.length; i++) {
      const element = this.children[i];
      let childItems = element.getItems();
      for (let i = 0; i < childItems.length; i++) {
        const element = childItems[i];
        if (t.indexOf(element) === -1) t.push(element);
      }
    }
    return t;
  }

  setAllDisplays(_bool) {
    let t = this.getAllBIMGroups();
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.display.set(_bool);
    }
  }

  setAllDatasActive(_bool) {
    let t = this.getAllBIMGroups();
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(_bool);
    }
  }

  updateShowContent(bool) {
    if (typeof bool != "undefined") {
      this.showContent.set(bool);
      return;
    }
    if (this.children.length === 0 && this.element.BIMGroup.BIMObjects.length ===
      0)
      this.showContent.set(false);
  }


}

spinalCore.register_models([ZoneNode]);