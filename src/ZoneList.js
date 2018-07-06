const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class ZoneList extends globalType.Model {
  constructor(name = "ZoneList") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        list: new Lst()
      })
    }
  }

  addZone(_zone) {
    this.list.push(_zone)
  }

  getById(_id) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element.id.get() === _id)
        return element
    }
    return null;
  }

  toString(fromIndex) {
    let s = "";
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      s += "#" + fromIndex++ + " = " + element.toString() + "\n";
    }
    return s;
  }

  getIndexById(id) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element.id.get() === id)
        return index;
    }
    return null;
  }

}

spinalCore.register_models([ZoneList])