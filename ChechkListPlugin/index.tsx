import React from 'react'; 
import { IPlugin, IPluginApi } from "@qandq/cloud-gcs-core";
const packageJson = require("./package.json") as any;
import { createRoot } from 'react-dom/client';

import { Sidebar } from "./components/Sidebar";

export const getAttributes = (): any => {
  return {
    name: packageJson.name,
    libraryName: packageJson.libraryName,
    version: packageJson.version,
    config: {},
  };
};

class TestPlugin implements IPlugin {
  PluginApi: IPluginApi;

  constructor(pluginHelper: IPluginApi) {
    this.PluginApi = pluginHelper;
  }
  init() {
    const root = createRoot(this.PluginApi.pluginUIManager.getRootElement()); 
    root.render(<Sidebar pluginApi={this.PluginApi} />);

  }
}

export default TestPlugin;
