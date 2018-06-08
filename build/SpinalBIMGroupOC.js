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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxCSU1Hcm91cE9DLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJzcGluYWxDb3JlIiwicmVxdWlyZSIsIkJJTUZvcmdlIiwiZ2V0Vmlld2VyIiwidiIsIlNwaW5hbEJJTUdyb3VwT0MiLCJfcGFyZW50IiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJTcGluYWxCSU1Hcm91cE9DSWQiLCJjdXJyZW50VmFsdWUiLCJ0aW1lU2VyaWVzIiwicGFyZW50IiwicG9wdWxhdGVUaW1lU2VyaWVzIiwiZGlzcGxheSIsInNldCIsIm1heCIsImxlbmd0aCIsInNoaWZ0IiwicHVzaCIsImdldCIsIl9jb2xvcmluZ1R5cGUiLCJuZXdjb2xvciIsImNvbG9ycyIsImNvbG9yQnlWYWx1ZSIsImNvbG9yIiwiZGJpZHMiLCJhcnJheU9mSWQiLCJvcGFjaXR5IiwiY29sb3JSR0IiLCJ0b1JHQiIsImluZGV4IiwiQklNT2JqZWN0cyIsInNldFRoZW1pbmdDb2xvciIsInNldENvbG9yTWF0ZXJpYWwiLCJpdGVtSWQiLCJpbmRleE9mIiwiY29udGFpbnMiLCJuZXdCSU1PYmplY3QiLCJTcGluYWxCSU1PYmplY3RPQyIsImZpbGxJbmZvIiwidGhlbiIsImlucHV0IiwiZm9yRWFjaCIsImkiLCJyZW1vdmVkSXRlbXMiLCJzcGxpY2UiLCJ0IiwiaXRlbSIsImlzb2xhdGVCeUlkIiwiU3BpbmFsQklNR3JvdXBGb3JnZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFKQSxJQUFNQSxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUNBLElBQU1FLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxJQUFNQyxXQUFXRCxRQUFRLHlCQUFSLENBQWpCOzs7QUFLQSxJ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ZSxFQUFuQjtBQUNBLFdBQUssSUFBSUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixNQUFNekIsTUFBMUIsRUFBa0MsRUFBRTJCLENBQXBDLEVBQXVDO0FBQ3JDLFlBQUliLFFBQVEsS0FBS0MsVUFBTCxDQUFnQkksT0FBaEIsQ0FBd0JNLE1BQU1FLENBQU4sQ0FBeEIsQ0FBWjtBQUNBLFlBQUliLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCYyx1QkFBYTFCLElBQWIsQ0FBa0IsS0FBS2EsVUFBTCxDQUFnQkQsS0FBaEIsRUFBdUJYLEdBQXZCLEVBQWxCO0FBQ0EsZUFBS1ksVUFBTCxDQUFnQmMsTUFBaEIsQ0FBdUJmLEtBQXZCLEVBQThCLENBQTlCO0FBQ0Q7QUFDRjtBQUNELGFBQU9jLFlBQVA7QUFDRDs7O2dDQUVXO0FBQ1YsVUFBSUUsSUFBSSxFQUFSO0FBQ0EsV0FBSyxJQUFJSCxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS1osVUFBTCxDQUFnQmYsTUFBcEMsRUFBNEMyQixHQUE1QyxFQUFpRDtBQUMvQyxZQUFNSSxPQUFPLEtBQUtoQixVQUFMLENBQWdCWSxDQUFoQixDQUFiO0FBQ0FHLFVBQUU1QixJQUFGLENBQU82QixLQUFLeEMsRUFBTCxDQUFRWSxHQUFSLEVBQVA7QUFDRDtBQUNELGFBQU8yQixDQUFQO0FBQ0Q7Ozs4QkFFUztBQUNSL0Msa0JBQVlpRCxXQUFaLENBQXdCLEtBQUt0QixTQUFMLEVBQXhCO0FBQ0Q7Ozs7RUEzRjJDNUIsU0FBU21ELG1COztrQkFBbENoRCxnQjs7QUErRnJCQSxpQkFBaUJPLGtCQUFqQixHQUFzQyxDQUF0Qzs7QUFFQVosV0FBV3NELGVBQVgsQ0FBMkIsQ0FBQ2pELGdCQUFELENBQTNCIiwiZmlsZSI6IlNwaW5hbEJJTUdyb3VwT0MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBCSU1Gb3JnZSA9IHJlcXVpcmUoXCJzcGluYWwtbW9kZWxzLWJpbV9mb3JnZVwiKTtcbmltcG9ydCBTcGluYWxCSU1PYmplY3RPQyBmcm9tIFwiLi9TcGluYWxCSU1PYmplY3RPQ1wiXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuLi9hc3NldHMvdXRpbGl0aWVzL2NvbG9yc1wiXG5cblxubGV0IGdldFZpZXdlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2xvYmFsVHlwZS52O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGluYWxCSU1Hcm91cE9DIGV4dGVuZHMgQklNRm9yZ2UuU3BpbmFsQklNR3JvdXBGb3JnZSB7XG4gIGNvbnN0cnVjdG9yKF9wYXJlbnQsIG5hbWUgPSBcIlNwaW5hbEJJTUdyb3VwT0NcIikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogU3BpbmFsQklNR3JvdXBPQy5TcGluYWxCSU1Hcm91cE9DSWQrKyxcbiAgICAgICAgY3VycmVudFZhbHVlOiAwLFxuICAgICAgICB0aW1lU2VyaWVzOiBbXSxcbiAgICAgICAgcGFyZW50OiBfcGFyZW50LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBvcHVsYXRlVGltZVNlcmllcygpO1xuICAgICAgdGhpcy5kaXNwbGF5LnNldCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwb3B1bGF0ZVRpbWVTZXJpZXMoKSB7XG4gICAgbGV0IG1heCA9IDMwO1xuICAgIGlmICh0aGlzLnRpbWVTZXJpZXMubGVuZ3RoID49IG1heCkge1xuICAgICAgdGhpcy50aW1lU2VyaWVzLnNoaWZ0KCk7XG4gICAgICB0aGlzLnRpbWVTZXJpZXMucHVzaCh0aGlzLmN1cnJlbnRWYWx1ZS5nZXQoKSlcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVTZXJpZXMucHVzaCh0aGlzLmN1cnJlbnRWYWx1ZS5nZXQoKSlcbiAgICB9XG4gIH1cblxuICByZWZyZXNoQ29sb3JzKF9jb2xvcmluZ1R5cGUpIHtcbiAgICBsZXQgbmV3Y29sb3IgPSBjb2xvcnMuY29sb3JCeVZhbHVlKHRoaXMuY3VycmVudFZhbHVlLmdldCgpLCA0MCwgOTApXG4gICAgdGhpcy5jb2xvci5zZXQobmV3Y29sb3IpO1xuICAgIGxldCBkYmlkcyA9IHRoaXMuYXJyYXlPZklkKCk7XG4gICAgaWYgKF9jb2xvcmluZ1R5cGUgPT09IDEpIHtcbiAgICAgIGxldCBvcGFjaXR5ID0gMC41XG4gICAgICBsZXQgY29sb3JSR0IgPSBjb2xvcnMudG9SR0IodGhpcy5jb2xvci5nZXQoKSwgb3BhY2l0eSlcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkJJTU9iamVjdHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGdldFZpZXdlcigpLnNldFRoZW1pbmdDb2xvcih0aGlzLkJJTU9iamVjdHNbaW5kZXhdLmlkLmdldCgpLFxuICAgICAgICAgIGNvbG9yUkdCKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZ2V0Vmlld2VyKCkuc2V0Q29sb3JNYXRlcmlhbChkYmlkcywgdGhpcy5jb2xvci5nZXQoKSk7XG4gICAgfVxuICAgIHJldHVybiBkYmlkcztcbiAgfVxuXG4gIGNvbnRhaW5zKGl0ZW1JZCkge1xuICAgIHJldHVybiB0aGlzLmFycmF5T2ZJZCgpLmluZGV4T2YoaXRlbUlkKSAhPT0gLTE7XG4gIH1cblxuICBhZGRJdGVtKGl0ZW1JZCkge1xuICAgIGlmICghdGhpcy5jb250YWlucyhpdGVtSWQpKSB7XG4gICAgICBsZXQgbmV3QklNT2JqZWN0ID0gbmV3IFNwaW5hbEJJTU9iamVjdE9DKGl0ZW1JZCwgdGhpcy5pZC5nZXQoKSk7XG4gICAgICBuZXdCSU1PYmplY3QuZmlsbEluZm8oKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5CSU1PYmplY3RzLnB1c2gobmV3QklNT2JqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cblxuICBhZGRJdGVtcyhpbnB1dCkge1xuICAgIC8vIGlucHV0IGlzIGEgbGlzdCBvZiBCSU1PYmplY3RzIHRvIGFkZFxuICAgIGlucHV0LmZvckVhY2goaSA9PiB7XG4gICAgICBpZiAodGhpcy5CSU1PYmplY3RzLmluZGV4T2YoaSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuQklNT2JqZWN0cy5wdXNoKGkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlSXRlbXMoaW5wdXQpIHtcbiAgICAvLyBpbnB1dCBpcyBhIGxpc3Qgb2YgQklNT2JqZWN0cyB0byBiZSByZW1vdmVkXG4gICAgdmFyIHJlbW92ZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBpbmRleCA9IHRoaXMuQklNT2JqZWN0cy5pbmRleE9mKGlucHV0W2ldKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2godGhpcy5CSU1PYmplY3RzW2luZGV4XS5nZXQoKSk7XG4gICAgICAgIHRoaXMuQklNT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtb3ZlZEl0ZW1zO1xuICB9XG5cbiAgYXJyYXlPZklkKCkge1xuICAgIGxldCB0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkJJTU9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLkJJTU9iamVjdHNbaV07XG4gICAgICB0LnB1c2goaXRlbS5pZC5nZXQoKSk7XG4gICAgfVxuICAgIHJldHVybiB0O1xuICB9XG5cbiAgaXNvbGF0ZSgpIHtcbiAgICBnZXRWaWV3ZXIoKS5pc29sYXRlQnlJZCh0aGlzLmFycmF5T2ZJZCgpKTtcbiAgfVxuXG5cbn1cblNwaW5hbEJJTUdyb3VwT0MuU3BpbmFsQklNR3JvdXBPQ0lkID0gMFxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsQklNR3JvdXBPQ10pIl19