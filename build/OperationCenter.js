"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinalBIMObjectOC = exports.SpinalBIMGroupOC = exports.Forest = exports.ConfigurationRoot = exports.ConfigurationNode = exports.BasicConfigurationNode = exports.OperationCenter = undefined;

var _ConfigurationNode = require("./ConfigurationNode");

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

var _SpinalBIMObjectOC = require("./SpinalBIMObjectOC");

var _SpinalBIMObjectOC2 = _interopRequireDefault(_SpinalBIMObjectOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Copyright 2015 SpinalCom  www.spinalcom.com

// This file is part of SpinalCore.

// SpinalCore is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Soda is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Soda. If not, see <http://www.gnu.org/licenses/>.

var spinalCore = require("spinal-core-connectorjs");
var globalType = typeof window === "undefined" ? global : window;
var getViewer = function getViewer() {
  return globalType.v;
};

var OperationCenter = function (_globalType$Model) {
  _inherits(OperationCenter, _globalType$Model);

  function OperationCenter() {
    _classCallCheck(this, OperationCenter);

    var _this = _possibleConstructorReturn(this, (OperationCenter.__proto__ || Object.getPrototypeOf(OperationCenter)).call(this));

    _this.add_attr({
      zoneForest: new Ptr(new _Forest2.default()),
      networkForest: new Ptr(new _Forest2.default())
    });
    return _this;
  }

  return OperationCenter;
}(globalType.Model);

exports.OperationCenter = OperationCenter;
exports.BasicConfigurationNode = _ConfigurationNode.BasicConfigurationNode;
exports.ConfigurationNode = _ConfigurationNode.ConfigurationNode;
exports.ConfigurationRoot = _ConfigurationNode.ConfigurationRoot;
exports.Forest = _Forest2.default;
exports.SpinalBIMGroupOC = _SpinalBIMGroupOC2.default;
exports.SpinalBIMObjectOC = _SpinalBIMObjectOC2.default;

// exports.OperationCenter = OperationCenter;
// exports.BasicConfigurationNode = BasicConfigurationNode;
// exports.ConfigurationNode = ConfigurationNode;
// exports.ConfigurationRoot = ConfigurationRoot;
// exports.Forest = Forest;
// exports.SpinalBIMGroupOC = SpinalBIMGroupOC;
// exports.SpinalBIMObjectOC = SpinalBIMObjectOC;

spinalCore.register_models([OperationCenter]);