import { getDataTable } from '../../api/index.js'

export async function listSites() {
  const sites = await getDataTable('sites')
  if (!sites.length) return '暂无网站'

  const lines = sites.map((s) => {
    const status = s.status === '1' || s.status === 1 ? '运行中' : '已停止'
    return `• [${s.id}] ${s.name} (${status})\n  路径：${s.path}${s.ps ? `\n  备注：${s.ps}` : ''}`
  })
  return `【网站列表】共 ${sites.length} 个\n\n${lines.join('\n\n')}`
}
