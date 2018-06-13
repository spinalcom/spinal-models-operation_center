const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import ConfigurationNode from "./ConfigurationNode"
let getViewer = function() {
  return globalType.v;
}
export default class Forest extends globalType.Model {
  constructor(_options) {
    if (typeof _options === "undefined") _options = new globalType.Model()
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst(),
        childNameId: 0,
        coloringType: 0,
        relOptions: _options
      });
    }
  }

  incrementChildNameId() {
    this.childNameId.set(this.childNameId.get() + 1);
    return this.childNameId.get();
  }

  addTree(title) {
    var tree = new ConfigurationNode(0, "Zone", this.relOptions);
    let id = this.incrementChildNameId()
    tree.setTitle(title + " " + id.toString());

    this.list.push(tree);
  }

  removeTree(root) {
    let i = this.list.indexOf(root);
    if (i >= 0) {
      this.list.splice(i, 1);
      delete FileSystem._objects[root._server_id];
    }
    return i;
  }

  getEquipements() {
    let equipementsArray = [];
    for (let i = 0; i < this.list.length; i++) {
      const tree = this.list[i];
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

spinalCore.register_models([Forest])