const globalType = typeof window === "undefined" ? global : window;
const spinalCore = require("spinal-core-connectorjs");
const BIMForge = require("spinal-models-bim_forge");
import SpinalBIMObjectOC from "./SpinalBIMObjectOC"
import colors from "../asset/utilities/colors"


let getViewer = function() {
  return globalType.v;
}

export default class SpinalBIMGroupOC extends BIMForge.SpinalBIMGroupForge {
  constructor(_parent, name = "SpinalBIMGroupOC") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: SpinalBIMGroupOC.SpinalBIMGroupOCId++,
        currentValue: 0,
        timeSeries: [],
        parent: _parent,
      });
      this.populateTimeSeries();
      this.display.set(true);
    }
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



  addItems(input) {
    // input is a list of BIMObjects to add
    input.forEach(i => {
      if (this.BIMObjects.indexOf(i) === -1) {
        this.BIMObjects.push(i);
      }
    });
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


}
SpinalBIMGroupOC.SpinalBIMGroupOCId = 0

spinalCore.register_models([SpinalBIMGroupOC])