import plugin from "../../../../lib/plugins/plugin.js";
import { CrontabApp } from "./crontab/index.js";
import { bindApp } from "../function/bindApp.js";

export class CrontabPlugin extends plugin {
  constructor() {
    super({
      name: "宝塔:计划任务",
      dsc: "宝塔面板计划任务管理",
      event: "message",
      priority: 5000,
      rule: CrontabApp.rules,
    });
  }
}

bindApp(CrontabPlugin, CrontabApp);
