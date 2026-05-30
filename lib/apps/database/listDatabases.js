import { getDataTable } from '../../api/index.js'

export async function listDatabases() {
  const dbs = await getDataTable('databases')
  if (!dbs.length) return '暂无数据库'

  const lines = dbs.map((d) => {
    return `• [${d.id}] ${d.name} | 用户：${d.username} | 类型：${d.type || 'MySQL'}`
  })
  return `【数据库列表】共 ${dbs.length} 个\n\n${lines.join('\n')}`
}
