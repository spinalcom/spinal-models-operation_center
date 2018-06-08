"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpinalBIMObjectOC = require("./SpinalBIMObjectOC");

var _SpinalBIMObjectOC2 = _interopRequireDefault(_SpinalBIMObjectOC);

var _colors = require("../assets/utilities/colors");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalType = typeof window === "undefined" ? global : window;
var spinalCore = require("spinal-core-connectorjs");
var BIMForge = require("spinal-models-bim_forge");


var getViewer = function getViewer() {
  return globalType.v;
};

var SpinalBIMGroupOC = function (_BIMForge$SpinalBIMGr) {
  _inherits(SpinalBIMGroupOC, _BIMForge$SpinalBIMGr);

  function SpinalBIMGroupOC(_parent) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "SpinalBIMGroupOC";

    _classCallCheck(this, SpinalBIMGroupOC);

    var _this = _possibleConstructorReturn(this, (SpinalBIMGroupOC.__proto__ || Object.getPrototypeOf(SpinalBIMGroupOC)).call(this));

    if (FileSystem._sig_server) {
      _this.add_attr({
        id: SpinalBIMGroupOC.SpinalBIMGroupOCId++,
        currentValue: 0,
        timeSeries: [],
        parent: _parent
      });
      _this.populateTimeSeries();
      _this.display.set(true);
    }
    return _this;
  }

  _createClass(SpinalBIMGroupOC, [{
    key: "populateTimeSeries",
    value: function populateTimeSeries() {
      var max = 30;
      if (this.timeSeries.length >= max) {
        this.timeSeries.shift();
        this.timeSeries.push(this.currentValue.get());
      } else {
        this.timeSeries.push(this.currentValue.get());
      }
    }
  }, {
    key: "refreshColors",
    value: function refreshColors(_coloringType) {
      var newcolor = _colors2.default.colorByValue(this.currentValue.get(), 40, 90);
      this.color.set(newcolor);
      var dbids = this.arrayOfId();
      if (_coloringType === 1) {
        var opacity = 0.5;
        var colorRGB = _colors2.default.toRGB(this.color.get(), opacity);
        for (var index = 0; index < this.BIMObjects.length; index++) {
          getViewer().setThemingColor(this.BIMObjects[index].id.get(), colorRGB);
        }
      } else {
        getViewer().setColorMaterial(dbids, this.color.get());
      }
      return dbids;
    }
  }, {
    key: "contains",
    value: function contains(itemId) {
      return this.arrayOfId().indexOf(itemId) !== -1;
    }
  }, {
    key: "addItem",
    value: function addItem(itemId) {
      var _this2 = this;

      if (!this.contains(itemId)) {
        var newBIMObject = new _SpinalBIMObjectOC2.default(itemId, this.id.get());
        newBIMObject.fillInfo().then(function () {
          _this2.BIMObjects.push(newBIMObject);
        });
      }
    }
  }, {
    key: "addItems",
    value: function addItems(input) {
      var _this3 = this;

      // input is a list of BIMObjects to add
      input.forEach(function (i) {
        if (_this3.BIMObjects.indexOf(i) === -1) {
          _this3.BIMObjects.push(i);
        }
      });
    }
  }, {
    key: "removeItems",
    value: function removeItems(input) {
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
  }, {
    key: "arrayOfId",
    value: function arrayOfId() {
      var t = [];
      for (var i = 0; i < this.BIMObjects.length; i++) {
        var item = this.BIMObjects[i];
        t.push(item.id.get());
      }
      return t;
    }
  }, {
    key: "isolate",
    value: function isolate() {
      getViewer().isolateById(this.arrayOfId());
    }
  }]);

  return SpinalBIMGroupOC;
}(BIMForge.SpinalBIMGroupForge);

exports.default = SpinalBIMGroupOC;

SpinalBIMGroupOC.SpinalBIMGroupOCId = 0;

spinalCore.register_models([SpinalBIMGroupOC]);