import { btAction } from '../../api/index.js'
import { buildSection } from '../../function/format.js'
import { cfg, formatMsg } from './utils.js'

export async function getCpuInfo() {
  const d = await btAction('system', 'GetCpuInfo')
  const config = cfg()
  if (!Array.isArray(d)) return '暂无 CPU 信息'

  const coreSummary = [
    config.cpuLogicNum && `逻辑核心：${d[1]}`,
    config.cpuPhysCores && `物理核心：${d[4]}`,
    config.cpuPhysNum && `物理 CPU：${d[5]}`,
  ].filter(Boolean)

  const body = buildSection('💻 CPU 详情', [
    config.cpuModel && `• 型号：${d[3] || '-'}`,
    config.cpuUsageTotal && `• 整体使用率：${d[0]}%`,
    coreSummary.length && `• ${coreSummary.join(' | ')}`,
    config.cpuPerCore &&
      Array.isArray(d[2]) &&
      `• 各核：${d[2].map((v, i) => `核${i + 1}: ${v}%`).join(' | ')}`,
  ])

  return formatMsg('CPU 详情', body)
}
