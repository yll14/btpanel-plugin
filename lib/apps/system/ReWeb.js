import { btAction } from '../../api/index.js'
import { cfg } from './utils.js'

export async function reWeb() {
  const d = await btAction('system', 'ReWeb')
  const config = cfg()
  if (!config.reWebResult) return '当前配置未启用任何显示项'
  return d.msg || '面板重启指令已发出'
}
