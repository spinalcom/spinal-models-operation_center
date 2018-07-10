const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

export default class OperationCenterObject extends globalType.Model {
  constructor(_id, name = "OperationCenterObject") {
    super();
    let _name = typeof _id === "undefinded" ? "" : this.constructor.name +
      _id
    if (FileSystem._sig_server) {
      this.add_attr({
        name: _name,
        id: this.guid(),
      });
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

  setName(_name) {
    this.name.set(_name)
  }

  // relationExists(_relation) {
  //   for (let index = 0; index < this.attr_attribute_names.length; index++) {
  //     const attribute = this.attr_attribute_names[index];
  //     if (attribute === _relation)
  //     return 
  //   }
  // }

  addRelation(_relation, _elements) {
    let attributeIndex = this._attribute_names.indexOf(_relation)
    if (attributeIndex === -1) {
      this.add_attr({
        [_relation]: new Ptr(new Lst())
      })
    }
    if (Array.isArray(_elements))
      for (let index = 0; index < _elements.length; index++) {
        const element = _elements[index];
        this[_relation].load(rel => {
          rel.push(element)
        })
      }
    else
      this[_relation].load(rel => {
        rel.push(_elements)
      })
  }
}

spinalCore.register_models([OperationCenterObject])