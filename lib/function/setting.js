import YAML from "yaml";
import chokidar from "chokidar";
import fs from "node:fs";
import { _PATH, PluginName_zh, PluginName_en } from "./function.js";
class Setting {
  constructor() {
    this.configPath = `${_PATH}/plugins/${PluginName_en}/config/`;
    this.config = {};
    this.watcher = { config: {} };
  }
  merge() {
    let sets = {};
    this.mergeDir(this.configPath, sets);
    return sets;
  }
  mergeDir(dir, target) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        target[entry.name] = target[entry.name] || {};
        this.mergeDir(`${dir}/${entry.name}`, target[entry.name]);
      } else if (entry.name.endsWith(".yaml")) {
        const name = entry.name.replace(/\.yaml$/, "");
        target[name] = YAML.parse(
          fs.readFileSync(`${dir}/${entry.name}`, "utf8"),
        );
      }
    }
  }
  analysis(config) {
    for (let key of Object.keys(config)) {
      if (key === "system") {
        for (let [name, data] of Object.entries(config[key])) {
          this.setNestedConfig(key, name, data);
        }
        continue;
      }
      this.setConfig(key, config[key]);
    }
  }
  setNestedConfig(folder, name, data) {
    const dir = `${this.configPath}${folder}/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    try {
      fs.writeFileSync(`${dir}${name}.yaml`, YAML.stringify(data), "utf8");
    } catch (error) {
      logger.error(`[${folder}/${name}] 写入失败 ${error}`);
      return false;
    }
  }
  getData(path, filename) {
    path = `${this.dataPath}${path}/`;
    try {
      if (!fs.existsSync(`${path}${filename}.yaml`)) {
        return;
      }
      return YAML.parse(fs.readFileSync(`${path}${filename}.yaml`, "utf8"));
    } catch (error) {
      logger.error(`[${filename}] 读取失败 ${error}`);
      return false;
    }
  }
  setData(path, filename, data) {
    path = `${this.dataPath}${path}/`;
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      fs.writeFileSync(`${path}${filename}.yaml`, YAML.stringify(data), "utf8");
    } catch (error) {
      logger.error(`[${filename}] 写入失败 ${error}`);
      return false;
    }
  }
  getconfigSet(app) {
    return this.getYaml(app, "config");
  }
  getConfig(app) {
    return { ...this.getconfigSet(app), ...this.getYaml(app, "config") };
  }
  setConfig(app, Object) {
    return this.setYaml(app, "config", {
      ...this.getconfigSet(app),
      ...Object,
    });
  }
  setYaml(app, type, Object) {
    let file = this.getFilePath(app, type);
    try {
      fs.writeFileSync(file, YAML.stringify(Object), "utf8");
    } catch (error) {
      logger.error(`[${app}] 写入失败 ${error}`);
      return false;
    }
  }
  getYaml(app, type) {
    let file = this.getFilePath(app, type);
    if (this[type][app]) return this[type][app];
    try {
      this[type][app] = YAML.parse(fs.readFileSync(file, "utf8"));
    } catch (error) {
      logger.error(`[${app}] 格式错误 ${error}`);
      return false;
    }
    this.watch(file, app, type);
    return this[type][app];
  }
  getFilePath(app, type) {
    if (type === "config") return `${this.configPath}${app}.yaml`;
    else {
      try {
        if (!fs.existsSync(`${this.configPath}${app}.yaml`)) {
          fs.copyFileSync(
            `${this.configPath}${app}.yaml`,
            `${this.configPath}${app}.yaml`,
          );
        }
      } catch (error) {
        logger.error(`缺失默认文件[${app}]${error}`);
      }
      return `${this.configPath}${app}.yaml`;
    }
  }
  watch(file, app, type = "config") {
    if (this.watcher[type][app]) return;

    const watcher = chokidar.watch(file);
    watcher.on("change", (path) => {
      delete this[type][app];
      logger.mark(`[${PluginName_zh}][修改配置文件][${type}][${app}]`);
      if (this[`change_${app}`]) {
        this[`change_${app}`]();
      }
    });
    this.watcher[type][app] = watcher;
  }
}
export default new Setting();
