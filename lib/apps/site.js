import plugin from "../../../../lib/plugins/plugin.js";
import { SiteApp } from "./site/index.js";
import { bindApp } from "../function/bindApp.js";

export class SitePlugin extends plugin {
  constructor() {
    super({
      name: "宝塔:网站管理",
      dsc: "宝塔面板网站管理",
      event: "message",
      priority: 5000,
      rule: SiteApp.rules,
    });
  }
}

bindApp(SitePlugin, SiteApp);
