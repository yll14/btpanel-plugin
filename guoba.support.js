import setting from "./lib/function/setting.js";
import lodash from "lodash";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { PluginName_en, PluginName_zh } from "./lib/function/function.js";
export function supportGuoba() {
  return {
    pluginInfo: {
      name: `${PluginName_en}`,
      title: `${PluginName_zh}(${PluginName_en})`,
      author:  global.XINGLUO.PluginAuthor,
      authorLink: "https://gitee.com/yll14/",
      link: "https://gitee.com/yll14/btpanel-plugin",
      showInMenu: "auto",
      isV3: true,
      isV2: false,
      description: `宝塔面板运维插件`,
      icon: "mdi:stove",
      iconColor: "#d19f56",
      iconPath: path.join(__dirname, "resources/img/icon/bt_logo.png"),
    },
    configInfo: {
      schemas: [
        {
          label: '面板地址配置',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'Config.bt_url',
          label: '宝塔面板地址',
          bottomHelpMessage: '宝塔面板地址，不带安全路口',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入API地址'
          }
        },
        {
          label: '面板API_SK配置',
          component: 'SOFT_GROUP_BEGIN',  
        },
        {
          field: 'Config.API_SK',
          label: 'API密钥',
          bottomHelpMessage: '宝塔面板API密钥',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入API密钥'
          }
        },
      ],
      getConfigData() {
        return setting.merge();
      },
      setConfigData(data, { Result }) {
        let config = {};
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value);
        }
        config = lodash.merge({}, setting.merge, config);
        setting.analysis(config);
        return Result.ok({}, "保存成功~ 重启后生效");
      },
    },
  };
}
