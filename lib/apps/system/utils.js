import { GetConfig } from '../../function/function.js'

const CONFIG_DIR = `config/system`

export function cfg(name) {
  return GetConfig(CONFIG_DIR, name)
}

export function formatMsg(title, body) {
  if (!body) return '当前配置未启用任何显示项'
  return `【${title}】\n\n${body}`.trimEnd()
}
