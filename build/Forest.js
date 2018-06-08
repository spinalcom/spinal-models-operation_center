"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConfigurationNode = require("./ConfigurationNode");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var spinalCore = require("spinal-core-connectorjs");
var globalType = typeof window === "undefined" ? global : window;

var getViewer = function getViewer() {
  return globalType.v;
};

var Forest = function (_globalType$Model) {
  _inherits(Forest, _globalType$Model);

  function Forest() {
    _classCallCheck(this, Forest);

    var _this = _possibleConstructorReturn(this, (Forest.__proto__ || Object.getPrototypeOf(Forest)).call(this));

    if (FileSystem._sig_server) {
      _this.add_attr({
        list: new Lst(),
        id: 0,
        coloringType: 0
      });
    }
    return _this;
  }

  _createClass(Forest, [{
    key: "incrementId",
    value: function incrementId() {
      this.id.set(this.id.get() + 1);
      return this.id.get();
    }
  }, {
    key: "addTree",
    value: function addTree(title) {
      var tree = new _ConfigurationNode.ConfigurationRoot();
      tree.setTitle(title + " " + this.incrementId().toString());
      this.list.push(tree);
    }
  }, {
    key: "removeTree",
    value: function removeTree(root) {
      this.list.remove(root);
      delete FileSystem._objects[root._server_id];
    }
  }, {
    key: "getEquipements",
    value: function getEquipements() {
      var equipementsArray = [];
      for (var i = 0; i < this.list.length; i++) {
        var tree = this.list[i];
        equipementsArray = equipementsArray.concat(tree.getEquipements());
      }
      return equipementsArray;
    }
  }, {
    key: "getAllBIMGroups",
    value: function getAllBIMGroups() {
      var res = [];
      for (var i = 0; i < this.list.length; i++) {
        var tree = this.list[i];
        res = res.concat(tree.getAllBIMGroups());
      }
      return res;
    }
  }, {
    key: "getAllBIMObjectsIds",
    value: function getAllBIMObjectsIds() {
      var res = [];
      var BIMGroups = this.getAllBIMGroups();
      for (var index = 0; index < BIMGroups.length; index++) {
        var element = BIMGroups[index];
        res = res.concat(element.arrayOfId());
      }
      return res;
    }
  }, {
    key: "restoreColorMaterial",
    value: function restoreColorMaterial() {
      if (this.coloringType === 1) getViewer().clearThemingColors();else {
        getViewer().restoreColorMaterial(this.getAllBIMObjectsIds());
      }
    }
  }, {
    key: "refreshAllColors",
    value: function refreshAllColors() {
      var BIMGroups = this.getAllBIMGroups();
      for (var index = 0; index < BIMGroups.length; index++) {
        var element = BIMGroups[index];
        if (element.currentValue.get() !== 0 && element.display.get()) {
          element.refreshColors(this.coloringType);
        }
      }
    }
  }]);

  return Forest;
}(globalType.Model);

exports.default = Forest;


spinalCore.register_models([Forest]);