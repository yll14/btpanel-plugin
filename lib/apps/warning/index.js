import { getWarningList } from './get_list.js'
import { getWarningScore } from './get_scan_bar.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#安全扫描$/, fnc: 'warningList', desc: '查看安全扫描结果' },
  { reg: /^#安全评分$/, fnc: 'warningScore', desc: '查看安全扫描评分' },
]

export const WarningApp = {
  rules: commands,

  warningList(e) {
    return replyHandle(e, '安全扫描', () => getWarningList())
  },
  warningScore(e) {
    return replyHandle(e, '安全评分', () => getWarningScore())
  },
}
