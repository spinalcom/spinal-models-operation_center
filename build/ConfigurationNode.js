"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationRoot = exports.ConfigurationNode = exports.BasicConfigurationNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var spinalCore = require("spinal-core-connectorjs");
var globalType = typeof window === "undefined" ? global : window;

var getViewer = function getViewer() {
  return globalType.v;
};

var BasicConfigurationNode = exports.BasicConfigurationNode = function (_globalType$Model) {
  _inherits(BasicConfigurationNode, _globalType$Model);

  function BasicConfigurationNode() {
    _classCallCheck(this, BasicConfigurationNode);

    var _this = _possibleConstructorReturn(this, (BasicConfigurationNode.__proto__ || Object.getPrototypeOf(BasicConfigurationNode)).call(this));

    if (FileSystem._sig_server) {
      _this.add_attr({
        id: 0,
        title: "",
        children: [],
        display: false,
        type: "",
        BIMGroup: new _SpinalBIMGroupOC2.default(_this),
        special: false
      });
    }

    // console.error("constructor", this.BIMGroup)
    return _this;
  }

  _createClass(BasicConfigurationNode, [{
    key: "incrementId",
    value: function incrementId() {
      this.id.set(this.id.get() + 1);
      return this.id.get();
    }
  }, {
    key: "createChild",
    value: function createChild(_type) {
      var child = new ConfigurationNode(this);
      // console.log("type", _type);
      if (_type === "zone") {
        var parentTitle = this.title.get();
        child.setTitle(parentTitle + "-" + this.incrementId().toString());
        child.type.set(_type);
      } else if (_type === "equip") {
        child.setTitle("equip" + "-" + this.incrementId().toString());
        child.type.set(_type);
      }
      this.addChild(child);
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: "addChildren",
    value: function addChildren(children) {
      for (var i = 0; i < children.length; i++) {
        this.children.push(children[i]);
      }
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      return this.children.get();
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.title.get();
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.set(title);
    }
  }, {
    key: "removeChildren",
    value: function removeChildren() {
      this.children.set(null);
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      if (this.children.length == 0) return true;else return false;
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      if (this.parent) return false;else return true;
    }
  }, {
    key: "isEquipement",
    value: function isEquipement() {
      return this.type.get() === "equip";
    }
  }, {
    key: "getEquipements",
    value: function getEquipements() {
      var equipementsArray = [];
      for (var i = 0; i < this.children.length; i++) {
        var equip = this.children[i];
        // console.log("recur", equip.type.get());
        // console.log(equipementsArray);
        // console.log(equip.isEquipement());
        if (equip.isEquipement()) equipementsArray = equipementsArray.concat(equip);else equipementsArray = equipementsArray.concat(equip.getEquipements());
      }
      return equipementsArray;
    }
  }, {
    key: "getAllBIMGroups",
    value: function getAllBIMGroups() {
      var res = [];
      res.push(this.BIMGroup);
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        res = res.concat(child.getAllBIMGroups());
      }
      return res;
    }
  }, {
    key: "test",
    value: function test() {
      console.log(this);
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var t = [];
      t = t.concat(this.BIMGroup.arrayOfId());
      for (var i = 0; i < this.children.length; i++) {
        var element = this.children[i];
        var childItems = element.getItems();
        for (var _i = 0; _i < childItems.length; _i++) {
          var _element = childItems[_i];
          if (t.indexOf(_element) === -1) t.push(_element);
        }
      }
      return t;
    }
  }, {
    key: "setAllDisplays",
    value: function setAllDisplays(_bool) {
      var t = this.getAllBIMGroups();
      for (var index = 0; index < t.length; index++) {
        var element = t[index];
        element.display.set(_bool);
      }
    }
  }]);

  return BasicConfigurationNode;
}(globalType.Model);

var ConfigurationNode = exports.ConfigurationNode = function (_BasicConfigurationNo) {
  _inherits(ConfigurationNode, _BasicConfigurationNo);

  function ConfigurationNode(newParent) {
    _classCallCheck(this, ConfigurationNode);

    var _this2 = _possibleConstructorReturn(this, (ConfigurationNode.__proto__ || Object.getPrototypeOf(ConfigurationNode)).call(this));

    _this2.add_attr({
      parent: newParent
    });
    return _this2;
  }

  _createClass(ConfigurationNode, [{
    key: "setParent",
    value: function setParent(parent) {
      // this.mod_attr("parent", parent);
      this.parent.set(parent);
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this.parent.get();
    }
  }, {
    key: "removeParent",
    value: function removeParent() {
      this.parent.set(null);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.parent.children.remove(this);
      // delete globalType.FileSystem._objects[this._server_id];
    }
  }]);

  return ConfigurationNode;
}(BasicConfigurationNode);

var ConfigurationRoot = exports.ConfigurationRoot = function (_BasicConfigurationNo2) {
  _inherits(ConfigurationRoot, _BasicConfigurationNo2);

  function ConfigurationRoot() {
    _classCallCheck(this, ConfigurationRoot);

    return _possibleConstructorReturn(this, (ConfigurationRoot.__proto__ || Object.getPrototypeOf(ConfigurationRoot)).call(this));
  }

  return ConfigurationRoot;
}(BasicConfigurationNode);

spinalCore.register_models([BasicConfigurationNode, ConfigurationNode, ConfigurationRoot]);