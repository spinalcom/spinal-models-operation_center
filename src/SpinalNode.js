const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
let getViewer = function() {
  return globalType.v;
};

export default class SpinalNode extends globalType.Model {
  constructor(_parent, _element, _options) {
    super();
    if (FileSystem._sig_server) {
      if (_parent === 0)
        this.add_attr({
          relOptions: _options
        });
      this.add_attr({
        children: new Lst(),
        childNameId: 0,
        parent: new Ptr(_parent),
        element: _element,
        showContent: false,
      });
    }
  }
  updateShowContent(bool) {
    if (typeof bool != "undefined") {
      this.showContent.set(bool);
      return;
    }
    if (this.children.length === 0)
      this.showContent.set(false);
  }


  incrementChildNameId() {
    this.childNameId.set(this.childNameId.get() + 1);
    return this.childNameId.get();
  }


  createChild() {
    let operationCenterObject = new OperationCenterObject()
    operationCenterObject.setName(
      this.element.name.get() + "-" + this.incrementChildNameId().toString()
    )
    let child = new SpinalNode(this, operationCenterObject);
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

  //   getName() {
  //     return this.name.get();
  //   }

  //   setName(name) {
  //     this.name.set(name);
  //   }

  removeChildren() {
    this.children.set(null);
  }

  isLeaf() {
    if (this.children.length == 0) return true;
    else return false;
  }


  setParent(parent) {
    this.parent.set(parent);
  }

  modParent(parent) {
    if (this.parent.constructor.name === parent.constructor.name)
      this.parent.set(parent);
    else {
      this.mod_attr("parent", parent);
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
      this.getParent(resolve, reject);
    });
  }
  removeParent() {
    this.setParent(0);
  }
  removeChild(_child) {
    for (let index = 0; index < this.children.length; index++) {
      const child = this.children[index];
      if (child.id.get() === _child.id.get())
        this.children.splice(index, 1)
    }
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
      });
    } else {
      try {
        let rootCandidate = await this.getParentAsync();
        return new Promise(async function(resolve, reject) {
          try {
            let root = await rootCandidate.getRoot();
            resolve(root);
          } catch (error) {
            console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

spinalCore.register_models([SpinalNode]);