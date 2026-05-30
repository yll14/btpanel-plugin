import { btAction, findInTable } from '../../api/index.js'

export async function siteStop(name) {
  const site = await findInTable('sites', name)
  if (!site) return `未找到网站：${name}`
  const res = await btAction('site', 'SiteStop', { id: site.id, name: site.name })
  return res.msg || '站点已停止'
}
