import { btAction } from '../../api/index.js'

export async function getCronLogs(id) {
  const res = await btAction('crontab', 'GetLogs', { id })
  if (typeof res === 'string') return res.slice(-1500) || '暂无日志'
  return res.msg || res.data || JSON.stringify(res).slice(0, 1500)
}
