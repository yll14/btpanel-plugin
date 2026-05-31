import { btAction, findInTable } from "../../api/index.js";

export async function siteStart(name) {
  const site = await findInTable("sites", name);
  if (!site) return `未找到网站：${name}`;
  const res = await btAction("site", "SiteStart", {
    id: site.id,
    name: site.name,
  });
  return res.msg || "站点已启用";
}
