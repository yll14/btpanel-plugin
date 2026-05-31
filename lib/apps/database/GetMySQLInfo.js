import { btAction } from "../../api/index.js";

export async function getMysqlInfo() {
  const res = await btAction("database", "GetMySQLInfo");
  const info = res.data || res;
  if (!info || typeof info !== "object") return res.msg || "暂无信息";
  const lines = Object.entries(info)
    .slice(0, 12)
    .map(([k, v]) => `• ${k}：${v}`);
  return `【MySQL 配置】\n\n${lines.join("\n")}`;
}
