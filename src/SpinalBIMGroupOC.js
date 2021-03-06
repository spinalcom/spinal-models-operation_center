const globalType = typeof window === "undefined" ? global : window;
const spinalCore = require("spinal-core-connectorjs");
const BIMForge = require("spinal-models-bim_forge");
import SpinalBIMObjectOC from "./SpinalBIMObjectOC"
import colors from "../assets/utilities/colors"


let getViewer = function() {
  return globalType.v;
}

export default class SpinalBIMGroupOC extends BIMForge.SpinalBIMGroupForge {
  constructor(name = "SpinalBIMGroupOC") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: this.guid(),
        currentValue: 0,
        timeSeries: [],
        active: false
      });
      this.display.set(true);
    }
  }

  guid() {
    return (
      this.constructor.name +
      "-" +
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
      this.s4() +
      "-" +
      Date.now().toString(16)
    );
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  populateTimeSeries() {
    let max = 30;
    if (this.timeSeries.length >= max) {
      this.timeSeries.shift();
      this.timeSeries.push(this.currentValue.get())

    } else {
      this.timeSeries.push(this.currentValue.get())
    }
  }

  refreshColors(_coloringType) {
    let newcolor = colors.colorByValue(this.currentValue.get(), 40, 90)
    this.color.set(newcolor);
    let dbids = this.arrayOfId();
    if (_coloringType === 1) {
      let opacity = 0.5
      let colorRGB = colors.toRGB(this.color.get(), opacity)
      for (let index = 0; index < this.BIMObjects.length; index++) {
        getViewer().setThemingColor(this.BIMObjects[index].id.get(),
          colorRGB);
      }
    } else {
      getViewer().setColorMaterial(dbids, this.color.get());
    }
    return dbids;
  }

  contains(itemId) {
    return this.arrayOfId().indexOf(itemId) !== -1;
  }



  addItem(itemId) {
    if (!this.contains(itemId)) {
      let newBIMObject = new SpinalBIMObjectOC(itemId, this.id.get());
      newBIMObject.fillInfo().then(() => {
        this.BIMObjects.push(newBIMObject);
      });
    }
  }



  addItems(input, index) {
    // input is a list of BIMObjects to add
    if (typeof index === "undefined") {
      input.forEach(i => {
        if (this.BIMObjects.indexOf(i) === -1) {
          this.BIMObjects.push(i);
        }
      });
    } else {
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if (!this.BIMObjects.contains(element)) {
          this.BIMObjects.insert(index + i, [element]);
        }
      }
    }
  }

  removeItems(input) {
    // input is a list of BIMObjects to be removed
    var removedItems = [];
    for (var i = 0; i < input.length; ++i) {
      var index = this.BIMObjects.indexOf(input[i]);
      if (index !== -1) {
        removedItems.push(this.BIMObjects[index].get());
        this.BIMObjects.splice(index, 1);
      }
    }
    return removedItems;
  }

  removeItemByIndex(index) {
    let toBeRemove = this.BIMObjects[index]
    this.BIMObjects.splice(index, 1);
    return toBeRemove;
  }

  arrayOfId() {
    let t = [];
    for (let i = 0; i < this.BIMObjects.length; i++) {
      const item = this.BIMObjects[i];
      t.push(item.id.get());
    }
    return t;
  }

  isolate() {
    getViewer().isolateById(this.arrayOfId());
  }

  setCurrentValue(_value) {
    this.currentValue.set(_value)
    this.populateTimeSeries();
  }


}

spinalCore.register_models([SpinalBIMGroupOC])