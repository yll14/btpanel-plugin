import { btAction, findInTable } from '../../api/index.js'

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
