import plugin from "../../../../lib/plugins/plugin.js";
import { WarningApp } from "./warning/index.js";
import { bindApp } from "../function/bindApp.js";

export class WarningPlugin extends plugin {
  constructor() {
    super({
      name: "宝塔:安全扫描",
      dsc: "宝塔面板安全扫描",
      event: "message",
      priority: 5000,
      rule: WarningApp.rules,
    });
  }
}

bindApp(WarningPlugin, WarningApp);
