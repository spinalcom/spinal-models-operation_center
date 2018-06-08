"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationRoot = exports.ConfigurationNode = exports.BasicConfigurationNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpinalBIMGroupOC = require("./SpinalBIMGroupOC");

var _SpinalBIMGroupOC2 = _interopRequireDefault(_SpinalBIMGroupOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var spinalCore = require("spinal-core-connectorjs");
var globalType = typeof window === "undefined" ? global : window;

var getViewer = function getViewer() {
  return globalType.v;
};

var BasicConfigurationNode = exports.BasicConfigurationNode = function (_globalType$Model) {
  _inherits(BasicConfigurationNode, _globalType$Model);

  function BasicConfigurationNode() {
    _classCallCheck(this, BasicConfigurationNode);

    var _this = _possibleConstructorReturn(this, (BasicConfigurationNode.__proto__ || Object.getPrototypeOf(BasicConfigurationNode)).call(this));

    if (FileSystem._sig_server) {
      _this.add_attr({
        id: 0,
        title: "",
        children: [],
        display: false,
        type: "",
        BIMGroup: new _SpinalBIMGroupOC2.default(_this),
        special: false
      });
    }

    // console.error("constructor", this.BIMGroup)
    return _this;
  }

  _createClass(BasicConfigurationNode, [{
    key: "incrementId",
    value: function incrementId() {
      this.id.set(this.id.get() + 1);
      return this.id.get();
    }
  }, {
    key: "createChild",
    value: function createChild(_type) {
      var child = new ConfigurationNode(this);
      // console.log("type", _type);
      if (_type === "zone") {
        var parentTitle = this.title.get();
        child.setTitle(parentTitle + "-" + this.incrementId().toString());
        child.type.set(_type);
      } else if (_type === "equip") {
        child.setTitle("equip" + "-" + this.incrementId().toString());
        child.type.set(_type);
      }
      this.addChild(child);
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: "addChildren",
    value: function addChildren(children) {
      for (var i = 0; i < children.length; i++) {
        this.children.push(children[i]);
      }
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      return this.children.get();
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.title.get();
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.set(title);
    }
  }, {
    key: "removeChildren",
    value: function removeChildren() {
      this.children.set(null);
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      if (this.children.length == 0) return true;else return false;
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      if (this.parent) return false;else return true;
    }
  }, {
    key: "isEquipement",
    value: function isEquipement() {
      return this.type.get() === "equip";
    }
  }, {
    key: "getEquipements",
    value: function getEquipements() {
      var equipementsArray = [];
      for (var i = 0; i < this.children.length; i++) {
        var equip = this.children[i];
        // console.log("recur", equip.type.get());
        // console.log(equipementsArray);
        // console.log(equip.isEquipement());
        if (equip.isEquipement()) equipementsArray = equipementsArray.concat(equip);else equipementsArray = equipementsArray.concat(equip.getEquipements());
      }
      return equipementsArray;
    }
  }, {
    key: "getAllBIMGroups",
    value: function getAllBIMGroups() {
      var res = [];
      res.push(this.BIMGroup);
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        res = res.concat(child.getAllBIMGroups());
      }
      return res;
    }
  }, {
    key: "test",
    value: function test() {
      console.log(this);
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var t = [];
      t = t.concat(this.BIMGroup.arrayOfId());
      for (var i = 0; i < this.children.length; i++) {
        var element = this.children[i];
        var childItems = element.getItems();
        for (var _i = 0; _i < childItems.length; _i++) {
          var _element = childItems[_i];
          if (t.indexOf(_element) === -1) t.push(_element);
        }
      }
      return t;
    }
  }, {
    key: "setAllDisplays",
    value: function setAllDisplays(_bool) {
      var t = this.getAllBIMGroups();
      for (var index = 0; index < t.length; index++) {
        var element = t[index];
        element.display.set(_bool);
      }
    }
  }]);

  return BasicConfigurationNode;
}(globalType.Model);

var ConfigurationNode = exports.ConfigurationNode = function (_BasicConfigurationNo) {
  _inherits(ConfigurationNode, _BasicConfigurationNo);

  function ConfigurationNode(newParent) {
    _classCallCheck(this, ConfigurationNode);

    var _this2 = _possibleConstructorReturn(this, (ConfigurationNode.__proto__ || Object.getPrototypeOf(ConfigurationNode)).call(this));

    _this2.add_attr({
      parent: newParent
    });
    return _this2;
  }

  _createClass(ConfigurationNode, [{
    key: "setParent",
    value: function setParent(parent) {
      // this.mod_attr("parent", parent);
      this.parent.set(parent);
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this.parent.get();
    }
  }, {
    key: "removeParent",
    value: function removeParent() {
      this.parent.set(null);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.parent.children.remove(this);
      // delete globalType.FileSystem._objects[this._server_id];
    }
  }]);

  return ConfigurationNode;
}(BasicConfigurationNode);

var ConfigurationRoot = exports.ConfigurationRoot = function (_BasicConfigurationNo2) {
  _inherits(ConfigurationRoot, _BasicConfigurationNo2);

  function ConfigurationRoot() {
    _classCallCheck(this, ConfigurationRoot);

    return _possibleConstructorReturn(this, (ConfigurationRoot.__proto__ || Object.getPrototypeOf(ConfigurationRoot)).call(this));
  }

  return ConfigurationRoot;
}(BasicConfigurationNode);

spinalCore.register_models([BasicConfigurationNode, ConfigurationNode, ConfigurationRoot]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uTm9kZS5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJnZXRWaWV3ZXIiLCJ2IiwiQmFzaWNDb25maWd1cmF0aW9uTm9kZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJ0aXRsZSIsImNoaWxkcmVuIiwiZGlzcGxheSIsInR5cGUiLCJCSU1Hcm91cCIsIlNwaW5hbEJJTUdyb3VwT0MiLCJzcGVjaWFsIiwic2V0IiwiZ2V0IiwiX3R5cGUiLCJjaGlsZCIsIkNvbmZpZ3VyYXRpb25Ob2RlIiwicGFyZW50VGl0bGUiLCJzZXRUaXRsZSIsImluY3JlbWVudElkIiwidG9TdHJpbmciLCJhZGRDaGlsZCIsInB1c2giLCJpIiwibGVuZ3RoIiwicGFyZW50IiwiZXF1aXBlbWVudHNBcnJheSIsImVxdWlwIiwiaXNFcXVpcGVtZW50IiwiY29uY2F0IiwiZ2V0RXF1aXBlbWVudHMiLCJyZXMiLCJnZXRBbGxCSU1Hcm91cHMiLCJjb25zb2xlIiwibG9nIiwidCIsImFycmF5T2ZJZCIsImVsZW1lbnQiLCJjaGlsZEl0ZW1zIiwiZ2V0SXRlbXMiLCJpbmRleE9mIiwiX2Jvb2wiLCJpbmRleCIsIk1vZGVsIiwibmV3UGFyZW50IiwicmVtb3ZlIiwiQ29uZmlndXJhdGlvblJvb3QiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsSUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsSUFBSUUsWUFBWSxTQUFaQSxTQUFZLEdBQVc7QUFDekIsU0FBT0gsV0FBV0ksQ0FBbEI7QUFDRCxDQUZEOztJQUlhQyxzQixXQUFBQSxzQjs7O0FBQ1gsb0NB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S0FBRixDQUFoQjtBQUNBTCxnQkFBUTlCLE9BQVIsQ0FBZ0JLLEdBQWhCLENBQW9CNkIsS0FBcEI7QUFDRDtBQUNGOzs7O0VBOUh5QzlDLFdBQVdnRCxLOztJQWtJMUMzQixpQixXQUFBQSxpQjs7O0FBQ1gsNkJBQVk0QixTQUFaLEVBQXVCO0FBQUE7O0FBQUE7O0FBRXJCLFdBQUt6QyxRQUFMLENBQWM7QUFDWnNCLGNBQVFtQjtBQURJLEtBQWQ7QUFGcUI7QUFLdEI7Ozs7OEJBRVNuQixNLEVBQVE7QUFDaEI7QUFDQSxXQUFLQSxNQUFMLENBQVliLEdBQVosQ0FBZ0JhLE1BQWhCO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBS0EsTUFBTCxDQUFZWixHQUFaLEVBQVA7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS1ksTUFBTCxDQUFZYixHQUFaLENBQWdCLElBQWhCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUthLE1BQUwsQ0FBWW5CLFFBQVosQ0FBcUJ1QyxNQUFyQixDQUE0QixJQUE1QjtBQUNBO0FBQ0Q7Ozs7RUF4Qm9DN0Msc0I7O0lBMkIxQjhDLGlCLFdBQUFBLGlCOzs7QUFDWCwrQkFBYztBQUFBOztBQUFBO0FBRWI7OztFQUhvQzlDLHNCOztBQU12Q1AsV0FBV3NELGVBQVgsQ0FBMkIsQ0FDekIvQyxzQkFEeUIsRUFFekJnQixpQkFGeUIsRUFHekI4QixpQkFIeUIsQ0FBM0IiLCJmaWxlIjoiQ29uZmlndXJhdGlvbk5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5pbXBvcnQgU3BpbmFsQklNR3JvdXBPQyBmcm9tIFwiLi9TcGluYWxCSU1Hcm91cE9DXCJcbmxldCBnZXRWaWV3ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFR5cGUudjtcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29uZmlndXJhdGlvbk5vZGUgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBkaXNwbGF5OiBmYWxzZSxcbiAgICAgICAgdHlwZTogXCJcIixcbiAgICAgICAgQklNR3JvdXA6IG5ldyBTcGluYWxCSU1Hcm91cE9DKHRoaXMpLFxuICAgICAgICBzcGVjaWFsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5lcnJvcihcImNvbnN0cnVjdG9yXCIsIHRoaXMuQklNR3JvdXApXG4gIH1cblxuICBpbmNyZW1lbnRJZCgpIHtcbiAgICB0aGlzLmlkLnNldCh0aGlzLmlkLmdldCgpICsgMSk7XG4gICAgcmV0dXJuIHRoaXMuaWQuZ2V0KCk7XG4gIH1cblxuICBjcmVhdGVDaGlsZChfdHlwZSkge1xuICAgIGxldCBjaGlsZCA9IG5ldyBDb25maWd1cmF0aW9uTm9kZSh0aGlzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInR5cGVcIiwgX3R5cGUpO1xuICAgIGlmIChfdHlwZSA9PT0gXCJ6b25lXCIpIHtcbiAgICAgIGxldCBwYXJlbnRUaXRsZSA9IHRoaXMudGl0bGUuZ2V0KCk7XG4gICAgICBjaGlsZC5zZXRUaXRsZShwYXJlbnRUaXRsZSArIFwiLVwiICsgdGhpcy5pbmNyZW1lbnRJZCgpLnRvU3RyaW5nKCkpO1xuICAgICAgY2hpbGQudHlwZS5zZXQoX3R5cGUpO1xuICAgIH0gZWxzZSBpZiAoX3R5cGUgPT09IFwiZXF1aXBcIikge1xuICAgICAgY2hpbGQuc2V0VGl0bGUoXCJlcXVpcFwiICsgXCItXCIgKyB0aGlzLmluY3JlbWVudElkKCkudG9TdHJpbmcoKSk7XG4gICAgICBjaGlsZC50eXBlLnNldChfdHlwZSk7XG4gICAgfVxuICAgIHRoaXMuYWRkQ2hpbGQoY2hpbGQpO1xuICB9XG5cbiAgYWRkQ2hpbGQoY2hpbGQpIHtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIGFkZENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5nZXQoKTtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlLmdldCgpO1xuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLnNldCh0aXRsZSk7XG4gIH1cblxuICByZW1vdmVDaGlsZHJlbigpIHtcbiAgICB0aGlzLmNoaWxkcmVuLnNldChudWxsKTtcbiAgfVxuXG4gIGlzTGVhZigpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1Jvb3QoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSByZXR1cm4gZmFsc2U7XG4gICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRXF1aXBlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlLmdldCgpID09PSBcImVxdWlwXCI7XG4gIH1cblxuICBnZXRFcXVpcGVtZW50cygpIHtcbiAgICBsZXQgZXF1aXBlbWVudHNBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZXF1aXAgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN1clwiLCBlcXVpcC50eXBlLmdldCgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVxdWlwZW1lbnRzQXJyYXkpO1xuICAgICAgLy8gY29uc29sZS5sb2coZXF1aXAuaXNFcXVpcGVtZW50KCkpO1xuICAgICAgaWYgKGVxdWlwLmlzRXF1aXBlbWVudCgpKVxuICAgICAgICBlcXVpcGVtZW50c0FycmF5ID0gZXF1aXBlbWVudHNBcnJheS5jb25jYXQoZXF1aXApO1xuICAgICAgZWxzZSBlcXVpcGVtZW50c0FycmF5ID0gZXF1aXBlbWVudHNBcnJheS5jb25jYXQoZXF1aXAuZ2V0RXF1aXBlbWVudHMoKSk7XG4gICAgfVxuICAgIHJldHVybiBlcXVpcGVtZW50c0FycmF5O1xuICB9XG5cbiAgZ2V0QWxsQklNR3JvdXBzKCkge1xuICAgIGxldCByZXMgPSBbXTtcbiAgICByZXMucHVzaCh0aGlzLkJJTUdyb3VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgIHJlcyA9IHJlcy5jb25jYXQoY2hpbGQuZ2V0QWxsQklNR3JvdXBzKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgdGVzdCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzKVxuICB9XG5cbiAgZ2V0SXRlbXMoKSB7XG4gICAgbGV0IHQgPSBbXTtcbiAgICB0ID0gdC5jb25jYXQodGhpcy5CSU1Hcm91cC5hcnJheU9mSWQoKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgIGxldCBjaGlsZEl0ZW1zID0gZWxlbWVudC5nZXRJdGVtcygpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZEl0ZW1zW2ldO1xuICAgICAgICBpZiAodC5pbmRleE9mKGVsZW1lbnQpID09PSAtMSkgdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIHNldEFsbERpc3BsYXlzKF9ib29sKSB7XG4gICAgbGV0IHQgPSB0aGlzLmdldEFsbEJJTUdyb3VwcygpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRbaW5kZXhdO1xuICAgICAgZWxlbWVudC5kaXNwbGF5LnNldChfYm9vbCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Ob2RlIGV4dGVuZHMgQmFzaWNDb25maWd1cmF0aW9uTm9kZSB7XG4gIGNvbnN0cnVjdG9yKG5ld1BhcmVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBwYXJlbnQ6IG5ld1BhcmVudFxuICAgIH0pO1xuICB9XG5cbiAgc2V0UGFyZW50KHBhcmVudCkge1xuICAgIC8vIHRoaXMubW9kX2F0dHIoXCJwYXJlbnRcIiwgcGFyZW50KTtcbiAgICB0aGlzLnBhcmVudC5zZXQocGFyZW50KTtcbiAgfVxuXG4gIGdldFBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0KCk7XG4gIH1cblxuICByZW1vdmVQYXJlbnQoKSB7XG4gICAgdGhpcy5wYXJlbnQuc2V0KG51bGwpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnJlbW92ZSh0aGlzKTtcbiAgICAvLyBkZWxldGUgZ2xvYmFsVHlwZS5GaWxlU3lzdGVtLl9vYmplY3RzW3RoaXMuX3NlcnZlcl9pZF07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Sb290IGV4dGVuZHMgQmFzaWNDb25maWd1cmF0aW9uTm9kZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1xuICBCYXNpY0NvbmZpZ3VyYXRpb25Ob2RlLFxuICBDb25maWd1cmF0aW9uTm9kZSxcbiAgQ29uZmlndXJhdGlvblJvb3Rcbl0pIl19