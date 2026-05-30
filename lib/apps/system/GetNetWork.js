import { btAction } from '../../api/index.js'
import { buildSection } from '../../function/format.js'
import { cfg, formatMsg } from './utils.js'

export async function getNetWork() {
  const d = await btAction('system', 'GetNetWork')
  const config = cfg('GetNetWork')

  const nicLines = []
  if (config.netNic && d.network) {
    for (const [name, info] of Object.entries(d.network)) {
      nicLines.push(`• ${name} ↑${info.up} KB/s ↓${info.down} KB/s`)
    }
  }

  const body =
    buildSection('🌐 网络流量', [
      config.netSystem && `• 系统：${d.system || '-'}`,
      config.netTime && `• 运行时间：${d.time || '-'}`,
      config.netRate && `• 上传速率：${d.up} KB/s | 下载速率：${d.down} KB/s`,
      config.netTotal && `• 总上传：${d.upTotal} | 总下载：${d.downTotal}`,
    ]) +
    (nicLines.length ? nicLines.join('\n') + '\n' : '')

  return formatMsg('网络流量', body.trimEnd())
}
