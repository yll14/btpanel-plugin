import { btAction } from "../../api/index.js";
import { typeMap, sTypeMap } from "./utils.js";

export async function listCrontab() {
  const tasks = await btAction("crontab", "GetCrontab");
  if (!Array.isArray(tasks) || !tasks.length) return "暂无计划任务";

  const lines = tasks.map((t) => {
    const status = t.status === 1 ? "启用" : "暂停";
    const cycle = `${typeMap[t.type] || t.type} ${t.where_hour ?? ""}:${String(t.where_minute ?? "").padStart(2, "0")}`;
    return `• [${t.id}] ${t.name} (${status})\n  类型：${sTypeMap[t.sType] || t.sType} | 周期：${cycle}\n  内容：${(t.sBody || "").slice(0, 80)}`;
  });
  return `【计划任务】共 ${tasks.length} 个\n\n${lines.join("\n\n")}`;
}
