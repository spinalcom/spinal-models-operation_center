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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcGVyYXRpb25DZW50ZXIuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiZ2V0Vmlld2VyIiwidiIsIk9wZXJhdGlvbkNlbnRlciIsImFkZF9hdHRyIiwiem9uZUZvcmVzdCIsIlB0ciIsIkZvcmVzdCIsIm5ldHdvcmtGb3Jlc3QiLCJNb2RlbCIsIkJhc2ljQ29uZmlndXJhdGlvbk5vZGUiLCJDb25maWd1cmF0aW9uTm9kZSIsIkNvbmZpZ3VyYXRpb25Sb290IiwiU3BpbmFsQklNR3JvdXBPQyIsIlNwaW5hbEJJTU9iamVjdE9DIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBc0JBOztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBN0JBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsSUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7QUFDQSxJQUFJRSxZQUFZLFNBQVpBLFNBQVksR0FBVztBQUN6QixTQUFPSCxXQUFXSSxDQUFsQjtBQUNELENBRkQ7O0lBaUJNQyxlOzs7QUFDSiw2QkFBYztBQUFBOztBQUFBOztBQUVaLFVBQUtDLFFBQUwsQ0FBYztBQUNaQyxrQkFBWSxJQUFJQyxHQUFKLENBQVEsSUFBSUMsZ0JBQUosRUFBUixDQURBO0FBRVpDLHFCQUFlLElBQUlGLEdBQUosQ0FBUSxJQUFJQyxnQkFBSixFQUFSO0FBRkgsS0FBZDtBQUZZO0FBTWI7OztFQVAyQlQsV0FBV1csSzs7UUFhdkNOLGUsR0FBQUEsZTtRQUNBTyxzQixHQUFBQSx5QztRQUNBQyxpQixHQUFBQSxvQztRQUNBQyxpQixHQUFBQSxvQztRQUNBTCxNLEdBQUFBLGdCO1FBQ0FNLGdCLEdBQUFBLDBCO1FBQ0FDLGlCLEdBQUFBLDJCOztBQUlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbEIsV0FBV21CLGVBQVgsQ0FBMkIsQ0FBQ1osZUFBRCxDQUEzQiIsImZpbGUiOiJPcGVyYXRpb25DZW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNSBTcGluYWxDb20gIHd3dy5zcGluYWxjb20uY29tXG5cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG5cbi8vIFNwaW5hbENvcmUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gU29kYSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggU29kYS4gSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5jb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5sZXQgZ2V0Vmlld2VyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxUeXBlLnY7XG59XG5cbmltcG9ydCB7XG4gIEJhc2ljQ29uZmlndXJhdGlvbk5vZGUsXG4gIENvbmZpZ3VyYXRpb25Ob2RlLFxuICBDb25maWd1cmF0aW9uUm9vdFxufSBmcm9tIFwiLi9Db25maWd1cmF0aW9uTm9kZVwiXG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiXG5pbXBvcnQgU3BpbmFsQklNR3JvdXBPQyBmcm9tIFwiLi9TcGluYWxCSU1Hcm91cE9DXCJcbmltcG9ydCBTcGluYWxCSU1PYmplY3RPQyBmcm9tIFwiLi9TcGluYWxCSU1PYmplY3RPQ1wiXG5cblxuXG5cblxuY2xhc3MgT3BlcmF0aW9uQ2VudGVyIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICB6b25lRm9yZXN0OiBuZXcgUHRyKG5ldyBGb3Jlc3QoKSksXG4gICAgICBuZXR3b3JrRm9yZXN0OiBuZXcgUHRyKG5ldyBGb3Jlc3QoKSlcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IHtcbiAgT3BlcmF0aW9uQ2VudGVyLFxuICBCYXNpY0NvbmZpZ3VyYXRpb25Ob2RlLFxuICBDb25maWd1cmF0aW9uTm9kZSxcbiAgQ29uZmlndXJhdGlvblJvb3QsXG4gIEZvcmVzdCxcbiAgU3BpbmFsQklNR3JvdXBPQyxcbiAgU3BpbmFsQklNT2JqZWN0T0Ncbn1cblxuXG4vLyBleHBvcnRzLk9wZXJhdGlvbkNlbnRlciA9IE9wZXJhdGlvbkNlbnRlcjtcbi8vIGV4cG9ydHMuQmFzaWNDb25maWd1cmF0aW9uTm9kZSA9IEJhc2ljQ29uZmlndXJhdGlvbk5vZGU7XG4vLyBleHBvcnRzLkNvbmZpZ3VyYXRpb25Ob2RlID0gQ29uZmlndXJhdGlvbk5vZGU7XG4vLyBleHBvcnRzLkNvbmZpZ3VyYXRpb25Sb290ID0gQ29uZmlndXJhdGlvblJvb3Q7XG4vLyBleHBvcnRzLkZvcmVzdCA9IEZvcmVzdDtcbi8vIGV4cG9ydHMuU3BpbmFsQklNR3JvdXBPQyA9IFNwaW5hbEJJTUdyb3VwT0M7XG4vLyBleHBvcnRzLlNwaW5hbEJJTU9iamVjdE9DID0gU3BpbmFsQklNT2JqZWN0T0M7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbT3BlcmF0aW9uQ2VudGVyXSkiXX0=