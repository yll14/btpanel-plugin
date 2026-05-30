import { getDataTable } from '../../api/index.js'

export async function listFtp() {
  const users = await getDataTable('ftps')
  if (!users.length) return '暂无 FTP 用户'

  const lines = users.map((u) => {
    const status = u.status === '1' || u.status === 1 ? '启用' : '禁用'
    return `• [${u.id}] ${u.name} (${status})\n  路径：${u.path}`
  })
  return `【FTP 用户列表】共 ${users.length} 个\n\n${lines.join('\n\n')}`
}
