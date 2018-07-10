const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import SpinalNode from "./SpinalNode"
import Zone from "./Zone";
import SpinalBIMGroupOC from "./SpinalBIMGroupOC"
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
    this.element.addRelation('relZoneAggregates', zone)
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

  addBIMObject(_objectId) {
    if (typeof this.element['relZoneContains'] === "undefined") {
      let BIMGroup = new SpinalBIMGroupOC();
      BIMGroup.addItem(_objectId)
      this.element.addRelation('relZoneContains', BIMGroup)
    } else {
      this.element['relZoneContains'].load(BIMGroupLst => {
        BIMGroupLst[0].addItem(_objectId)
      });
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


  async getAllBIMGroups() {
    let res = [];
    if (typeof this.element['relZoneContains'] !== "undefined") {
      let BIMGroupLst = await this.promiseLoad(this.element['relZoneContains'])
      res.push(BIMGroupLst[0]);
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        let tmp = await child.getAllBIMGroups()
        // if (tmp !== null)
        res = res.concat(tmp);
      }
    }
    return res;
  }

  promiseLoad(_ptr) {
    return new Promise(resolve => {
      _ptr.load(resolve);
    });
  }




  async getItems() {
    let t = [];
    if (typeof this.element['relZoneContains'] !== "undefined") {
      let BIMGroupLst = await this.promiseLoad(this.element['relZoneContains'])
      t = t.concat(BIMGroupLst[0].arrayOfId());
      for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        let childItems = await element.getItems();
        // if (typeof childItems !== "undefined")
        for (let i = 0; i < childItems.length; i++) {
          const element = childItems[i];
          if (t.indexOf(element) === -1) t.push(element);
        }
      }
    }
    return t;
  }

  async setAllDisplays(_bool) {
    let t = await this.getAllBIMGroups();
    // if (t != null)
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.display.set(_bool);
    }
  }

  async setAllDatasActive(_bool) {
    let t = await this.getAllBIMGroups();
    // if (t != null)
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
    if (typeof this.element['relZoneContains'] !== "undefined")
      this.element['relZoneContains'].load(BIMGroupLst => {
        if (this.children.length === 0 && BIMGroupLst[0].BIMObjects.length ===
          0)
          this.showContent.set(false);
      });

  }


}

spinalCore.register_models([ZoneNode]);