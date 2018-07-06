"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

const height = 200;
const width = 400;
class PanelManager {
  constructor(_viewer, _panelButton) {
    this.panelsGroup = {};
    this.buttons = {};
    this.managerB = new Autodesk.Viewing.UI.ComboButton("manager");
    this.viewer = _viewer;
    this.organizeB = new Autodesk.Viewing.UI.Button("organize");
    this.currentApp = null;
    this.init();
    this.panelButton = _vue2.default.extend(_panelButton);
  }

  init() {
    const managerBLabel = "Editing";
    const managerBIcon = "settings";

    let icon = this.managerB.container.firstChild;
    icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
    icon.innerHTML = managerBIcon;
    this.managerB.setToolTip(managerBLabel);
    let subToolbar = this.viewer.toolbar.getControl("spinalcom");
    if (!subToolbar) {
      subToolbar = new Autodesk.Viewing.UI.ControlGroup("spinalcom");
      this.viewer.toolbar.addControl(subToolbar);
    }
    subToolbar.addControl(this.managerB);

    const organizeBLabel = "Organize";
    const organizeBIcon = "O";
    icon = this.organizeB.container.firstChild;
    icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
    icon.innerHTML = organizeBIcon;
    this.organizeB.setToolTip(organizeBLabel);
    this.managerB.addControl(this.organizeB);
    this.organizeB.onClick = () => {
      this.organizePanels();
    };
  }

  registerPanel(_panel, _group) {
    if (typeof this.panelsGroup[_group] === "undefined") {
      this.panelsGroup[_group] = [];
      this.panelsGroup[_group].push(_panel);
    } else {
      this.panelsGroup[_group].push(_panel);
    }
    // if (!this.checkRegisteration(_panel)) {
    var _container2 = document.createElement("div");

    _panel.container.appendChild(_container2);
    let vue = new this.panelButton().$mount(_container2);
    vue._data.panel = _panel;
    vue._data.group = _group;
    _panel.showContent = true;
    _panel.currentHeight = "35px";

    let index = this.panelsGroup[_group].length - 1;
    vue._data.index = index;
    _panel.container.style.left = "0px";

    // let btn = document.createElement("BUTTON");
    // btn.onclick = () => {
    //   console.log(_panel);

    //   if (_panel.showContent) {
    //     _panel.showContent = false;

    //     _panel.container.style.minHeight = "35px";
    //     _panel.container.style.height = "0px";

    //   } else {
    //     _panel.showContent = true;
    //     _panel.container.style.minHeight = "35px";
    //     _panel.container.style.height = "200px";

    //   }
    // };
    // btn.style.height = "50px"
    // _panel.title.appendChild(btn);
    // console.log(_panel.title);
    // }

    // icon = btn.container.firstChild;
    // icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
    // icon.innerHTML = "p";
  }

  checkRegisteration(_panel) {
    for (let app in this.panelsGroup) {
      this.panelsGroup[app].forEach(panel => {
        if (panel.titleLabel === _panel.titleLabel) return true;
      });
    }
    return false;
  }

  registerButton(_button, _group) {
    this.buttons[_group] = _button;

    this.managerB.addControl(_button);
    _button.onClick = () => {
      this.currentApp = _group;
      this.panelsGroup[_group].forEach(panel => {
        if (!panel.isVisible()) {
          panel.setVisible(true);
        } else {
          panel.setVisible(false);
        }
      });
      this.renderGroup(_group);
    };
    this.hidePanels();
  }

  hidePanels() {
    for (let app in this.panelsGroup) {
      if (app != this.currentApp) this.panelsGroup[app].forEach(panel => {
        panel.setVisible(false);
      });
    }
  }
  renderGroup(_group) {
    let coeff = 1 / this.panelsGroup[_group].length;
    let height = "calc( 80% * " + coeff + " )";
    let heightAcc = "0px";
    for (let index = 0; index < this.panelsGroup[_group].length; index++) {
      const panel = this.panelsGroup[_group][index];
      if (panel.container.style.left < "10px") {
        panel.container.style.minHeight = "35px";
        panel.container.style.top = "calc( " + heightAcc + " )";
      }
      if (panel.showContent) {
        panel.container.style.height = height;
      } else {
        panel.container.style.height = "35px";
      }
      if (panel.container.style.left < "10px") {
        heightAcc += " + " + panel.container.style.height;
      }
    }
  }

  organizePanels() {
    if (this.currentApp != null) {
      this.panelsGroup[this.currentApp].forEach(panel => {
        panel.container.style.left = "0px";
        panel.container.style.width = "400px";
        panel.showContent = true;
      });
      this.renderGroup(this.currentApp);
    }
  }
}
exports.default = PanelManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QYW5lbE1hbmFnZXIuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiaGVpZ2h0Iiwid2lkdGgiLCJQYW5lbE1hbmFnZXIiLCJjb25zdHJ1Y3RvciIsIl92aWV3ZXIiLCJfcGFuZWxCdXR0b24iLCJwYW5lbHNHcm91cCIsImJ1dHRvbnMiLCJtYW5hZ2VyQiIsIkF1dG9kZXNrIiwiVmlld2luZyIsIlVJIiwiQ29tYm9CdXR0b24iLCJ2aWV3ZXIiLCJvcmdhbml6ZUIiLCJCdXR0b24iLCJjdXJyZW50QXBwIiwiaW5pdCIsInBhbmVsQnV0dG9uIiwiVnVlIiwiZXh0ZW5kIiwibWFuYWdlckJMYWJlbCIsIm1hbmFnZXJCSWNvbiIsImljb24iLCJjb250YWluZXIiLCJmaXJzdENoaWxkIiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwic2V0VG9vbFRpcCIsInN1YlRvb2xiYXIiLCJ0b29sYmFyIiwiZ2V0Q29udHJvbCIsIkNvbnRyb2xHcm91cCIsImFkZENvbnRyb2wiLCJvcmdhbml6ZUJMYWJlbCIsIm9yZ2FuaXplQkljb24iLCJvbkNsaWNrIiwib3JnYW5pemVQYW5lbHMiLCJyZWdpc3RlclBhbmVsIiwiX3BhbmVsIiwiX2dyb3VwIiwicHVzaCIsIl9jb250YWluZXIyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ2dWUiLCIkbW91bnQiLCJfZGF0YSIsInBhbmVsIiwiZ3JvdXAiLCJzaG93Q29udGVudCIsImN1cnJlbnRIZWlnaHQiLCJpbmRleCIsImxlbmd0aCIsInN0eWxlIiwibGVmdCIsImNoZWNrUmVnaXN0ZXJhdGlvbiIsImFwcCIsImZvckVhY2giLCJ0aXRsZUxhYmVsIiwicmVnaXN0ZXJCdXR0b24iLCJfYnV0dG9uIiwiaXNWaXNpYmxlIiwic2V0VmlzaWJsZSIsInJlbmRlckdyb3VwIiwiaGlkZVBhbmVscyIsImNvZWZmIiwiaGVp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QUE0QixXQUFXRixTQUFYLEdBQXVCLElBQW5EO0FBQ0Q7QUFDRCxVQUFJbkIsTUFBTUUsV0FBVixFQUF1QjtBQUNyQkYsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnZELE1BQXRCLEdBQStCQSxNQUEvQjtBQUNELE9BRkQsTUFFTztBQUNMaUQsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnZELE1BQXRCLEdBQStCLE1BQS9CO0FBQ0Q7QUFDRCxVQUFJaUQsTUFBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQkMsSUFBdEIsR0FBNkIsTUFBakMsRUFBeUM7QUFDdkNZLHFCQUFhLFFBQVFuQixNQUFNekIsU0FBTixDQUFnQitCLEtBQWhCLENBQXNCdkQsTUFBM0M7QUFDRDtBQUNGO0FBQ0Y7O0FBRURxQyxtQkFBaUI7QUFDZixRQUFJLEtBQUtyQixVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCLFdBQUtWLFdBQUwsQ0FBaUIsS0FBS1UsVUFBdEIsRUFBa0MyQyxPQUFsQyxDQUEwQ1YsU0FBUztBQUNqREEsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQkMsSUFBdEIsR0FBNkIsS0FBN0I7QUFDQVAsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnRELEtBQXRCLEdBQThCLE9BQTlCO0FBQ0FnRCxjQUFNRSxXQUFOLEdBQW9CLElBQXBCO0FBQ0QsT0FKRDtBQUtBLFdBQUtjLFdBQUwsQ0FBaUIsS0FBS2pELFVBQXRCO0FBQ0Q7QUFFRjtBQXpKK0I7a0JBQWJkLFkiLCJmaWxlIjoiUGFuZWxNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5jb25zdCBoZWlnaHQgPSAyMDA7XG5jb25zdCB3aWR0aCA9IDQwMDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKF92aWV3ZXIsIF9wYW5lbEJ1dHRvbikge1xuICAgIHRoaXMucGFuZWxzR3JvdXAgPSB7fTtcbiAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcbiAgICB0aGlzLm1hbmFnZXJCID0gbmV3IEF1dG9kZXNrLlZpZXdpbmcuVUkuQ29tYm9CdXR0b24oXCJtYW5hZ2VyXCIpO1xuICAgIHRoaXMudmlld2VyID0gX3ZpZXdlcjtcbiAgICB0aGlzLm9yZ2FuaXplQiA9IG5ldyBBdXRvZGVzay5WaWV3aW5nLlVJLkJ1dHRvbihcIm9yZ2FuaXplXCIpO1xuICAgIHRoaXMuY3VycmVudEFwcCA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5wYW5lbEJ1dHRvbiA9IFZ1ZS5leHRlbmQoX3BhbmVsQnV0dG9uKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgbWFuYWdlckJMYWJlbCA9IFwiRWRpdGluZ1wiO1xuICAgIGNvbnN0IG1hbmFnZXJCSWNvbiA9IFwic2V0dGluZ3NcIjtcblxuICAgIGxldCBpY29uID0gdGhpcy5tYW5hZ2VyQi5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICBpY29uLmNsYXNzTmFtZSA9IFwiYWRzay1idXR0b24taWNvbiBtZC1pY29uIG1kLWljb24tZm9udCBtZC10aGVtZS1kZWZhdWx0XCI7XG4gICAgaWNvbi5pbm5lckhUTUwgPSBtYW5hZ2VyQkljb247XG4gICAgdGhpcy5tYW5hZ2VyQi5zZXRUb29sVGlwKG1hbmFnZXJCTGFiZWwpO1xuICAgIGxldCBzdWJUb29sYmFyID0gdGhpcy52aWV3ZXIudG9vbGJhci5nZXRDb250cm9sKFwic3BpbmFsY29tXCIpO1xuICAgIGlmICghc3ViVG9vbGJhcikge1xuICAgICAgc3ViVG9vbGJhciA9IG5ldyBBdXRvZGVzay5WaWV3aW5nLlVJLkNvbnRyb2xHcm91cChcInNwaW5hbGNvbVwiKTtcbiAgICAgIHRoaXMudmlld2VyLnRvb2xiYXIuYWRkQ29udHJvbChzdWJUb29sYmFyKTtcbiAgICB9XG4gICAgc3ViVG9vbGJhci5hZGRDb250cm9sKHRoaXMubWFuYWdlckIpO1xuXG4gICAgY29uc3Qgb3JnYW5pemVCTGFiZWwgPSBcIk9yZ2FuaXplXCI7XG4gICAgY29uc3Qgb3JnYW5pemVCSWNvbiA9IFwiT1wiO1xuICAgIGljb24gPSB0aGlzLm9yZ2FuaXplQi5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICBpY29uLmNsYXNzTmFtZSA9IFwiYWRzay1idXR0b24taWNvbiBtZC1pY29uIG1kLWljb24tZm9udCBtZC10aGVtZS1kZWZhdWx0XCI7XG4gICAgaWNvbi5pbm5lckhUTUwgPSBvcmdhbml6ZUJJY29uO1xuICAgIHRoaXMub3JnYW5pemVCLnNldFRvb2xUaXAob3JnYW5pemVCTGFiZWwpO1xuICAgIHRoaXMubWFuYWdlckIuYWRkQ29udHJvbCh0aGlzLm9yZ2FuaXplQik7XG4gICAgdGhpcy5vcmdhbml6ZUIub25DbGljayA9ICgpID0+IHtcbiAgICAgIHRoaXMub3JnYW5pemVQYW5lbHMoKTtcbiAgICB9O1xuICB9XG5cbiAgcmVnaXN0ZXJQYW5lbChfcGFuZWwsIF9ncm91cCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0gPSBbXTtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXS5wdXNoKF9wYW5lbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXS5wdXNoKF9wYW5lbCk7XG4gICAgfVxuICAgIC8vIGlmICghdGhpcy5jaGVja1JlZ2lzdGVyYXRpb24oX3BhbmVsKSkge1xuICAgIHZhciBfY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBfcGFuZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKF9jb250YWluZXIyKTtcbiAgICBsZXQgdnVlID0gbmV3IHRoaXMucGFuZWxCdXR0b24oKS4kbW91bnQoX2NvbnRhaW5lcjIpO1xuICAgIHZ1ZS5fZGF0YS5wYW5lbCA9IF9wYW5lbDtcbiAgICB2dWUuX2RhdGEuZ3JvdXAgPSBfZ3JvdXA7XG4gICAgX3BhbmVsLnNob3dDb250ZW50ID0gdHJ1ZTtcbiAgICBfcGFuZWwuY3VycmVudEhlaWdodCA9IFwiMzVweFwiO1xuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdLmxlbmd0aCAtIDE7XG4gICAgdnVlLl9kYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgX3BhbmVsLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcblxuICAgIC8vIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQlVUVE9OXCIpO1xuICAgIC8vIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coX3BhbmVsKTtcblxuICAgIC8vICAgaWYgKF9wYW5lbC5zaG93Q29udGVudCkge1xuICAgIC8vICAgICBfcGFuZWwuc2hvd0NvbnRlbnQgPSBmYWxzZTtcblxuICAgIC8vICAgICBfcGFuZWwuY29udGFpbmVyLnN0eWxlLm1pbkhlaWdodCA9IFwiMzVweFwiO1xuICAgIC8vICAgICBfcGFuZWwuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMHB4XCI7XG5cbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIF9wYW5lbC5zaG93Q29udGVudCA9IHRydWU7XG4gICAgLy8gICAgIF9wYW5lbC5jb250YWluZXIuc3R5bGUubWluSGVpZ2h0ID0gXCIzNXB4XCI7XG4gICAgLy8gICAgIF9wYW5lbC5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuXG4gICAgLy8gICB9XG4gICAgLy8gfTtcbiAgICAvLyBidG4uc3R5bGUuaGVpZ2h0ID0gXCI1MHB4XCJcbiAgICAvLyBfcGFuZWwudGl0bGUuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAvLyBjb25zb2xlLmxvZyhfcGFuZWwudGl0bGUpO1xuICAgIC8vIH1cblxuICAgIC8vIGljb24gPSBidG4uY29udGFpbmVyLmZpcnN0Q2hpbGQ7XG4gICAgLy8gaWNvbi5jbGFzc05hbWUgPSBcImFkc2stYnV0dG9uLWljb24gbWQtaWNvbiBtZC1pY29uLWZvbnQgbWQtdGhlbWUtZGVmYXVsdFwiO1xuICAgIC8vIGljb24uaW5uZXJIVE1MID0gXCJwXCI7XG4gIH1cblxuICBjaGVja1JlZ2lzdGVyYXRpb24oX3BhbmVsKSB7XG4gICAgZm9yIChsZXQgYXBwIGluIHRoaXMucGFuZWxzR3JvdXApIHtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbYXBwXS5mb3JFYWNoKHBhbmVsID0+IHtcbiAgICAgICAgaWYgKHBhbmVsLnRpdGxlTGFiZWwgPT09IF9wYW5lbC50aXRsZUxhYmVsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZWdpc3RlckJ1dHRvbihfYnV0dG9uLCBfZ3JvdXApIHtcbiAgICB0aGlzLmJ1dHRvbnNbX2dyb3VwXSA9IF9idXR0b247XG5cbiAgICB0aGlzLm1hbmFnZXJCLmFkZENvbnRyb2woX2J1dHRvbik7XG4gICAgX2J1dHRvbi5vbkNsaWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50QXBwID0gX2dyb3VwO1xuICAgICAgdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgICBpZiAoIXBhbmVsLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgcGFuZWwuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYW5lbC5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlckdyb3VwKF9ncm91cCk7XG4gICAgfTtcbiAgICB0aGlzLmhpZGVQYW5lbHMoKTtcbiAgfVxuXG4gIGhpZGVQYW5lbHMoKSB7XG4gICAgZm9yIChsZXQgYXBwIGluIHRoaXMucGFuZWxzR3JvdXApIHtcbiAgICAgIGlmIChhcHAgIT0gdGhpcy5jdXJyZW50QXBwKVxuICAgICAgICB0aGlzLnBhbmVsc0dyb3VwW2FwcF0uZm9yRWFjaChwYW5lbCA9PiB7XG4gICAgICAgICAgcGFuZWwuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZW5kZXJHcm91cChfZ3JvdXApIHtcbiAgICBsZXQgY29lZmYgPSAxIC8gdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdLmxlbmd0aDtcbiAgICBsZXQgaGVpZ2h0ID0gXCJjYWxjKCA4MCUgKiBcIiArIGNvZWZmICsgXCIgKVwiO1xuICAgIGxldCBoZWlnaHRBY2MgPSBcIjBweFwiO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXVtpbmRleF07XG4gICAgICBpZiAocGFuZWwuY29udGFpbmVyLnN0eWxlLmxlZnQgPCBcIjEwcHhcIikge1xuICAgICAgICBwYW5lbC5jb250YWluZXIuc3R5bGUubWluSGVpZ2h0ID0gXCIzNXB4XCI7XG4gICAgICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS50b3AgPSBcImNhbGMoIFwiICsgaGVpZ2h0QWNjICsgXCIgKVwiO1xuICAgICAgfVxuICAgICAgaWYgKHBhbmVsLnNob3dDb250ZW50KSB7XG4gICAgICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYW5lbC5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIzNXB4XCI7XG4gICAgICB9XG4gICAgICBpZiAocGFuZWwuY29udGFpbmVyLnN0eWxlLmxlZnQgPCBcIjEwcHhcIikge1xuICAgICAgICBoZWlnaHRBY2MgKz0gXCIgKyBcIiArIHBhbmVsLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb3JnYW5pemVQYW5lbHMoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEFwcCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhbmVsc0dyb3VwW3RoaXMuY3VycmVudEFwcF0uZm9yRWFjaChwYW5lbCA9PiB7XG4gICAgICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgICAgcGFuZWwuY29udGFpbmVyLnN0eWxlLndpZHRoID0gXCI0MDBweFwiO1xuICAgICAgICBwYW5lbC5zaG93Q29udGVudCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVuZGVyR3JvdXAodGhpcy5jdXJyZW50QXBwKTtcbiAgICB9XG5cbiAgfVxufSJdfQ==