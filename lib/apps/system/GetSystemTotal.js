import { btAction } from "../../api/index.js";
import { buildSection } from "../../function/format.js";
import { cfg, formatMsg } from "./utils.js";

export async function getSystemTotal() {
  const data = await btAction("system", "GetSystemTotal");
  const config = cfg("GetSystemTotal");

  const body =
    buildSection("🖥️ 系统信息", [
      config.system && `• 系统：${data.system}`,
      config.version && `• 面板版本：${data.version}`,
      config.time && `• 运行时间：${data.time}`,
    ]) +
    buildSection("📊 内存信息", [
      config.memTotal &&
        `• 总物理内存：${data.memTotal} MB (${data.memNewTotal})`,
      config.memRealUsed &&
        `• 实际使用内存：${data.memRealUsed} MB (${data.memNewRealUsed})`,
      config.memAvailable && `• 可用内存：${data.memAvailable} MB`,
      config.memFree && `• 空闲内存：${data.memFree} MB`,
      config.memBuffers && `• 缓冲区内存：${data.memBuffers} MB`,
      config.memCached && `• 缓存内存：${data.memCached} MB`,
      config.memShared && `• 共享内存：${data.memShared} MB`,
    ]) +
    buildSection("💻 CPU 信息", [
      config.cpuNum && `• CPU 核心数：${data.cpuNum} 核`,
      config.cpuRealUsed && `• CPU 使用率：${data.cpuRealUsed}%`,
    ]);

  return formatMsg("服务器系统基础统计", body);
}
