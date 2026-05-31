import plugin from "../../../../lib/plugins/plugin.js";
import { DatabaseApp } from "./database/index.js";
import { bindApp } from "../function/bindApp.js";

export class DatabasePlugin extends plugin {
  constructor() {
    super({
      name: "宝塔:数据库管理",
      dsc: "宝塔面板数据库管理",
      event: "message",
      priority: 5000,
      rule: DatabaseApp.rules,
    });
  }
}

bindApp(DatabasePlugin, DatabaseApp);
