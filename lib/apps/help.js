import plugin from "../../../../lib/plugins/plugin.js";
import {
  GetConfig,
  _PATH,
  PluginName_zh,
  image,
  PluginName_en,
} from "../function/function.js";
export class DialyHotHelp extends plugin {
  constructor() {
    super({
      name: `桉南:${PluginName_zh}:热榜帮助`,
      event: "message",
      priority: 1000,
      rule: [
        {
          reg: /^[#/!]?(daily|dailyhot|热榜)(帮助|help)$/i,
          fnc: "DialyHotHelp",
        },
      ],
    });
  }

  async DialyHotHelp(e) {
    let { config } = GetConfig(`/lib/defSet`, `help`);
    config = config;
    let { img } = await image(e, "help", "help", {
      saveId: "help",
      cwd: _PATH,
      Path: `${_PATH}/plugins/${PluginName_en}/resources/`,
      Data: config,
      version: global.XINGLUO.PluginVersion,
      author: global.XINGLUO.PluginAuthor,
    });
    e.reply(img);
  }
}
