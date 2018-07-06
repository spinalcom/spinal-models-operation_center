const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
import Vue from "vue";
const height = 200;
const width = 400;
export default class PanelManager {
  constructor(_viewer, _panelButton) {
    this.panelsGroup = {};
    this.buttons = {};
    this.managerB = new Autodesk.Viewing.UI.ComboButton("manager");
    this.viewer = _viewer;
    this.organizeB = new Autodesk.Viewing.UI.Button("organize");
    this.currentApp = null;
    this.init();
    this.panelButton = Vue.extend(_panelButton);
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
      if (app != this.currentApp)
        this.panelsGroup[app].forEach(panel => {
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