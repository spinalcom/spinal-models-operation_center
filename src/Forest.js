const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import {
  ConfigurationRoot
} from "./ConfigurationNode"
let getViewer = function() {
  return globalType.v;
}
export default class Forest extends globalType.Model {
  constructor() {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst(),
        id: 0,
        coloringType: 0
      });
    }
  }

  incrementId() {
    this.id.set(this.id.get() + 1);
    return this.id.get();
  }

  addTree(title) {
    var tree = new ConfigurationRoot();
    tree.setTitle(title + " " + this.incrementId().toString());
    this.list.push(tree);
  }

  removeTree(root) {
    this.list.remove(root);
    delete FileSystem._objects[root._server_id];
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
}

spinalCore.register_models([Forest])