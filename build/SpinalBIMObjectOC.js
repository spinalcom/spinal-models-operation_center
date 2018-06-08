"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalType = typeof window === "undefined" ? global : window;
var spinalCore = require("spinal-core-connectorjs");
var BIMForge = require("spinal-models-bim_forge");

var getViewer = function getViewer() {
  return globalType.v;
};

var SpinalBIMObjectOC = function (_BIMForge$SpinalBIMOb) {
  _inherits(SpinalBIMObjectOC, _BIMForge$SpinalBIMOb);

  function SpinalBIMObjectOC(itemId, groupId) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "SpinalBIMObjectOC";

    _classCallCheck(this, SpinalBIMObjectOC);

    var _this = _possibleConstructorReturn(this, (SpinalBIMObjectOC.__proto__ || Object.getPrototypeOf(SpinalBIMObjectOC)).call(this));

    if (FileSystem._sig_server) {
      _this.add_attr({
        groupId: groupId
      });
      _this.id.set(itemId);
      _this.display.set(true);
    }
    return _this;
  }

  _createClass(SpinalBIMObjectOC, [{
    key: "fillInfo",
    value: function fillInfo() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        getViewer().getProperties(_this2.id.get(), function (r) {
          _this2.name.set(r.name);
          resolve();
        });
      });
    }
  }]);

  return SpinalBIMObjectOC;
}(BIMForge.SpinalBIMObjectForge);

exports.default = SpinalBIMObjectOC;


spinalCore.register_models([SpinalBIMObjectOC]);