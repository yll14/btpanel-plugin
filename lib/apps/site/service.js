import { btAction, getDataTable, findInTable } from '../../api/index.js'

export async function listSites() {
  const sites = await getDataTable('sites')
  if (!sites.length) return '暂无网站'

  const lines = sites.map((s) => {
    const status = s.status === '1' || s.status === 1 ? '运行中' : '已停止'
    return `• [${s.id}] ${s.name} (${status})\n  路径：${s.path}${s.ps ? `\n  备注：${s.ps}` : ''}`
  })
  return `【网站列表】共 ${sites.length} 个\n\n${lines.join('\n\n')}`
}

export async function siteStart(name) {
  const site = await findInTable('sites', name)
  if (!site) return `未找到网站：${name}`
  const res = await btAction('site', 'SiteStart', { id: site.id, name: site.name })
  return res.msg || '站点已启用'
}

export async function siteStop(name) {
  const site = await findInTable('sites', name)
  if (!site) return `未找到网站：${name}`
  const res = await btAction('site', 'SiteStop', { id: site.id, name: site.name })
  return res.msg || '站点已停止'
}

export async function siteBackup(name) {
  const site = await findInTable('sites', name)
  if (!site) return `未找到网站：${name}`
  const res = await btAction('site', 'ToBackup', { id: site.id })
  return res.msg || '备份任务已提交'
}

export async function getSiteSsl(name) {
  const site = await findInTable('sites', name)
  if (!site) return `未找到网站：${name}`
  const res = await btAction('site', 'GetSSL', { siteName: site.name })
  if (res.status === false) return res.msg || '获取失败'
  const cert = res.cert || res
  return `【${site.name} SSL 信息】

• 证书：${cert?.issuer || cert?.subject || '未部署'}
• 到期：${cert?.notAfter || cert?.endtime || '-'}`
}
