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
          label: '系统状态',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetSystemTotal.system',
          label: '系统名称',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.version',
          label: '面板版本',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.time',
          label: '运行时间',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memTotal',
          label: '总物理内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memRealUsed',
          label: '实际使用内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memAvailable',
          label: '可用内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memFree',
          label: '空闲内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memBuffers',
          label: '缓冲区内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memCached',
          label: '缓存内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.memShared',
          label: '共享内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.cpuNum',
          label: 'CPU 核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetSystemTotal.cpuRealUsed',
          label: 'CPU 使用率',
          component: 'Switch',
          required: true,
        },
        {
          label: '磁盘信息',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetDiskInfo.diskPath',
          label: '挂载路径',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetDiskInfo.diskType',
          label: '文件系统类型',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetDiskInfo.diskTotal',
          label: '总量',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetDiskInfo.diskUsed',
          label: '已用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetDiskInfo.diskAvail',
          label: '可用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetDiskInfo.diskUsage',
          label: '使用率',
          component: 'Switch',
          required: true,
        },
        {
          label: '内存详情',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetMemInfo.memTotal',
          label: '总内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetMemInfo.memRealUsed',
          label: '实际使用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetMemInfo.memAvailable',
          label: '可用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetMemInfo.memFree',
          label: '空闲',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetMemInfo.memBuffers',
          label: '缓冲区',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetMemInfo.memCached',
          label: '缓存',
          component: 'Switch',
          required: true,
        },
        {
          label: 'CPU详情',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetCpuInfo.cpuModel',
          label: 'CPU 型号',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetCpuInfo.cpuUsageTotal',
          label: '整体使用率',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetCpuInfo.cpuLogicNum',
          label: '逻辑核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetCpuInfo.cpuPhysCores',
          label: '物理核心数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetCpuInfo.cpuPhysNum',
          label: '物理 CPU 数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetCpuInfo.cpuPerCore',
          label: '各核心使用率',
          component: 'Switch',
          required: true,
        },
        {
          label: '系统负载',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetLoadAverage.loadOne',
          label: '1 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetLoadAverage.loadFive',
          label: '5 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetLoadAverage.loadFifteen',
          label: '15 分钟负载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetLoadAverage.loadSafe',
          label: '安全阈值',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetLoadAverage.loadMax',
          label: '最大负载',
          component: 'Switch',
          required: true,
        },
        {
          label: '网络流量',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.GetNetWork.netSystem',
          label: '操作系统',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetNetWork.netTime',
          label: '运行时间',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetNetWork.netRate',
          label: '上传/下载速率',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetNetWork.netTotal',
          label: '总上传/总下载',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.GetNetWork.netNic',
          label: '各网卡流量',
          component: 'Switch',
          required: true,
        },
        {
          label: '操作结果 (释放内存、重启面板等)',
          component: 'SOFT_GROUP_BEGIN',
        },
        {
          field: 'system.ReMemory.reMemTotal',
          label: '释放内存-总内存',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ReMemory.reMemFree',
          label: '释放内存-空闲',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ReMemory.reMemRealUsed',
          label: '释放内存-实际使用',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ReWeb.result',
          label: '重启面板结果',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ClearSystem.clearCount',
          label: '清理系统-文件数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ClearSystem.clearBytes',
          label: '清理系统-字节数',
          component: 'Switch',
          required: true,
        },
        {
          field: 'system.ServiceAdmin.result',
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
