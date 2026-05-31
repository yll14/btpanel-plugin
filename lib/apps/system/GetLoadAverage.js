import { btAction } from "../../api/index.js";
import { buildSection } from "../../function/format.js";
import { cfg, formatMsg } from "./utils.js";

export async function getLoadAverage() {
  const d = await btAction("system", "GetLoadAverage");
  const config = cfg("GetLoadAverage");

  const threshold = [
    config.loadSafe && `安全阈值：${d.safe}`,
    config.loadMax && `最大：${d.max}`,
  ].filter(Boolean);

  const body = buildSection("📈 系统负载", [
    config.loadOne && `• 1 分钟：${d.one}`,
    config.loadFive && `• 5 分钟：${d.five}`,
    config.loadFifteen && `• 15 分钟：${d.fifteen}`,
    threshold.length && `• ${threshold.join(" / ")}`,
  ]);

  return formatMsg("系统负载", body);
}
