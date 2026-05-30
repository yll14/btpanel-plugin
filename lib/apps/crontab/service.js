import { btAction } from '../../api/index.js'

const typeMap = {
  day: '每天',
  'minute-n': 'N分钟',
  hour: '每小时',
  week: '每周',
  month: '每月',
}

const sTypeMap = {
  toShell: 'Shell脚本',
  toUrl: '访问URL',
  site: '备份网站',
  database: '备份数据库',
  logs: '日志切割',
}

export async function listCrontab() {
  const tasks = await btAction('crontab', 'GetCrontab')
  if (!Array.isArray(tasks) || !tasks.length) return '暂无计划任务'

  const lines = tasks.map((t) => {
    const status = t.status === 1 ? '启用' : '暂停'
    const cycle = `${typeMap[t.type] || t.type} ${t.where_hour ?? ''}:${String(t.where_minute ?? '').padStart(2, '0')}`
    return `• [${t.id}] ${t.name} (${status})\n  类型：${sTypeMap[t.sType] || t.sType} | 周期：${cycle}\n  内容：${(t.sBody || '').slice(0, 80)}`
  })
  return `【计划任务】共 ${tasks.length} 个\n\n${lines.join('\n\n')}`
}

export async function setCronStatus(id, status) {
  const res = await btAction('crontab', 'set_cron_status', {
    id,
    status: String(status),
  })
  return res.msg || '设置成功'
}

export async function getCronLogs(id) {
  const res = await btAction('crontab', 'GetLogs', { id })
  if (typeof res === 'string') return res.slice(-1500) || '暂无日志'
  return res.msg || res.data || JSON.stringify(res).slice(0, 1500)
}
