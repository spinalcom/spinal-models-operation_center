"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = exports.RelForestOptions = exports.SpinalBIMObjectOC = exports.SpinalBIMGroupOC = exports.Forest = exports.ConfigurationNode = exports.OperationCenter = undefined;

var _ConfigurationNode = require("./ConfigurationNode");

var _ConfigurationNode2 = _interopRequireDefault(_ConfigurationNode);

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

var _SpinalBIMObjectOC = require("./SpinalBIMObjectOC");

var _SpinalBIMObjectOC2 = _interopRequireDefault(_SpinalBIMObjectOC);

var _RelForestOptions = require("./RelForestOptions");

var _RelForestOptions2 = _interopRequireDefault(_RelForestOptions);

var _Options = require("./Options");

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
let getViewer = function () {
  return globalType.v;
};

class OperationCenter extends globalType.Model {
  constructor(name = "OperationCenter") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        relForestOptions: new Ptr(new _RelForestOptions2.default()),
        networkForest: new Ptr(new _Forest2.default())
      });
    }
  }
}

exports.OperationCenter = OperationCenter;
exports.ConfigurationNode = _ConfigurationNode2.default;
exports.Forest = _Forest2.default;
exports.SpinalBIMGroupOC = _SpinalBIMGroupOC2.default;
exports.SpinalBIMObjectOC = _SpinalBIMObjectOC2.default;
exports.RelForestOptions = _RelForestOptions2.default;
exports.Options = _Options2.default;

// exports.OperationCenter = OperationCenter;
// exports.BasicConfigurationNode = BasicConfigurationNode;
// exports.ConfigurationNode = ConfigurationNode;
// exports.ConfigurationRoot = ConfigurationRoot;
// exports.Forest = Forest;
// exports.SpinalBIMGroupOC = SpinalBIMGroupOC;
// exports.SpinalBIMObjectOC = SpinalBIMObjectOC;

spinalCore.register_models([OperationCenter]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcGVyYXRpb25DZW50ZXIuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiZ2V0Vmlld2VyIiwidiIsIk9wZXJhdGlvbkNlbnRlciIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJyZWxGb3Jlc3RPcHRpb25zIiwiUHRyIiwiUmVsRm9yZXN0T3B0aW9ucyIsIm5ldHdvcmtGb3Jlc3QiLCJGb3Jlc3QiLCJDb25maWd1cmF0aW9uTm9kZSIsIlNwaW5hbEJJTUdyb3VwT0MiLCJTcGluYWxCSU1PYmplY3RPQyIsIk9wdGlvbnMiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFzQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUEzQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUNBLElBQUlFLFlBQVksWUFBVztBQUN6QixTQUFPSCxXQUFXSSxDQUFsQjtBQUNELENBRkQ7O0FBZUEsTUFBTUMsZUFBTixTQUE4QkwsV0FBV00sS0FBekMsQ0FBK0M7QUFDN0NDLGNBQVlDLE9BQU8saUJBQW5CLEVBQXNDO0FBQ3BDO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsMEJBQWtCLElBQUlDLEdBQUosQ0FBUSxJQUFJQywwQkFBSixFQUFSLENBRE47QUFFWkMsdUJBQWUsSUFBSUYsR0FBSixDQUFRLElBQUlHLGdCQUFKLEVBQVI7QUFGSCxPQUFkO0FBSUQ7QUFDRjtBQVQ0Qzs7UUFlN0NYLGUsR0FBQUEsZTtRQUNBWSxpQixHQUFBQSwyQjtRQUNBRCxNLEdBQUFBLGdCO1FBQ0FFLGdCLEdBQUFBLDBCO1FBQ0FDLGlCLEdBQUFBLDJCO1FBQ0FMLGdCLEdBQUFBLDBCO1FBQ0FNLE8sR0FBQUEsaUI7O0FBSUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F0QixXQUFXdUIsZUFBWCxDQUEyQixDQUFDaEIsZUFBRCxDQUEzQiIsImZpbGUiOiJPcGVyYXRpb25DZW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNSBTcGluYWxDb20gIHd3dy5zcGluYWxjb20uY29tXG5cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG5cbi8vIFNwaW5hbENvcmUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4vLyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuLy8gKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuLy8gU29kYSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggU29kYS4gSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5jb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5sZXQgZ2V0Vmlld2VyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxUeXBlLnY7XG59XG5cbmltcG9ydCBDb25maWd1cmF0aW9uTm9kZSBmcm9tIFwiLi9Db25maWd1cmF0aW9uTm9kZVwiXG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiXG5pbXBvcnQgU3BpbmFsQklNR3JvdXBPQyBmcm9tIFwiLi9TcGluYWxCSU1Hcm91cE9DXCJcbmltcG9ydCBTcGluYWxCSU1PYmplY3RPQyBmcm9tIFwiLi9TcGluYWxCSU1PYmplY3RPQ1wiXG5pbXBvcnQgUmVsRm9yZXN0T3B0aW9ucyBmcm9tIFwiLi9SZWxGb3Jlc3RPcHRpb25zXCJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIlxuXG5cblxuXG5cbmNsYXNzIE9wZXJhdGlvbkNlbnRlciBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJPcGVyYXRpb25DZW50ZXJcIikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICByZWxGb3Jlc3RPcHRpb25zOiBuZXcgUHRyKG5ldyBSZWxGb3Jlc3RPcHRpb25zKCkpLFxuICAgICAgICBuZXR3b3JrRm9yZXN0OiBuZXcgUHRyKG5ldyBGb3Jlc3QoKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuZXhwb3J0IHtcbiAgT3BlcmF0aW9uQ2VudGVyLFxuICBDb25maWd1cmF0aW9uTm9kZSxcbiAgRm9yZXN0LFxuICBTcGluYWxCSU1Hcm91cE9DLFxuICBTcGluYWxCSU1PYmplY3RPQyxcbiAgUmVsRm9yZXN0T3B0aW9ucyxcbiAgT3B0aW9uc1xufVxuXG5cbi8vIGV4cG9ydHMuT3BlcmF0aW9uQ2VudGVyID0gT3BlcmF0aW9uQ2VudGVyO1xuLy8gZXhwb3J0cy5CYXNpY0NvbmZpZ3VyYXRpb25Ob2RlID0gQmFzaWNDb25maWd1cmF0aW9uTm9kZTtcbi8vIGV4cG9ydHMuQ29uZmlndXJhdGlvbk5vZGUgPSBDb25maWd1cmF0aW9uTm9kZTtcbi8vIGV4cG9ydHMuQ29uZmlndXJhdGlvblJvb3QgPSBDb25maWd1cmF0aW9uUm9vdDtcbi8vIGV4cG9ydHMuRm9yZXN0ID0gRm9yZXN0O1xuLy8gZXhwb3J0cy5TcGluYWxCSU1Hcm91cE9DID0gU3BpbmFsQklNR3JvdXBPQztcbi8vIGV4cG9ydHMuU3BpbmFsQklNT2JqZWN0T0MgPSBTcGluYWxCSU1PYmplY3RPQztcbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtPcGVyYXRpb25DZW50ZXJdKSJdfQ==