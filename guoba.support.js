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
      author:  global.BTpanelPlugin.PluginAuthor,
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
          field: 'Config.API_SK',
          label: 'API密钥',
          bottomHelpMessage: '宝塔面板API密钥',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入API密钥'
          }
        },
        {
          label: '系统信息配置',
          component: 'SOFT_GROUP_BEGIN',  
        },
        {
          field: 'System.system',
          label: '是否显示系统信息',
          bottomHelpMessage: '是否显示系统信息',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.version',
          label: '是否显示面板版本',
          bottomHelpMessage: '是否显示面板版本',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.time',
          label: '是否显示运行时间',
          bottomHelpMessage: '是否显示运行时间',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memTotal',
          label: '是否显示总物理内存',
          bottomHelpMessage: '是否显示总物理内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memRealUsed',
          label: '是否显示实际使用内存',
          bottomHelpMessage: '是否显示实际使用内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memAvailable',
          label: '是否显示可用内存',
          bottomHelpMessage: '是否显示可用内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memFree',
          label: '是否显示空闲内存',
          bottomHelpMessage: '是否显示空闲内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memBuffers',
          label: '是否显示缓冲区内存',
          bottomHelpMessage: '是否显示缓冲区内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memCached',
          label: '是否显示缓存内存',
          bottomHelpMessage: '是否显示缓存内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.memShared',
          label: '是否显示共享内存',
          bottomHelpMessage: '是否显示共享内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuNum',
          label: '是否显示CPU核心数',
          bottomHelpMessage: '是否显示CPU核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuRealUsed',
          label: '是否显示CPU使用率',
          bottomHelpMessage: '#系统状态',
          component: 'Switch',
          required: true,
        },
        {
          label: '磁盘信息',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'System.diskPath',
          label: '挂载路径',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.diskType',
          label: '文件系统类型',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.diskTotal',
          label: '总量',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.diskUsed',
          label: '已用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.diskAvail',
          label: '可用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.diskUsage',
          label: '使用率',
          component: 'Switch',
          required: true,
        },
        {
          label: 'CPU详情',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'System.cpuModel',
          label: 'CPU 型号',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuUsageTotal',
          label: '整体使用率',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuLogicNum',
          label: '逻辑核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuPhysCores',
          label: '物理核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuPhysNum',
          label: '物理 CPU 数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.cpuPerCore',
          label: '各核心使用率',
          component: 'Switch',
          required: true,
        },
        {
          label: '系统负载',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'System.loadOne',
          label: '1 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.loadFive',
          label: '5 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.loadFifteen',
          label: '15 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.loadSafe',
          label: '安全阈值',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.loadMax',
          label: '最大负载',
          component: 'Switch',
          required: true,
        },
        {
          label: '网络流量',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'System.netSystem',
          label: '操作系统',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.netTime',
          label: '运行时间',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.netRate',
          label: '上传/下载速率',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.netTotal',
          label: '总上传/总下载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.netNic',
          label: '各网卡流量',
          component: 'Switch',
          required: true,
        },
        {
          label: '操作结果反馈',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'System.reMemTotal',
          label: '释放内存-总内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.reMemFree',
          label: '释放内存-空闲',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.reMemRealUsed',
          label: '释放内存-实际使用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.reWebResult',
          label: '重启面板结果',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.clearCount',
          label: '清理系统-文件数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.clearBytes',
          label: '清理系统-字节数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'System.serviceResult',
          label: '服务管理结果',
          component: 'Switch',
          required: true,
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
