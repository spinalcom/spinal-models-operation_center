const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import SpinalBIMGroupOC from "./SpinalBIMGroupOC";
let getViewer = function() {
  return globalType.v;
};

export default class ConfigurationNode extends globalType.Model {
  constructor(_newParent, _type, _options) {
    super();
    if (FileSystem._sig_server) {
      if (_newParent === 0)
        this.add_attr({
          relOptions: _options
        });
      this.add_attr({
        id: this.guid(),
        title: "",
        children: new Lst(),
        showContent: false,
        BIMGroup: new SpinalBIMGroupOC(this),
        childNameId: 0,
        parent: new Ptr(_newParent),
        type: new Choice(0, ["Zone", "Equipement"])
      });
      this.type.set(_type || "Zone");
    }
  }

  //commun for all types
  incrementChildNameId() {
    this.childNameId.set(this.childNameId.get() + 1);
    return this.childNameId.get();
  }

  guid() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  createChild(_type) {
    let child = new ConfigurationNode(this, _type);

    // console.log("type", _type);
    if (_type === "Zone") {
      let parentTitle = this.title.get();
      child.setTitle(
        parentTitle + "-" + this.incrementChildNameId().toString()
      );
    } else if (_type === "Equipement") {
      child.setTitle(
        "Equipement" + "-" + this.incrementChildNameId().toString()
      );
    }
    this.addChild(child);
  }

  addChild(child, index) {
    if (typeof index == "undefined") this.children.push(child);
    // else
    //   this.children.push()
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

  isEquipement() {
    return this.type.get() === "Equipement";
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
    console.log(this);
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

  setAllDatasActive(_bool) {
    let t = this.getAllBIMGroups();
    for (let index = 0; index < t.length; index++) {
      const element = t[index];
      element.active.set(_bool);
    }
  }

  setParent(parent) {
    this.parent.set(parent);
  }

  modParent(parent) {
    if (this.parent.constructor.name === parent.constructor.name)
      this.parent.set(parent);
    else {
      this.mod_attr("parent", parent);
      // this.mod_attr('parent', parent);
      // console.log(this.parent.constructor.name);
    }
  }

  getParent(cb, rej) {
    this.parent.load(parent => {
      if (typeof cb != "undefined") cb(parent);
      else rej(new Error("Parent"))
    });
  }
  getParentAsync() {
    return new Promise((resolve, reject) => {
      // console.log(this.parent);
      this.getParent(resolve, reject);
    });
  }
  removeParent() {
    // this.modParent(new globalType.Ptr(0));
    this.setParent(0);
  }

  remove() {
    if (!this.isRoot()) {
      this.getParent(parent => {
        parent.children.remove(this);
        delete globalType.FileSystem._objects[this._server_id];
      });
    }
  }

  isRoot() {
    return (
      this.parent.constructor.name === "Ptr" && this.parent.data.value ===
      0
    );
  }

  async getRoot() {
    if (this.isRoot()) {
      return new Promise((resolve, reject) => {
        resolve(this);
        // reject(new Error("fail"));
      });
    } else {
      try {
        let rootCandidate = await this.getParentAsync();
        return new Promise(async function(resolve, reject) {
          try {
            // console.log(rootCandidate.title.get());
            let root = await rootCandidate.getRoot();
            resolve(root);
          } catch (error) {
            console.error(error);
            reject(new Error("Error"));
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  updateShowContent(bool) {
    if (typeof bool != "undefined") {
      this.showContent.set(bool);
      return;
    }
    if (this.children.length === 0 && this.BIMGroup.BIMObjects.length ===
      0)
      this.showContent.set(false);
  }
}

spinalCore.register_models([ConfigurationNode]);