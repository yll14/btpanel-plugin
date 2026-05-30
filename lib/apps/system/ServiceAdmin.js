import { btAction } from '../../api/index.js'
import { cfg } from './utils.js'

export async function serviceAdmin(name, type) {
  const d = await btAction('system', 'ServiceAdmin', { name, type })
  const config = cfg()
  if (!config.serviceResult) return '当前配置未启用任何显示项'
  return d.msg || '操作完成'
}
