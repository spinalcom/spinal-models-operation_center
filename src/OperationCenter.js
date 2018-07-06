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
let getViewer = function() {
  return globalType.v;
}




import RelForestOptions from "./RelForestOptions"
import RelOperationCenter from "./RelOperationCenter"
import RelZoneAggregates from "./RelZoneAggregates"
import RelZoneAggregatesList from "./RelZoneAggregatesList"
import Forest from "./Forest"
import NetworkList from "./NetworkList"
import DeviceForest from "./DeviceForest"
import ZoneForest from "./ZoneForest"
import SpinalNode from "./SpinalNode"
import DeviceNode from "./DeviceNode"
import ZoneNode from "./ZoneNode"
import OperationCenterObject from "./OperationCenterObject"
import Device from "./Device"
import ZoneList from "./ZoneList"

import Zone from "./Zone"
import SpinalBIMGroupOC from "./SpinalBIMGroupOC"
import SpinalBIMObjectOC from "./SpinalBIMObjectOC"
import Options from "./Options"
import Endpoint from "./Endpoint"
import EndpointGroup from "./EndpointGroup"
import PanelManager from "./PanelManager"




class OperationCenter extends globalType.Model {
  constructor(name = "OperationCenter") {
    super();
    if (FileSystem._sig_server) {
      let options = new Options()

      options.add_attr({
        endpointNameId: 0,
        equipementNameId: 0,
        endpointGroupNameId: 0
      })
      let zoneForest = new ZoneForest();
      // let deviceForest = new DeviceForest();
      let networkList = new NetworkList();
      this.add_attr({
        relForestOptionsZone: new Ptr(new RelForestOptions("zoneForest",
          zoneForest)),
        networkList: new Ptr(networkList),
        relZoneAggregatesList: new Ptr(new RelZoneAggregatesList()),
        zoneList: new Ptr(new ZoneList()),
        deviceList: new Ptr(new Lst()),
        options: options
      });
    }
  }
}



export {
  OperationCenter,
  RelOperationCenter,
  RelForestOptions,
  RelZoneAggregates,
  RelZoneAggregatesList,
  Forest,
  NetworkList,
  DeviceForest,
  ZoneForest,
  SpinalNode,
  DeviceNode,
  ZoneNode,
  OperationCenterObject,
  Device,
  ZoneList,
  Zone,
  SpinalBIMGroupOC,
  SpinalBIMObjectOC,
  Options,
  Endpoint,
  EndpointGroup,
  PanelManager
}

spinalCore.register_models([OperationCenter])