import { btAction } from '../../api/index.js'

export async function getWarningScore() {
  const res = await btAction('warning', 'get_scan_bar')
  return `【安全扫描概况】

• 状态：${res.status || '-'}
• 进度：${res.percentage ?? '-'}%
• 检测项：${res.count ?? '-'}
• 安全评分：${res.score ?? '-'}`
}
