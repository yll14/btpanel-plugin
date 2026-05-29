import yaml from "yaml";
import fs from "node:fs";
import { _PATH, PluginName_en, PluginPath } from "../function/function.js";
import path from "node:path";

export default new (class Init {
  async init() {
    if (!global.XINGLUO) global.XINGLUO = {};
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
  
    const ConfigFilePath = `${configFolder}/Config.yaml`;
    const defConfigFilePath = `${defSetFolder}/Config.yaml`;
    if (!fs.existsSync(ConfigFilePath)) {
      fs.copyFileSync(defConfigFilePath, ConfigFilePath);
    } else {
      const defConfig = yaml.parse(
        fs.readFileSync(defConfigFilePath, "utf8"),
      );
      let Config = yaml.parse(fs.readFileSync(ConfigFilePath, "utf8"));
      let updated = false;
      for (const key in defConfig) {
        if (!Config.hasOwnProperty(key)) {
          Config[key] = defConfig[key];
          updated = true;
        }
      }
      if (updated) {
        const updatedConfigYAML = yaml.stringify(Config);
        fs.writeFileSync(ConfigFilePath, updatedConfigYAML, "utf8");
        logger.info(
          logger.green(
            `[${PluginName_en}]${path.basename(ConfigFilePath)}配置文件缺少键值，已从defSet文件夹中更新`,
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
    global.XINGLUO.PluginVersion = PluginVersion;
  }
  async globalAuthor() {
    let PluginAuthor = "桉南";
    global.XINGLUO.PluginAuthor = PluginAuthor;
  }
})();
