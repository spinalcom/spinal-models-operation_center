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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QYW5lbE1hbmFnZXIuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiaGVpZ2h0Iiwid2lkdGgiLCJQYW5lbE1hbmFnZXIiLCJjb25zdHJ1Y3RvciIsIl92aWV3ZXIiLCJfcGFuZWxCdXR0b24iLCJwYW5lbHNHcm91cCIsImJ1dHRvbnMiLCJtYW5hZ2VyQiIsIkF1dG9kZXNrIiwiVmlld2luZyIsIlVJIiwiQ29tYm9CdXR0b24iLCJ2aWV3ZXIiLCJvcmdhbml6ZUIiLCJCdXR0b24iLCJjdXJyZW50QXBwIiwiaW5pdCIsInBhbmVsQnV0dG9uIiwiVnVlIiwiZXh0ZW5kIiwibWFuYWdlckJMYWJlbCIsIm1hbmFnZXJCSWNvbiIsImljb24iLCJjb250YWluZXIiLCJmaXJzdENoaWxkIiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwic2V0VG9vbFRpcCIsInN1YlRvb2xiYXIiLCJ0b29sYmFyIiwiZ2V0Q29udHJvbCIsIkNvbnRyb2xHcm91cCIsImFkZENvbnRyb2wiLCJvcmdhbml6ZUJMYWJlbCIsIm9yZ2FuaXplQkljb24iLCJvbkNsaWNrIiwib3JnYW5pemVQYW5lbHMiLCJyZWdpc3RlclBhbmVsIiwiX3BhbmVsIiwiX2dyb3VwIiwicHVzaCIsIl9jb250YWluZXIyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ2dWUiLCIkbW91bnQiLCJfZGF0YSIsInBhbmVsIiwiZ3JvdXAiLCJzaG93Q29udGVudCIsImN1cnJlbnRIZWlnaHQiLCJpbmRleCIsImxlbmd0aCIsInN0eWxlIiwibGVmdCIsImNoZWNrUmVnaXN0ZXJhdGlvbiIsImFwcCIsImZvckVhY2giLCJ0aXRsZUxhYmVsIiwicmVnaXN0ZXJCdXR0b24iLCJfYnV0dG9uIiwiaXNWaXNpYmxlIiwic2V0VmlzaWJsZSIsInJlbmRlckdyb3VwIiwiaGlkZVBhbmVscyIsImNvZWZmIiwiaGVp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QUE0QixXQUFXRixTQUFYLEdBQXVCLElBQW5EO0FBQ0Q7QUFDRCxVQUFJbkIsTUFBTUUsV0FBVixFQUF1QjtBQUNyQkYsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnZELE1BQXRCLEdBQStCQSxNQUEvQjtBQUNELE9BRkQsTUFFTztBQUNMaUQsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnZELE1BQXRCLEdBQStCLE1BQS9CO0FBQ0Q7QUFDRCxVQUFJaUQsTUFBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQkMsSUFBdEIsR0FBNkIsTUFBakMsRUFBeUM7QUFDdkNZLHFCQUFhLFFBQVFuQixNQUFNekIsU0FBTixDQUFnQitCLEtBQWhCLENBQXNCdkQsTUFBM0M7QUFDRDtBQUNGO0FBQ0Y7O0FBRURxQyxtQkFBaUI7QUFDZixRQUFJLEtBQUtyQixVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCLFdBQUtWLFdBQUwsQ0FBaUIsS0FBS1UsVUFBdEIsRUFBa0MyQyxPQUFsQyxDQUEwQ1YsU0FBUztBQUNqREEsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQkMsSUFBdEIsR0FBNkIsS0FBN0I7QUFDQVAsY0FBTXpCLFNBQU4sQ0FBZ0IrQixLQUFoQixDQUFzQnRELEtBQXRCLEdBQThCLE9BQTlCO0FBQ0FnRCxjQUFNRSxXQUFOLEdBQW9CLElBQXBCO0FBQ0QsT0FKRDtBQUtBLFdBQUtjLFdBQUwsQ0FBaUIsS0FBS2pELFVBQXRCO0FBQ0Q7QUFFRjtBQTFKK0I7a0JBQWJkLFkiLCJmaWxlIjoiUGFuZWxNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5jb25zdCBoZWlnaHQgPSAyMDA7XG5jb25zdCB3aWR0aCA9IDQwMDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKF92aWV3ZXIsIF9wYW5lbEJ1dHRvbikge1xuICAgIHRoaXMucGFuZWxzR3JvdXAgPSB7fTtcbiAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcbiAgICB0aGlzLm1hbmFnZXJCID0gbmV3IEF1dG9kZXNrLlZpZXdpbmcuVUkuQ29tYm9CdXR0b24oXCJtYW5hZ2VyXCIpO1xuICAgIHRoaXMudmlld2VyID0gX3ZpZXdlcjtcbiAgICB0aGlzLm9yZ2FuaXplQiA9IG5ldyBBdXRvZGVzay5WaWV3aW5nLlVJLkJ1dHRvbihcIm9yZ2FuaXplXCIpO1xuICAgIHRoaXMuY3VycmVudEFwcCA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5wYW5lbEJ1dHRvbiA9IFZ1ZS5leHRlbmQoX3BhbmVsQnV0dG9uKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgbWFuYWdlckJMYWJlbCA9IFwiRWRpdGluZ1wiO1xuICAgIGNvbnN0IG1hbmFnZXJCSWNvbiA9IFwic2V0dGluZ3NcIjtcblxuICAgIGxldCBpY29uID0gdGhpcy5tYW5hZ2VyQi5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICBpY29uLmNsYXNzTmFtZSA9IFwiYWRzay1idXR0b24taWNvbiBtZC1pY29uIG1kLWljb24tZm9udCBtZC10aGVtZS1kZWZhdWx0XCI7XG4gICAgaWNvbi5pbm5lckhUTUwgPSBtYW5hZ2VyQkljb247XG4gICAgdGhpcy5tYW5hZ2VyQi5zZXRUb29sVGlwKG1hbmFnZXJCTGFiZWwpO1xuICAgIGxldCBzdWJUb29sYmFyID0gdGhpcy52aWV3ZXIudG9vbGJhci5nZXRDb250cm9sKFwic3BpbmFsY29tXCIpO1xuICAgIGlmICghc3ViVG9vbGJhcikge1xuICAgICAgc3ViVG9vbGJhciA9IG5ldyBBdXRvZGVzay5WaWV3aW5nLlVJLkNvbnRyb2xHcm91cChcInNwaW5hbGNvbVwiKTtcbiAgICAgIHRoaXMudmlld2VyLnRvb2xiYXIuYWRkQ29udHJvbChzdWJUb29sYmFyKTtcbiAgICB9XG4gICAgc3ViVG9vbGJhci5hZGRDb250cm9sKHRoaXMubWFuYWdlckIpO1xuXG4gICAgY29uc3Qgb3JnYW5pemVCTGFiZWwgPSBcIk9yZ2FuaXplXCI7XG4gICAgY29uc3Qgb3JnYW5pemVCSWNvbiA9IFwiT1wiO1xuICAgIGljb24gPSB0aGlzLm9yZ2FuaXplQi5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICBpY29uLmNsYXNzTmFtZSA9IFwiYWRzay1idXR0b24taWNvbiBtZC1pY29uIG1kLWljb24tZm9udCBtZC10aGVtZS1kZWZhdWx0XCI7XG4gICAgaWNvbi5pbm5lckhUTUwgPSBvcmdhbml6ZUJJY29uO1xuICAgIHRoaXMub3JnYW5pemVCLnNldFRvb2xUaXAob3JnYW5pemVCTGFiZWwpO1xuICAgIHRoaXMubWFuYWdlckIuYWRkQ29udHJvbCh0aGlzLm9yZ2FuaXplQik7XG4gICAgdGhpcy5vcmdhbml6ZUIub25DbGljayA9ICgpID0+IHtcbiAgICAgIHRoaXMub3JnYW5pemVQYW5lbHMoKTtcbiAgICB9O1xuICB9XG5cbiAgcmVnaXN0ZXJQYW5lbChfcGFuZWwsIF9ncm91cCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0gPSBbXTtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXS5wdXNoKF9wYW5lbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXS5wdXNoKF9wYW5lbCk7XG4gICAgfVxuICAgIC8vIGlmICghdGhpcy5jaGVja1JlZ2lzdGVyYXRpb24oX3BhbmVsKSkge1xuICAgIHZhciBfY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBfcGFuZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKF9jb250YWluZXIyKTtcbiAgICBsZXQgdnVlID0gbmV3IHRoaXMucGFuZWxCdXR0b24oKS4kbW91bnQoX2NvbnRhaW5lcjIpO1xuICAgIHZ1ZS5fZGF0YS5wYW5lbCA9IF9wYW5lbDtcbiAgICB2dWUuX2RhdGEuZ3JvdXAgPSBfZ3JvdXA7XG4gICAgX3BhbmVsLnNob3dDb250ZW50ID0gdHJ1ZTtcbiAgICBfcGFuZWwuY3VycmVudEhlaWdodCA9IFwiMzVweFwiO1xuXG5cbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0ubGVuZ3RoIC0gMTtcbiAgICB2dWUuX2RhdGEuaW5kZXggPSBpbmRleDtcbiAgICBfcGFuZWwuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuXG4gICAgLy8gbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJCVVRUT05cIik7XG4gICAgLy8gYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhfcGFuZWwpO1xuXG4gICAgLy8gICBpZiAoX3BhbmVsLnNob3dDb250ZW50KSB7XG4gICAgLy8gICAgIF9wYW5lbC5zaG93Q29udGVudCA9IGZhbHNlO1xuXG4gICAgLy8gICAgIF9wYW5lbC5jb250YWluZXIuc3R5bGUubWluSGVpZ2h0ID0gXCIzNXB4XCI7XG4gICAgLy8gICAgIF9wYW5lbC5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcblxuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgX3BhbmVsLnNob3dDb250ZW50ID0gdHJ1ZTtcbiAgICAvLyAgICAgX3BhbmVsLmNvbnRhaW5lci5zdHlsZS5taW5IZWlnaHQgPSBcIjM1cHhcIjtcbiAgICAvLyAgICAgX3BhbmVsLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG5cbiAgICAvLyAgIH1cbiAgICAvLyB9O1xuICAgIC8vIGJ0bi5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIlxuICAgIC8vIF9wYW5lbC50aXRsZS5hcHBlbmRDaGlsZChidG4pO1xuICAgIC8vIGNvbnNvbGUubG9nKF9wYW5lbC50aXRsZSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWNvbiA9IGJ0bi5jb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICAvLyBpY29uLmNsYXNzTmFtZSA9IFwiYWRzay1idXR0b24taWNvbiBtZC1pY29uIG1kLWljb24tZm9udCBtZC10aGVtZS1kZWZhdWx0XCI7XG4gICAgLy8gaWNvbi5pbm5lckhUTUwgPSBcInBcIjtcbiAgfVxuXG4gIGNoZWNrUmVnaXN0ZXJhdGlvbihfcGFuZWwpIHtcbiAgICBmb3IgKGxldCBhcHAgaW4gdGhpcy5wYW5lbHNHcm91cCkge1xuICAgICAgdGhpcy5wYW5lbHNHcm91cFthcHBdLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgICBpZiAocGFuZWwudGl0bGVMYWJlbCA9PT0gX3BhbmVsLnRpdGxlTGFiZWwpIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlZ2lzdGVyQnV0dG9uKF9idXR0b24sIF9ncm91cCkge1xuICAgIHRoaXMuYnV0dG9uc1tfZ3JvdXBdID0gX2J1dHRvbjtcblxuICAgIHRoaXMubWFuYWdlckIuYWRkQ29udHJvbChfYnV0dG9uKTtcbiAgICBfYnV0dG9uLm9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRBcHAgPSBfZ3JvdXA7XG4gICAgICB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0uZm9yRWFjaChwYW5lbCA9PiB7XG4gICAgICAgIGlmICghcGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICBwYW5lbC5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhbmVsLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVuZGVyR3JvdXAoX2dyb3VwKTtcbiAgICB9O1xuICAgIHRoaXMuaGlkZVBhbmVscygpO1xuICB9XG5cbiAgaGlkZVBhbmVscygpIHtcbiAgICBmb3IgKGxldCBhcHAgaW4gdGhpcy5wYW5lbHNHcm91cCkge1xuICAgICAgaWYgKGFwcCAhPSB0aGlzLmN1cnJlbnRBcHApXG4gICAgICAgIHRoaXMucGFuZWxzR3JvdXBbYXBwXS5mb3JFYWNoKHBhbmVsID0+IHtcbiAgICAgICAgICBwYW5lbC5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlckdyb3VwKF9ncm91cCkge1xuICAgIGxldCBjb2VmZiA9IDEgLyB0aGlzLnBhbmVsc0dyb3VwW19ncm91cF0ubGVuZ3RoO1xuICAgIGxldCBoZWlnaHQgPSBcImNhbGMoIDgwJSAqIFwiICsgY29lZmYgKyBcIiApXCI7XG4gICAgbGV0IGhlaWdodEFjYyA9IFwiMHB4XCI7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucGFuZWxzR3JvdXBbX2dyb3VwXS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbHNHcm91cFtfZ3JvdXBdW2luZGV4XTtcbiAgICAgIGlmIChwYW5lbC5jb250YWluZXIuc3R5bGUubGVmdCA8IFwiMTBweFwiKSB7XG4gICAgICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS5taW5IZWlnaHQgPSBcIjM1cHhcIjtcbiAgICAgICAgcGFuZWwuY29udGFpbmVyLnN0eWxlLnRvcCA9IFwiY2FsYyggXCIgKyBoZWlnaHRBY2MgKyBcIiApXCI7XG4gICAgICB9XG4gICAgICBpZiAocGFuZWwuc2hvd0NvbnRlbnQpIHtcbiAgICAgICAgcGFuZWwuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjM1cHhcIjtcbiAgICAgIH1cbiAgICAgIGlmIChwYW5lbC5jb250YWluZXIuc3R5bGUubGVmdCA8IFwiMTBweFwiKSB7XG4gICAgICAgIGhlaWdodEFjYyArPSBcIiArIFwiICsgcGFuZWwuY29udGFpbmVyLnN0eWxlLmhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvcmdhbml6ZVBhbmVscygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50QXBwICE9IG51bGwpIHtcbiAgICAgIHRoaXMucGFuZWxzR3JvdXBbdGhpcy5jdXJyZW50QXBwXS5mb3JFYWNoKHBhbmVsID0+IHtcbiAgICAgICAgcGFuZWwuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICBwYW5lbC5jb250YWluZXIuc3R5bGUud2lkdGggPSBcIjQwMHB4XCI7XG4gICAgICAgIHBhbmVsLnNob3dDb250ZW50ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZW5kZXJHcm91cCh0aGlzLmN1cnJlbnRBcHApO1xuICAgIH1cblxuICB9XG59Il19