import yaml from "yaml";
import fs from "node:fs";
import { _PATH, PluginName_en, PluginPath } from "../function/function.js";
import path from "node:path";

export default new (class Init {
  async init() {
    if (!global.BTpanelPlugin) global.BTpanelPlugin = {};
    try {
      await this.loadConfig();
      await this.globalVersion();
      await this.globalAuthor();
      return { boolean: true, msg: null };
    } catch (error) {
      return { boolean: false, msg: error };
    }
  }

  async loadConfig() {
    let configFolder = `${PluginPath}/config`;
    let defSetFolder = `${PluginPath}/lib/defSet`;
    if (!fs.existsSync(configFolder)) {
      fs.mkdirSync(configFolder);
    }

    for (const name of ["Config", "System"]) {
      const configFilePath = `${configFolder}/${name}.yaml`;
      const defConfigFilePath = `${defSetFolder}/${name}.yaml`;
      if (!fs.existsSync(defConfigFilePath)) continue;

      if (!fs.existsSync(configFilePath)) {
        fs.copyFileSync(defConfigFilePath, configFilePath);
        continue;
      }

      const defConfig = yaml.parse(
        fs.readFileSync(defConfigFilePath, "utf8"),
      );
      let config = yaml.parse(fs.readFileSync(configFilePath, "utf8"));
      let updated = false;
      for (const key in defConfig) {
        if (!config.hasOwnProperty(key)) {
          config[key] = defConfig[key];
          updated = true;
        }
      }
      if (updated) {
        fs.writeFileSync(configFilePath, yaml.stringify(config), "utf8");
        logger.info(
          logger.green(
            `[${PluginName_en}]${path.basename(configFilePath)}配置文件缺少键值，已从defSet文件夹中更新`,
          ),
        );
      }
    }
  }
  async globalVersion() {
    let PluginVersion = JSON.parse(
      fs.readFileSync(`./plugins/${PluginName_en}/package.json`, `utf-8`),
    );
    PluginVersion = PluginVersion.version;
    global.BTpanelPlugin.PluginVersion = PluginVersion;
  }
  async globalAuthor() {
    let PluginAuthor = "桉南";
    global.BTpanelPlugin.PluginAuthor = PluginAuthor;
  }
})();
