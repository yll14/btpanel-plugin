import { btPost } from "../function/function.js";

/**
 * 调用宝塔面板 API
 * @param {string} module 路由模块，如 system / site / data
 * @param {string} action 接口 action
 * @param {object} params 额外参数
 */
export async function btAction(module, action, params = {}) {
  const path = `/${module}?action=${encodeURIComponent(action)}`;
  return btPost(path, { action, ...params });
}

/**
 * 查询面板 SQLite 数据表
 * @param {string} table sites / databases / ftps / domain / crontab 等
 */
export async function getDataTable(table, params = {}) {
  const res = await btAction("data", "getData", {
    table,
    type: "-1",
    list: "true",
    p: "1",
    limit: "100",
    ...params,
  });
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

/**
 * 按名称查找数据表记录
 */
export async function findInTable(table, name, field = "name") {
  const list = await getDataTable(table, { search: name, limit: "50" });
  return list.find((item) => item[field] === name) || list[0] || null;
}
