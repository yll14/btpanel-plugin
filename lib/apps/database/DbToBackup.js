import { btAction, findInTable } from '../../api/index.js'

export async function databaseBackup(name) {
  const db = await findInTable('databases', name)
  if (!db) return `未找到数据库：${name}`
  const res = await btAction('database', 'ToBackup', { id: db.id, sid: db.sid ?? 0 })
  return res.msg || '备份任务已提交'
}
