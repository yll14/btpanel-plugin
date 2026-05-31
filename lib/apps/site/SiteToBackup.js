import { btAction, findInTable } from "../../api/index.js";

export async function siteBackup(name) {
  const site = await findInTable("sites", name);
  if (!site) return `未找到网站：${name}`;
  const res = await btAction("site", "ToBackup", { id: site.id });
  return res.msg || "备份任务已提交";
}
