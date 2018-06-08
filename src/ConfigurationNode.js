const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import SpinalBIMGroupOC from "./SpinalBIMGroupOC"
let getViewer = function() {
  return globalType.v;
}

export class BasicConfigurationNode extends globalType.Model {
  constructor() {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: 0,
        title: "",
        children: [],
        display: false,
        type: "",
        BIMGroup: new SpinalBIMGroupOC(this),
        special: false
      });
    }

    // console.error("constructor", this.BIMGroup)
  }

  incrementId() {
    this.id.set(this.id.get() + 1);
    return this.id.get();
  }

  createChild(_type) {
    let child = new ConfigurationNode(this);
    // console.log("type", _type);
    if (_type === "zone") {
      let parentTitle = this.title.get();
      child.setTitle(parentTitle + "-" + this.incrementId().toString());
      child.type.set(_type);
    } else if (_type === "equip") {
      child.setTitle("equip" + "-" + this.incrementId().toString());
      child.type.set(_type);
    }
    this.addChild(child);
  }

  addChild(child) {
    this.children.push(child);
    return child;
  }

  addChildren(children) {
    for (let i = 0; i < children.length; i++) {
      this.children.push(children[i]);
    }
  }

  getChildren() {
    return this.children.get();
  }

  getTitle() {
    return this.title.get();
  }

  setTitle(title) {
    this.title.set(title);
  }

  removeChildren() {
    this.children.set(null);
  }

  isLeaf() {
    if (this.children.length == 0) return true;
    else return false;
  }

  isRoot() {
    if (this.parent) return false;
    else return true;
  }

  isEquipement() {
    return this.type.get() === "equip";
  }

  getEquipements() {
    let equipementsArray = [];
    for (let i = 0; i < this.children.length; i++) {
      const equip = this.children[i];
      // console.log("recur", equip.type.get());
      // console.log(equipementsArray);
      // console.log(equip.isEquipement());
      if (equip.isEquipement())
        equipementsArray = equipementsArray.concat(equip);
      else equipementsArray = equipementsArray.concat(equip.getEquipements());
    }
    return equipementsArray;
  }

  getAllBIMGroups() {
    let res = [];
    res.push(this.BIMGroup);
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      res = res.concat(child.getAllBIMGroups());
    }
    return res;
  }

  test() {
    console.log(this)
  }

  getItems() {
    let t = [];
    t = t.concat(this.BIMGroup.arrayOfId());
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
}


export class ConfigurationNode extends BasicConfigurationNode {
  constructor(newParent) {
    super();
    this.add_attr({
      parent: newParent
    });
  }

  setParent(parent) {
    // this.mod_attr("parent", parent);
    this.parent.set(parent);
  }

  getParent() {
    return this.parent.get();
  }

  removeParent() {
    this.parent.set(null);
  }

  remove() {
    this.parent.children.remove(this);
    // delete globalType.FileSystem._objects[this._server_id];
  }
}

export class ConfigurationRoot extends BasicConfigurationNode {
  constructor() {
    super();
  }
}

spinalCore.register_models([
  BasicConfigurationNode,
  ConfigurationNode,
  ConfigurationRoot
])