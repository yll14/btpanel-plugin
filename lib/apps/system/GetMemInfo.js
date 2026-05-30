import { btAction } from '../../api/index.js'
import { buildSection } from '../../function/format.js'
import { cfg, formatMsg } from './utils.js'

export async function getMemInfo() {
  const d = await btAction('system', 'GetMemInfo')
  const config = cfg('GetMemInfo')

  const body = buildSection('📊 内存详情', [
    config.memTotal && `• 总内存：${d.memTotal} MB`,
    config.memRealUsed && `• 实际使用：${d.memRealUsed} MB`,
    config.memAvailable && `• 可用：${d.memAvailable} MB`,
    config.memFree && `• 空闲：${d.memFree} MB`,
    config.memBuffers && `• 缓冲区：${d.memBuffers} MB`,
    config.memCached && `• 缓存：${d.memCached} MB`,
  ])

  return formatMsg('内存详情', body)
}
