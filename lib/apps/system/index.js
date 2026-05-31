import { getSystemTotal } from "./GetSystemTotal.js";
import { getDiskInfo } from "./GetDiskInfo.js";
import { getMemInfo } from "./GetMemInfo.js";
import { getCpuInfo } from "./GetCpuInfo.js";
import { getLoadAverage } from "./GetLoadAverage.js";
import { getNetWork } from "./GetNetWork.js";
import { reMemory } from "./ReMemory.js";
import { reWeb } from "./ReWeb.js";
import { clearSystem } from "./ClearSystem.js";
import { serviceAdmin } from "./ServiceAdmin.js";
import { checkMaster } from "../../function/auth.js";
import { replyHandle } from "../../function/format.js";

const commands = [
  { reg: /^#系统状态$/, fnc: "getSystemStatus", desc: "查看服务器完整状态" },
  { reg: /^#磁盘信息$/, fnc: "getDiskStatus", desc: "查看磁盘分区信息" },
  { reg: /^#内存详情$/, fnc: "getMemStatus", desc: "查看内存详细信息" },
  { reg: /^#CPU详情$/, fnc: "getCpuStatus", desc: "查看 CPU 详细信息" },
  { reg: /^#系统负载$/, fnc: "getLoadStatus", desc: "查看系统负载" },
  { reg: /^#网络流量$/, fnc: "getNetStatus", desc: "查看网络流量" },
  { reg: /^#释放内存$/, fnc: "doReMemory", desc: "释放系统内存缓存" },
  { reg: /^#重启面板$/, fnc: "doReWeb", desc: "重启宝塔面板服务" },
  { reg: /^#清理系统$/, fnc: "doClearSystem", desc: "清理系统垃圾文件" },
  {
    reg: /^#服务(重启|启动|停止|重载)\s+(\S+)$/,
    fnc: "doServiceAdmin",
    desc: "管理服务启停，如 #服务重启 nginx",
  },
];

const serviceTypeMap = {
  重启: "restart",
  启动: "start",
  停止: "stop",
  重载: "reload",
};

export const SystemApp = {
  rules: commands,

  getSystemStatus(e) {
    return replyHandle(e, "系统状态", () => getSystemTotal());
  },
  getDiskStatus(e) {
    return replyHandle(e, "磁盘信息", () => getDiskInfo());
  },
  getMemStatus(e) {
    return replyHandle(e, "内存详情", () => getMemInfo());
  },
  getCpuStatus(e) {
    return replyHandle(e, "CPU详情", () => getCpuInfo());
  },
  getLoadStatus(e) {
    return replyHandle(e, "系统负载", () => getLoadAverage());
  },
  getNetStatus(e) {
    return replyHandle(e, "网络流量", () => getNetWork());
  },
  doReMemory(e) {
    if (!checkMaster(e)) return;
    return replyHandle(e, "释放内存", () => reMemory());
  },
  doReWeb(e) {
    if (!checkMaster(e)) return;
    return replyHandle(e, "重启面板", () => reWeb());
  },
  doClearSystem(e) {
    if (!checkMaster(e)) return;
    return replyHandle(e, "清理系统", () => clearSystem());
  },
  doServiceAdmin(e) {
    if (!checkMaster(e)) return;
    const type = serviceTypeMap[e.msg.match(commands[9].reg)[1]];
    const name = e.msg.match(commands[9].reg)[2];
    return replyHandle(e, "服务管理", () => serviceAdmin(name, type));
  },
};
