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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Gb3Jlc3QuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiZ2V0Vmlld2VyIiwidiIsIkZvcmVzdCIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwibGlzdCIsIkxzdCIsImlkIiwiY29sb3JpbmdUeXBlIiwic2V0IiwiZ2V0IiwidGl0bGUiLCJ0cmVlIiwiQ29uZmlndXJhdGlvblJvb3QiLCJzZXRUaXRsZSIsImluY3JlbWVudElkIiwidG9TdHJpbmciLCJwdXNoIiwicm9vdCIsInJlbW92ZSIsIl9vYmplY3RzIiwiX3NlcnZlcl9pZCIsImVxdWlwZW1lbnRzQXJyYXkiLCJpIiwibGVuZ3RoIiwiY29uY2F0IiwiZ2V0RXF1aXBlbWVudHMiLCJyZXMiLCJnZXRBbGxCSU1Hcm91cHMiLCJCSU1Hcm91cHMiLCJpbmRleCIsImVsZW1lbnQiLCJhcnJheU9mSWQiLCJjbGVhclRoZW1pbmdDb2xvcnMiLCJyZXN0b3JlQ29sb3JNYXRlcmlhbCIsImdldEFsbEJJTU9iamVjdHNJZHMiLCJjdXJyZW50VmFsdWUiLCJkaXNwbGF5IiwicmVmcmVzaENvbG9ycyIsIk1vZGVsIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBOzs7Ozs7OztBQUZBLElBQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxJQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFJQSxJQUFJRSxZQUFZLFNBQVpBLFNBQVksR0FBVztBQUN6QixTQUFPSCxXQUFXSSxDQUFsQjtBQUNELENBRkQ7O0lBR3FCQyxNOzs7QUFDbkIsb0JBQWM7QUFBQTs7QUFBQTs7QUFFWixRQUFJQyxXQUFXQyxXQUFmLEVBQTRCO0FBQzFCLFlBQUtDLFFBQUwsQ0FBYztBQUNaQyxjQUFNLElBQUlDLEdBQUosRUFETTtBQUVaQyxZQUFJLENBRlE7QUFHWkMsc0JBQWM7QUFIRixPQUFkO0FBS0Q7QUFSVztBQVNiOzs7O2tDQUVhO0FBQ1osV0FBS0QsRUFBTCxDQUFRRSxHQUFSLENBQVksS0FBS0YsRUFBTCxDQUFRRyxHQUFSLEtBQWdCLENBQTVCO0FBQ0EsYUFBTyxLQUFLSCxFQUFMLENBQVFHLEdBQVIsRUFBUDtBQUNEOzs7NEJBRU9DLEssRUFBTztBQUNiLFVBQUlDLE9BQU8sSUFBSUMsb0NBQUosRUFBWDtBQUNBRCxXQUFLRSxRQUFMLENBQWNILFFBQVEsR0FBUixHQUFjLEtBQUtJLFdBQUwsR0FBbUJDLFFBQW5CLEVBQTVCO0FBQ0EsV0FBS1gsSUFBTCxDQUFVWSxJQUFWLENBQWVMLElBQWY7QUFDRDs7OytCQUVVTSxJLEVBQU07QUFDZixXQUFLYixJQUFMLENBQVVjLE1BQVYsQ0FBaUJELElBQWpCO0FBQ0EsYUFBT2hCLFdBQVdrQixRQUFYLENBQW9CRixLQUFLRyxVQUF6QixDQUFQO0FBQ0Q7OztxQ0FFZ0I7QUFDZixVQUFJQyxtQkFBbUIsRUFBdkI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLbEIsSUFBTCxDQUFVbUIsTUFBOUIsRUFBc0NELEdBQXRDLEVBQTJDO0FBQ3pDLFlBQU1YLE9BQU8sS0FBS1AsSUFBTCxDQUFVa0IsQ0FBVixDQUFiO0FBQ0FELDJCQUFtQkEsaUJBQWlCRyxNQUFqQixDQUF3QmIsS0FBS2MsY0FBTCxFQUF4QixDQUFuQjtBQUNEO0FBQ0QsYUFBT0osZ0JBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFJSyxNQUFNLEVBQVY7QUFDQSxXQUFLLElBQUlKLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLbEIsSUFBTCxDQUFVbUIsTUFBOUIsRUFBc0NELEdBQXRDLEVBQTJDO0FBQ3pDLFlBQU1YLE9BQU8sS0FBS1AsSUFBTCxDQUFVa0IsQ0FBVixDQUFiO0FBQ0FJLGNBQU1BLElBQUlGLE1BQUosQ0FBV2IsS0FBS2dCLGVBQUwsRUFBWCxDQUFOO0FBQ0Q7QUFDRCxhQUFPRCxHQUFQO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsVUFBSUEsTUFBTSxFQUFWO0FBQ0EsVUFBSUUsWUFBWSxLQUFLRCxlQUFMLEVBQWhCO0FBQ0EsV0FBSyxJQUFJRSxRQUFRLENBQWpCLEVBQW9CQSxRQUFRRCxVQUFVTCxNQUF0QyxFQUE4Q00sT0FBOUMsRUFBdUQ7QUFDckQsWUFBTUMsVUFBVUYsVUFBVUMsS0FBVixDQUFoQjtBQUNBSCxjQUFNQSxJQUFJRixNQUFKLENBQVdNLFFBQVFDLFNBQVIsRUFBWCxDQUFOO0FBQ0Q7QUFDRCxhQUFPTCxHQUFQO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsVUFBSSxLQUFLbkIsWUFBTCxLQUFzQixDQUExQixFQUE2QlQsWUFBWWtDLGtCQUFaLEdBQTdCLEtBQ0s7QUFDSGxDLG9CQUFZbUMsb0JBQVosQ0FBaUMsS0FBS0MsbUJBQUwsRUFBakM7QUFDRDtBQUNGOzs7dUNBRWtCO0FBQ2pCLFVBQUlOLFlBQVksS0FBS0QsZUFBTCxFQUFoQjtBQUNBLFdBQUssSUFBSUUsUUFBUSxDQUFqQixFQUFvQkEsUUFBUUQsVUFBVUwsTUFBdEMsRUFBOENNLE9BQTlDLEVBQXVEO0FBQ3JELFlBQU1DLFVBQVVGLFVBQVVDLEtBQVYsQ0FBaEI7QUFDQSxZQUFJQyxRQUFRSyxZQUFSLENBQXFCMUIsR0FBckIsT0FBK0IsQ0FBL0IsSUFBb0NxQixRQUFRTSxPQUFSLENBQWdCM0IsR0FBaEIsRUFBeEMsRUFBK0Q7QUFDN0RxQixrQkFBUU8sYUFBUixDQUFzQixLQUFLOUIsWUFBM0I7QUFDRDtBQUNGO0FBQ0Y7Ozs7RUF2RWlDWixXQUFXMkMsSzs7a0JBQTFCdEMsTTs7O0FBMEVyQlAsV0FBVzhDLGVBQVgsQ0FBMkIsQ0FBQ3ZDLE1BQUQsQ0FBM0IiLCJmaWxlIjoiRm9yZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IHtcbiAgQ29uZmlndXJhdGlvblJvb3Rcbn0gZnJvbSBcIi4vQ29uZmlndXJhdGlvbk5vZGVcIlxubGV0IGdldFZpZXdlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2xvYmFsVHlwZS52O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBsaXN0OiBuZXcgTHN0KCksXG4gICAgICAgIGlkOiAwLFxuICAgICAgICBjb2xvcmluZ1R5cGU6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluY3JlbWVudElkKCkge1xuICAgIHRoaXMuaWQuc2V0KHRoaXMuaWQuZ2V0KCkgKyAxKTtcbiAgICByZXR1cm4gdGhpcy5pZC5nZXQoKTtcbiAgfVxuXG4gIGFkZFRyZWUodGl0bGUpIHtcbiAgICB2YXIgdHJlZSA9IG5ldyBDb25maWd1cmF0aW9uUm9vdCgpO1xuICAgIHRyZWUuc2V0VGl0bGUodGl0bGUgKyBcIiBcIiArIHRoaXMuaW5jcmVtZW50SWQoKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmxpc3QucHVzaCh0cmVlKTtcbiAgfVxuXG4gIHJlbW92ZVRyZWUocm9vdCkge1xuICAgIHRoaXMubGlzdC5yZW1vdmUocm9vdCk7XG4gICAgZGVsZXRlIEZpbGVTeXN0ZW0uX29iamVjdHNbcm9vdC5fc2VydmVyX2lkXTtcbiAgfVxuXG4gIGdldEVxdWlwZW1lbnRzKCkge1xuICAgIGxldCBlcXVpcGVtZW50c0FycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRyZWUgPSB0aGlzLmxpc3RbaV07XG4gICAgICBlcXVpcGVtZW50c0FycmF5ID0gZXF1aXBlbWVudHNBcnJheS5jb25jYXQodHJlZS5nZXRFcXVpcGVtZW50cygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVxdWlwZW1lbnRzQXJyYXk7XG4gIH1cblxuICBnZXRBbGxCSU1Hcm91cHMoKSB7XG4gICAgbGV0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0cmVlID0gdGhpcy5saXN0W2ldO1xuICAgICAgcmVzID0gcmVzLmNvbmNhdCh0cmVlLmdldEFsbEJJTUdyb3VwcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldEFsbEJJTU9iamVjdHNJZHMoKSB7XG4gICAgbGV0IHJlcyA9IFtdXG4gICAgbGV0IEJJTUdyb3VwcyA9IHRoaXMuZ2V0QWxsQklNR3JvdXBzKCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJJTUdyb3Vwcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBCSU1Hcm91cHNbaW5kZXhdO1xuICAgICAgcmVzID0gcmVzLmNvbmNhdChlbGVtZW50LmFycmF5T2ZJZCgpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcmVzdG9yZUNvbG9yTWF0ZXJpYWwoKSB7XG4gICAgaWYgKHRoaXMuY29sb3JpbmdUeXBlID09PSAxKSBnZXRWaWV3ZXIoKS5jbGVhclRoZW1pbmdDb2xvcnMoKVxuICAgIGVsc2Uge1xuICAgICAgZ2V0Vmlld2VyKCkucmVzdG9yZUNvbG9yTWF0ZXJpYWwodGhpcy5nZXRBbGxCSU1PYmplY3RzSWRzKCkpXG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaEFsbENvbG9ycygpIHtcbiAgICBsZXQgQklNR3JvdXBzID0gdGhpcy5nZXRBbGxCSU1Hcm91cHMoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQklNR3JvdXBzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IEJJTUdyb3Vwc1tpbmRleF07XG4gICAgICBpZiAoZWxlbWVudC5jdXJyZW50VmFsdWUuZ2V0KCkgIT09IDAgJiYgZWxlbWVudC5kaXNwbGF5LmdldCgpKSB7XG4gICAgICAgIGVsZW1lbnQucmVmcmVzaENvbG9ycyh0aGlzLmNvbG9yaW5nVHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtGb3Jlc3RdKSJdfQ==