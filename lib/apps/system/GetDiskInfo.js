import { btAction } from "../../api/index.js";
import { cfg, formatMsg } from "./utils.js";

export async function getDiskInfo() {
  const disks = await btAction("system", "GetDiskInfo");
  const config = cfg("GetDiskInfo");
  if (!Array.isArray(disks) || !disks.length) return "暂无磁盘信息";

  const lines = disks
    .map((d) => {
      const size = d.size || [];
      const parts = [
        config.diskPath && `${d.path}`,
        config.diskType && `[${d.type}]`,
        config.diskTotal && `总量 ${size[0] || "-"}`,
        config.diskUsed && `已用 ${size[1] || "-"}`,
        config.diskAvail && `可用 ${size[2] || "-"}`,
        config.diskUsage && `${size[3] || "-"}`,
      ].filter(Boolean);
      return parts.length ? `• ${parts.join(" ")}` : null;
    })
    .filter(Boolean);

  return formatMsg("磁盘信息", lines.join("\n"));
}
