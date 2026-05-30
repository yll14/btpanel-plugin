import { btAction, getDataTable, findInTable } from '../../api/index.js'

export async function listDatabases() {
  const dbs = await getDataTable('databases')
  if (!dbs.length) return '暂无数据库'

  const lines = dbs.map((d) => {
    return `• [${d.id}] ${d.name} | 用户：${d.username} | 类型：${d.type || 'MySQL'}`
  })
  return `【数据库列表】共 ${dbs.length} 个\n\n${lines.join('\n')}`
}

export async function databaseBackup(name) {
  const db = await findInTable('databases', name)
  if (!db) return `未找到数据库：${name}`
  const res = await btAction('database', 'ToBackup', { id: db.id, sid: db.sid ?? 0 })
  return res.msg || '备份任务已提交'
}

export async function getDatabaseStatus() {
  const res = await btAction('database', 'GetRunStatus')
  if (res?.status === false) return res.msg || '获取失败'
  return `【MySQL 运行状态】

• 状态：${res.msg || res.status || '运行中'}
${res.data ? `• 详情：${JSON.stringify(res.data)}` : ''}`.trimEnd()
}

export async function getMysqlInfo() {
  const res = await btAction('database', 'GetMySQLInfo')
  const info = res.data || res
  if (!info || typeof info !== 'object') return res.msg || '暂无信息'
  const lines = Object.entries(info).slice(0, 12).map(([k, v]) => `• ${k}：${v}`)
  return `【MySQL 配置】\n\n${lines.join('\n')}`
}
