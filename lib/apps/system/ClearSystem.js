import { btAction } from "../../api/index.js";
import { cfg } from "./utils.js";

export async function clearSystem() {
  const d = await btAction("system", "ClearSystem");
  const config = cfg("ClearSystem");

  if (Array.isArray(d)) {
    const parts = [
      config.clearCount && `${d[0]} 个文件`,
      config.clearBytes && `${d[1]} 字节`,
    ].filter(Boolean);
    if (!parts.length) return "当前配置未启用任何显示项";
    return `系统清理完成：${parts.join("，")}`;
  }

  if (!config.clearCount && !config.clearBytes)
    return "当前配置未启用任何显示项";
  return d.msg || "系统清理完成";
}
