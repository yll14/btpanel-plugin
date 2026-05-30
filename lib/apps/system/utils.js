import { GetConfig } from '../../function/function.js'

export function cfg() {
  return GetConfig(`config`, `System`)
}

export function formatMsg(title, body) {
  if (!body) return '当前配置未启用任何显示项'
  return `【${title}】\n\n${body}`.trimEnd()
}
