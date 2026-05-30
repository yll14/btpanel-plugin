import plugin from "../../../../lib/plugins/plugin.js";
import {
  GetConfig,
  _PATH,
  PluginName_zh,
  image,
  PluginName_en,
} from "../function/function.js";

export class BTpanelHelp extends plugin {
  constructor() {
    super({
      name: `桉南:${PluginName_zh}:帮助`,
      event: "message",
      priority: 1000,
      rule: [
        {
          reg: /^[#/!]?(宝塔|btpanel|BT)(帮助|help)$/i,
          fnc: "BTpanelHelp",
        },
      ],
    });
  }

  async BTpanelHelp(e) {
    let config = GetConfig(`/lib/defSet`, `help`);
    let { img } = await image(e, "help", "help", {
      saveId: "help",
      cwd: _PATH,
      Path: `${_PATH}/plugins/${PluginName_en}/resources/`,
      Data: config,
      version: global.BTpanelPlugin.PluginVersion,
      author: global.BTpanelPlugin.PluginAuthor,
    });
    e.reply(img);
  }
}
