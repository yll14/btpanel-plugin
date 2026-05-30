import { btAction } from '../../api/index.js'

export async function getWarningList() {
  const res = await btAction('warning', 'get_list')
  const list = res.security || res.data || (Array.isArray(res) ? res : [])
  if (!list.length) return '暂无安全风险项，或尚未扫描'

  const lines = list.slice(0, 20).map((item, i) => {
    const title = item.title || item.name || item.ps || `项目${i + 1}`
    const level = item.level || item.m_level || '-'
    return `• ${title} [${level}]\n  ${item.msg || item.description || ''}`
  })
  const more = list.length > 20 ? `\n\n... 还有 ${list.length - 20} 项` : ''
  return `【安全扫描结果】共 ${list.length} 项\n\n${lines.join('\n\n')}${more}`
}

export async function getWarningScore() {
  const res = await btAction('warning', 'get_scan_bar')
  return `【安全扫描概况】

• 状态：${res.status || '-'}
• 进度：${res.percentage ?? '-'}%
• 检测项：${res.count ?? '-'}
• 安全评分：${res.score ?? '-'}`
}
