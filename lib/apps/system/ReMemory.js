import { btAction } from '../../api/index.js'
import { buildSection } from '../../function/format.js'
import { cfg, formatMsg } from './utils.js'

export async function reMemory() {
  const d = await btAction('system', 'ReMemory')
  const config = cfg()

  const body = buildSection('✅ 内存释放完成', [
    config.reMemTotal && `• 总内存：${d.memTotal} MB`,
    config.reMemFree && `• 空闲：${d.memFree} MB`,
    config.reMemRealUsed && `• 实际使用：${d.memRealUsed} MB`,
  ])

  return formatMsg('释放内存', body)
}
