"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelManager = exports.EndpointGroup = exports.Endpoint = exports.Options = exports.SpinalBIMObjectOC = exports.SpinalBIMGroupOC = exports.Zone = exports.ZoneList = exports.Device = exports.OperationCenterObject = exports.ZoneNode = exports.DeviceNode = exports.SpinalNode = exports.ZoneForest = exports.DeviceForest = exports.NetworkList = exports.Forest = exports.RelZoneAggregatesList = exports.RelZoneAggregates = exports.RelForestOptions = exports.RelOperationCenter = exports.OperationCenter = undefined;

var _RelForestOptions = require("./RelForestOptions");

var _RelForestOptions2 = _interopRequireDefault(_RelForestOptions);

var _RelOperationCenter = require("./RelOperationCenter");

var _RelOperationCenter2 = _interopRequireDefault(_RelOperationCenter);

var _RelZoneAggregates = require("./RelZoneAggregates");

var _RelZoneAggregates2 = _interopRequireDefault(_RelZoneAggregates);

var _RelZoneAggregatesList = require("./RelZoneAggregatesList");

var _RelZoneAggregatesList2 = _interopRequireDefault(_RelZoneAggregatesList);

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _NetworkList = require("./NetworkList");

var _NetworkList2 = _interopRequireDefault(_NetworkList);

var _DeviceForest = require("./DeviceForest");

var _DeviceForest2 = _interopRequireDefault(_DeviceForest);

var _ZoneForest = require("./ZoneForest");

var _ZoneForest2 = _interopRequireDefault(_ZoneForest);

var _SpinalNode = require("./SpinalNode");

var _SpinalNode2 = _interopRequireDefault(_SpinalNode);

var _DeviceNode = require("./DeviceNode");

var _DeviceNode2 = _interopRequireDefault(_DeviceNode);

var _ZoneNode = require("./ZoneNode");

var _ZoneNode2 = _interopRequireDefault(_ZoneNode);

var _OperationCenterObject = require("./OperationCenterObject");

var _OperationCenterObject2 = _interopRequireDefault(_OperationCenterObject);

var _Device = require("./Device");

var _Device2 = _interopRequireDefault(_Device);

var _ZoneList = require("./ZoneList");

var _ZoneList2 = _interopRequireDefault(_ZoneList);

var _Zone = require("./Zone");

var _Zone2 = _interopRequireDefault(_Zone);

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

var _SpinalBIMObjectOC = require("./SpinalBIMObjectOC");

var _SpinalBIMObjectOC2 = _interopRequireDefault(_SpinalBIMObjectOC);

var _Options = require("./Options");

var _Options2 = _interopRequireDefault(_Options);

var _Endpoint = require("./Endpoint");

var _Endpoint2 = _interopRequireDefault(_Endpoint);

var _EndpointGroup = require("./EndpointGroup");

var _EndpointGroup2 = _interopRequireDefault(_EndpointGroup);

var _PanelManager = require("./PanelManager");

var _PanelManager2 = _interopRequireDefault(_PanelManager);

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
      let options = new _Options2.default();

      options.add_attr({
        endpointNameId: 0,
        equipementNameId: 0,
        endpointGroupNameId: 0
      });
      let zoneForest = new _ZoneForest2.default();
      // let deviceForest = new DeviceForest();
      let networkList = new _NetworkList2.default();
      this.add_attr({
        relForestOptionsZone: new Ptr(new _RelForestOptions2.default("zoneForest", zoneForest)),
        networkList: new Ptr(networkList),
        relZoneAggregatesList: new Ptr(new _RelZoneAggregatesList2.default()),
        zoneList: new Ptr(new _ZoneList2.default()),
        deviceList: new Ptr(new Lst()),
        options: options
      });
    }
  }
}

exports.OperationCenter = OperationCenter;
exports.RelOperationCenter = _RelOperationCenter2.default;
exports.RelForestOptions = _RelForestOptions2.default;
exports.RelZoneAggregates = _RelZoneAggregates2.default;
exports.RelZoneAggregatesList = _RelZoneAggregatesList2.default;
exports.Forest = _Forest2.default;
exports.NetworkList = _NetworkList2.default;
exports.DeviceForest = _DeviceForest2.default;
exports.ZoneForest = _ZoneForest2.default;
exports.SpinalNode = _SpinalNode2.default;
exports.DeviceNode = _DeviceNode2.default;
exports.ZoneNode = _ZoneNode2.default;
exports.OperationCenterObject = _OperationCenterObject2.default;
exports.Device = _Device2.default;
exports.ZoneList = _ZoneList2.default;
exports.Zone = _Zone2.default;
exports.SpinalBIMGroupOC = _SpinalBIMGroupOC2.default;
exports.SpinalBIMObjectOC = _SpinalBIMObjectOC2.default;
exports.Options = _Options2.default;
exports.Endpoint = _Endpoint2.default;
exports.EndpointGroup = _EndpointGroup2.default;
exports.PanelManager = _PanelManager2.default;


spinalCore.register_models([OperationCenter]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcGVyYXRpb25DZW50ZXIuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiZ2V0Vmlld2VyIiwidiIsIk9wZXJhdGlvbkNlbnRlciIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwib3B0aW9ucyIsIk9wdGlvbnMiLCJhZGRfYXR0ciIsImVuZHBvaW50TmFtZUlkIiwiZXF1aXBlbWVudE5hbWVJZCIsImVuZHBvaW50R3JvdXBOYW1lSWQiLCJ6b25lRm9yZXN0IiwiWm9uZUZvcmVzdCIsIm5ldHdvcmtMaXN0IiwiTmV0d29ya0xpc3QiLCJyZWxGb3Jlc3RPcHRpb25zWm9uZSIsIlB0ciIsIlJlbEZvcmVzdE9wdGlvbnMiLCJyZWxab25lQWdncmVnYXRlc0xpc3QiLCJSZWxab25lQWdncmVnYXRlc0xpc3QiLCJ6b25lTGlzdCIsIlpvbmVMaXN0IiwiZGV2aWNlTGlzdCIsIkxzdCIsIlJlbE9wZXJhdGlvbkNlbnRlciIsIlJlbFpvbmVBZ2dyZWdhdGVzIiwiRm9yZXN0IiwiRGV2aWNlRm9yZXN0IiwiU3BpbmFsTm9kZSIsIkRldmljZU5vZGUiLCJab25lTm9kZSIsIk9wZXJhdGlvbkNlbnRlck9iamVjdCIsIkRldmljZSIsIlpvbmUiLCJTcGluYWxCSU1Hcm91cE9DIiwiU3BpbmFsQklNT2JqZWN0T0MiLCJFbmRwb2ludCIsIkVuZHBvaW50R3JvdXAiLCJQYW5lbE1hbmFnZXIiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF5QkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUE5Q0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUNBLElBQUlFLFlBQVksWUFBVztBQUN6QixTQUFPSCxXQUFXSSxDQUFsQjtBQUNELENBRkQ7O0FBaUNBLE1BQU1DLGVBQU4sU0FBOEJMLFdBQVdNLEtBQXpDLENBQStDO0FBQzdDQyxjQUFZQyxPQUFPLGlCQUFuQixFQUFzQztBQUNwQztBQUNBLFFBQUlDLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsVUFBSUMsVUFBVSxJQUFJQyxpQkFBSixFQUFkOztBQUVBRCxjQUFRRSxRQUFSLENBQWlCO0FBQ2ZDLHdCQUFnQixDQUREO0FBRWZDLDBCQUFrQixDQUZIO0FBR2ZDLDZCQUFxQjtBQUhOLE9BQWpCO0FBS0EsVUFBSUMsYUFBYSxJQUFJQyxvQkFBSixFQUFqQjtBQUNBO0FBQ0EsVUFBSUMsY0FBYyxJQUFJQyxxQkFBSixFQUFsQjtBQUNBLFdBQUtQLFFBQUwsQ0FBYztBQUNaUSw4QkFBc0IsSUFBSUMsR0FBSixDQUFRLElBQUlDLDBCQUFKLENBQXFCLFlBQXJCLEVBQzVCTixVQUQ0QixDQUFSLENBRFY7QUFHWkUscUJBQWEsSUFBSUcsR0FBSixDQUFRSCxXQUFSLENBSEQ7QUFJWkssK0JBQXVCLElBQUlGLEdBQUosQ0FBUSxJQUFJRywrQkFBSixFQUFSLENBSlg7QUFLWkMsa0JBQVUsSUFBSUosR0FBSixDQUFRLElBQUlLLGtCQUFKLEVBQVIsQ0FMRTtBQU1aQyxvQkFBWSxJQUFJTixHQUFKLENBQVEsSUFBSU8sR0FBSixFQUFSLENBTkE7QUFPWmxCLGlCQUFTQTtBQVBHLE9BQWQ7QUFTRDtBQUNGO0FBeEI0Qzs7UUE4QjdDTixlLEdBQUFBLGU7UUFDQXlCLGtCLEdBQUFBLDRCO1FBQ0FQLGdCLEdBQUFBLDBCO1FBQ0FRLGlCLEdBQUFBLDJCO1FBQ0FOLHFCLEdBQUFBLCtCO1FBQ0FPLE0sR0FBQUEsZ0I7UUFDQVosVyxHQUFBQSxxQjtRQUNBYSxZLEdBQUFBLHNCO1FBQ0FmLFUsR0FBQUEsb0I7UUFDQWdCLFUsR0FBQUEsb0I7UUFDQUMsVSxHQUFBQSxvQjtRQUNBQyxRLEdBQUFBLGtCO1FBQ0FDLHFCLEdBQUFBLCtCO1FBQ0FDLE0sR0FBQUEsZ0I7UUFDQVgsUSxHQUFBQSxrQjtRQUNBWSxJLEdBQUFBLGM7UUFDQUMsZ0IsR0FBQUEsMEI7UUFDQUMsaUIsR0FBQUEsMkI7UUFDQTdCLE8sR0FBQUEsaUI7UUFDQThCLFEsR0FBQUEsa0I7UUFDQUMsYSxHQUFBQSx1QjtRQUNBQyxZLEdBQUFBLHNCOzs7QUFHRjlDLFdBQVcrQyxlQUFYLENBQTJCLENBQUN4QyxlQUFELENBQTNCIiwiZmlsZSI6Ik9wZXJhdGlvbkNlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE1IFNwaW5hbENvbSAgd3d3LnNwaW5hbGNvbS5jb21cblxuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cblxuLy8gU3BpbmFsQ29yZSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbi8vIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4vLyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4vLyBTb2RhIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBTb2RhLiBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmxldCBnZXRWaWV3ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFR5cGUudjtcbn1cblxuXG5cblxuaW1wb3J0IFJlbEZvcmVzdE9wdGlvbnMgZnJvbSBcIi4vUmVsRm9yZXN0T3B0aW9uc1wiXG5pbXBvcnQgUmVsT3BlcmF0aW9uQ2VudGVyIGZyb20gXCIuL1JlbE9wZXJhdGlvbkNlbnRlclwiXG5pbXBvcnQgUmVsWm9uZUFnZ3JlZ2F0ZXMgZnJvbSBcIi4vUmVsWm9uZUFnZ3JlZ2F0ZXNcIlxuaW1wb3J0IFJlbFpvbmVBZ2dyZWdhdGVzTGlzdCBmcm9tIFwiLi9SZWxab25lQWdncmVnYXRlc0xpc3RcIlxuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIlxuaW1wb3J0IE5ldHdvcmtMaXN0IGZyb20gXCIuL05ldHdvcmtMaXN0XCJcbmltcG9ydCBEZXZpY2VGb3Jlc3QgZnJvbSBcIi4vRGV2aWNlRm9yZXN0XCJcbmltcG9ydCBab25lRm9yZXN0IGZyb20gXCIuL1pvbmVGb3Jlc3RcIlxuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4vU3BpbmFsTm9kZVwiXG5pbXBvcnQgRGV2aWNlTm9kZSBmcm9tIFwiLi9EZXZpY2VOb2RlXCJcbmltcG9ydCBab25lTm9kZSBmcm9tIFwiLi9ab25lTm9kZVwiXG5pbXBvcnQgT3BlcmF0aW9uQ2VudGVyT2JqZWN0IGZyb20gXCIuL09wZXJhdGlvbkNlbnRlck9iamVjdFwiXG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuL0RldmljZVwiXG5pbXBvcnQgWm9uZUxpc3QgZnJvbSBcIi4vWm9uZUxpc3RcIlxuXG5pbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCJcbmltcG9ydCBTcGluYWxCSU1Hcm91cE9DIGZyb20gXCIuL1NwaW5hbEJJTUdyb3VwT0NcIlxuaW1wb3J0IFNwaW5hbEJJTU9iamVjdE9DIGZyb20gXCIuL1NwaW5hbEJJTU9iamVjdE9DXCJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIlxuaW1wb3J0IEVuZHBvaW50IGZyb20gXCIuL0VuZHBvaW50XCJcbmltcG9ydCBFbmRwb2ludEdyb3VwIGZyb20gXCIuL0VuZHBvaW50R3JvdXBcIlxuaW1wb3J0IFBhbmVsTWFuYWdlciBmcm9tIFwiLi9QYW5lbE1hbmFnZXJcIlxuXG5cblxuXG5jbGFzcyBPcGVyYXRpb25DZW50ZXIgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgY29uc3RydWN0b3IobmFtZSA9IFwiT3BlcmF0aW9uQ2VudGVyXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICBsZXQgb3B0aW9ucyA9IG5ldyBPcHRpb25zKClcblxuICAgICAgb3B0aW9ucy5hZGRfYXR0cih7XG4gICAgICAgIGVuZHBvaW50TmFtZUlkOiAwLFxuICAgICAgICBlcXVpcGVtZW50TmFtZUlkOiAwLFxuICAgICAgICBlbmRwb2ludEdyb3VwTmFtZUlkOiAwXG4gICAgICB9KVxuICAgICAgbGV0IHpvbmVGb3Jlc3QgPSBuZXcgWm9uZUZvcmVzdCgpO1xuICAgICAgLy8gbGV0IGRldmljZUZvcmVzdCA9IG5ldyBEZXZpY2VGb3Jlc3QoKTtcbiAgICAgIGxldCBuZXR3b3JrTGlzdCA9IG5ldyBOZXR3b3JrTGlzdCgpO1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIHJlbEZvcmVzdE9wdGlvbnNab25lOiBuZXcgUHRyKG5ldyBSZWxGb3Jlc3RPcHRpb25zKFwiem9uZUZvcmVzdFwiLFxuICAgICAgICAgIHpvbmVGb3Jlc3QpKSxcbiAgICAgICAgbmV0d29ya0xpc3Q6IG5ldyBQdHIobmV0d29ya0xpc3QpLFxuICAgICAgICByZWxab25lQWdncmVnYXRlc0xpc3Q6IG5ldyBQdHIobmV3IFJlbFpvbmVBZ2dyZWdhdGVzTGlzdCgpKSxcbiAgICAgICAgem9uZUxpc3Q6IG5ldyBQdHIobmV3IFpvbmVMaXN0KCkpLFxuICAgICAgICBkZXZpY2VMaXN0OiBuZXcgUHRyKG5ldyBMc3QoKSksXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuZXhwb3J0IHtcbiAgT3BlcmF0aW9uQ2VudGVyLFxuICBSZWxPcGVyYXRpb25DZW50ZXIsXG4gIFJlbEZvcmVzdE9wdGlvbnMsXG4gIFJlbFpvbmVBZ2dyZWdhdGVzLFxuICBSZWxab25lQWdncmVnYXRlc0xpc3QsXG4gIEZvcmVzdCxcbiAgTmV0d29ya0xpc3QsXG4gIERldmljZUZvcmVzdCxcbiAgWm9uZUZvcmVzdCxcbiAgU3BpbmFsTm9kZSxcbiAgRGV2aWNlTm9kZSxcbiAgWm9uZU5vZGUsXG4gIE9wZXJhdGlvbkNlbnRlck9iamVjdCxcbiAgRGV2aWNlLFxuICBab25lTGlzdCxcbiAgWm9uZSxcbiAgU3BpbmFsQklNR3JvdXBPQyxcbiAgU3BpbmFsQklNT2JqZWN0T0MsXG4gIE9wdGlvbnMsXG4gIEVuZHBvaW50LFxuICBFbmRwb2ludEdyb3VwLFxuICBQYW5lbE1hbmFnZXJcbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW09wZXJhdGlvbkNlbnRlcl0pIl19