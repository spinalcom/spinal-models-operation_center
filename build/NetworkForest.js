"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceForest = require("./DeviceForest");

var _DeviceForest2 = _interopRequireDefault(_DeviceForest);

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _RelForestOptions = require("./RelForestOptions");

var _RelForestOptions2 = _interopRequireDefault(_RelForestOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

let getViewer = function () {
  return globalType.v;
};
class NetworkForest extends _Forest2.default {
  constructor(_options) {
    super(_options);
    // if (FileSystem._sig_server) {
    //   this.add_attr({

    //   });
    // }
  }

  //   incrementDeviceNameId() {
  //     this.deviceNameId.set(this.deviceNameId.get() + 1);
  //     return this.deviceNameId.get();
  //   }

  addNetwork(_protocolType) {
    let deviceForest = new _DeviceForest2.default();
    let relForestOptions = new _RelForestOptions2.default("deviceForest", deviceForest);
    relForestOptions.options.add_attr({
      protocolType: _protocolType
    });
    let network = new Ptr(relForestOptions);
    this.list.push(network);
  }

}

exports.default = NetworkForest;
spinalCore.register_models([NetworkForest]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OZXR3b3JrRm9yZXN0LmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsImdldFZpZXdlciIsInYiLCJOZXR3b3JrRm9yZXN0IiwiRm9yZXN0IiwiY29uc3RydWN0b3IiLCJfb3B0aW9ucyIsImFkZE5ldHdvcmsiLCJfcHJvdG9jb2xUeXBlIiwiZGV2aWNlRm9yZXN0IiwiRGV2aWNlRm9yZXN0IiwicmVsRm9yZXN0T3B0aW9ucyIsIlJlbEZvcmVzdE9wdGlvbnMiLCJvcHRpb25zIiwiYWRkX2F0dHIiLCJwcm90b2NvbFR5cGUiLCJuZXR3b3JrIiwiUHRyIiwibGlzdCIsInB1c2giLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkEsTUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjtBQUNBLE1BQU1DLGFBQWEsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUlBLElBQUlFLFlBQVksWUFBVztBQUN6QixTQUFPSCxXQUFXSSxDQUFsQjtBQUNELENBRkQ7QUFHZSxNQUFNQyxhQUFOLFNBQTRCQyxnQkFBNUIsQ0FBbUM7QUFDaERDLGNBQVlDLFFBQVosRUFBc0I7QUFDcEIsVUFBTUEsUUFBTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBQyxhQUFXQyxhQUFYLEVBQTBCO0FBQ3hCLFFBQUlDLGVBQWUsSUFBSUMsc0JBQUosRUFBbkI7QUFDQSxRQUFJQyxtQkFBbUIsSUFBSUMsMEJBQUosQ0FDckIsY0FEcUIsRUFDTEgsWUFESyxDQUF2QjtBQUVBRSxxQkFBaUJFLE9BQWpCLENBQXlCQyxRQUF6QixDQUFrQztBQUNoQ0Msb0JBQWNQO0FBRGtCLEtBQWxDO0FBR0EsUUFBSVEsVUFBVSxJQUFJQyxHQUFKLENBQVFOLGdCQUFSLENBQWQ7QUFDQSxTQUFLTyxJQUFMLENBQVVDLElBQVYsQ0FBZUgsT0FBZjtBQUNEOztBQXhCK0M7O2tCQUE3QmIsYTtBQTRCckJQLFdBQVd3QixlQUFYLENBQTJCLENBQUNqQixhQUFELENBQTNCIiwiZmlsZSI6Ik5ldHdvcmtGb3Jlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5pbXBvcnQgRGV2aWNlRm9yZXN0IGZyb20gXCIuL0RldmljZUZvcmVzdFwiXG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiXG5pbXBvcnQgUmVsRm9yZXN0T3B0aW9ucyBmcm9tIFwiLi9SZWxGb3Jlc3RPcHRpb25zXCJcbmxldCBnZXRWaWV3ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFR5cGUudjtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmtGb3Jlc3QgZXh0ZW5kcyBGb3Jlc3Qge1xuICBjb25zdHJ1Y3Rvcihfb3B0aW9ucykge1xuICAgIHN1cGVyKF9vcHRpb25zKTtcbiAgICAvLyBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgIC8vICAgdGhpcy5hZGRfYXR0cih7XG5cbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8vICAgaW5jcmVtZW50RGV2aWNlTmFtZUlkKCkge1xuICAvLyAgICAgdGhpcy5kZXZpY2VOYW1lSWQuc2V0KHRoaXMuZGV2aWNlTmFtZUlkLmdldCgpICsgMSk7XG4gIC8vICAgICByZXR1cm4gdGhpcy5kZXZpY2VOYW1lSWQuZ2V0KCk7XG4gIC8vICAgfVxuXG4gIGFkZE5ldHdvcmsoX3Byb3RvY29sVHlwZSkge1xuICAgIGxldCBkZXZpY2VGb3Jlc3QgPSBuZXcgRGV2aWNlRm9yZXN0KCk7XG4gICAgbGV0IHJlbEZvcmVzdE9wdGlvbnMgPSBuZXcgUmVsRm9yZXN0T3B0aW9ucyhcbiAgICAgIFwiZGV2aWNlRm9yZXN0XCIsIGRldmljZUZvcmVzdCk7XG4gICAgcmVsRm9yZXN0T3B0aW9ucy5vcHRpb25zLmFkZF9hdHRyKHtcbiAgICAgIHByb3RvY29sVHlwZTogX3Byb3RvY29sVHlwZVxuICAgIH0pXG4gICAgbGV0IG5ldHdvcmsgPSBuZXcgUHRyKHJlbEZvcmVzdE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5wdXNoKG5ldHdvcmspO1xuICB9XG5cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW05ldHdvcmtGb3Jlc3RdKSJdfQ==