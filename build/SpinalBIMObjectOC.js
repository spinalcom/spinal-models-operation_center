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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxCSU1PYmplY3RPQy5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJCSU1Gb3JnZSIsImdldFZpZXdlciIsInYiLCJTcGluYWxCSU1PYmplY3RPQyIsIml0ZW1JZCIsImdyb3VwSWQiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpZCIsInNldCIsImRpc3BsYXkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldFByb3BlcnRpZXMiLCJnZXQiLCJyIiwiU3BpbmFsQklNT2JqZWN0Rm9yZ2UiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7QUFDQSxJQUFNRSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsSUFBTUMsV0FBV0QsUUFBUSx5QkFBUixDQUFqQjs7QUFFQSxJQUFJRSxZQUFZLFNBQVpBLFNBQVksR0FBVztBQUN6QixTQUFPTixXQUFXTyxDQUFsQjtBQUNELENBRkQ7O0lBSXFCQyxpQjs7O0FBQ25CLDZCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUF5RDtBQUFBLFFBQTVCQyxJQUE0Qix1RUFBckIsbUJBQXFCOztBQUFBOztBQUFBOztBQUV2RCxRQUFJQyxXQUFXQyxXQUFmLEVBQTRCO0FBQzFCLFlBQUtDLFFBQUwsQ0FBYztBQUNaSixpQkFBU0E7QUFERyxPQUFkO0FBR0EsWUFBS0ssRUFBTCxDQUFRQyxHQUFSLENBQVlQLE1BQVo7QUFDQSxZQUFLUSxPQUFMLENBQWFELEdBQWIsQ0FBaUIsSUFBakI7QUFDRDtBQVJzRDtBQVN4RDs7OzsrQkFFVTtBQUFBOztBQUNULGFBQU8sSUFBSUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q2Qsb0JBQVllLGFBQVosQ0FBMEIsT0FBS04sRUFBTCxDQUFRTyxHQUFSLEVBQTFCLEVBQXlDLGFBQUs7QUFDNUMsaUJBQUtYLElBQUwsQ0FBVUssR0FBVixDQUFjTyxFQUFFWixJQUFoQjtBQUNBUTtBQUNELFNBSEQ7QUFJRCxPQUxNLENBQVA7QUFNRDs7OztFQW5CNENkLFNBQVNtQixvQjs7a0JBQW5DaEIsaUI7OztBQXNCckJMLFdBQVdzQixlQUFYLENBQTJCLENBQUNqQixpQkFBRCxDQUEzQiIsImZpbGUiOiJTcGluYWxCSU1PYmplY3RPQy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IEJJTUZvcmdlID0gcmVxdWlyZShcInNwaW5hbC1tb2RlbHMtYmltX2ZvcmdlXCIpO1xuXG5sZXQgZ2V0Vmlld2VyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxUeXBlLnY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaW5hbEJJTU9iamVjdE9DIGV4dGVuZHMgQklNRm9yZ2UuU3BpbmFsQklNT2JqZWN0Rm9yZ2Uge1xuICBjb25zdHJ1Y3RvcihpdGVtSWQsIGdyb3VwSWQsIG5hbWUgPSBcIlNwaW5hbEJJTU9iamVjdE9DXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZFxuICAgICAgfSk7XG4gICAgICB0aGlzLmlkLnNldChpdGVtSWQpO1xuICAgICAgdGhpcy5kaXNwbGF5LnNldCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmaWxsSW5mbygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZ2V0Vmlld2VyKCkuZ2V0UHJvcGVydGllcyh0aGlzLmlkLmdldCgpLCByID0+IHtcbiAgICAgICAgdGhpcy5uYW1lLnNldChyLm5hbWUpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsQklNT2JqZWN0T0NdKSJdfQ==