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

import ConfigurationNode from "./ConfigurationNode"
import Forest from "./Forest"
import SpinalBIMGroupOC from "./SpinalBIMGroupOC"
import SpinalBIMObjectOC from "./SpinalBIMObjectOC"
import RelForestOptions from "./RelForestOptions"
import Options from "./Options"





class OperationCenter extends globalType.Model {
  constructor(name = "OperationCenter") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        relForestOptions: new Ptr(new RelForestOptions()),
        networkForest: new Ptr(new Forest())
      });
    }
  }
}



export {
  OperationCenter,
  ConfigurationNode,
  Forest,
  SpinalBIMGroupOC,
  SpinalBIMObjectOC,
  RelForestOptions,
  Options
}


// exports.OperationCenter = OperationCenter;
// exports.BasicConfigurationNode = BasicConfigurationNode;
// exports.ConfigurationNode = ConfigurationNode;
// exports.ConfigurationRoot = ConfigurationRoot;
// exports.Forest = Forest;
// exports.SpinalBIMGroupOC = SpinalBIMGroupOC;
// exports.SpinalBIMObjectOC = SpinalBIMObjectOC;
spinalCore.register_models([OperationCenter])