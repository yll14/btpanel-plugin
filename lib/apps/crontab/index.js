import { listCrontab, setCronStatus, getCronLogs } from './service.js'
import { checkMaster } from '../../function/auth.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#计划任务$/, fnc: 'listCrontab', desc: '查看所有计划任务' },
  {
    reg: /^#任务启用\s+(\d+)$/,
    fnc: 'enableCron',
    desc: '启用计划任务，如 #任务启用 1',
  },
  {
    reg: /^#任务暂停\s+(\d+)$/,
    fnc: 'disableCron',
    desc: '暂停计划任务，如 #任务暂停 1',
  },
  {
    reg: /^#任务日志\s+(\d+)$/,
    fnc: 'cronLogs',
    desc: '查看任务日志，如 #任务日志 1',
  },
]

export const CrontabApp = {
  rules: commands,

  listCrontab(e) {
    return replyHandle(e, '计划任务', () => listCrontab())
  },
  enableCron(e) {
    if (!checkMaster(e)) return
    const id = e.msg.match(commands[1].reg)[1]
    return replyHandle(e, '任务启用', () => setCronStatus(id, 1))
  },
  disableCron(e) {
    if (!checkMaster(e)) return
    const id = e.msg.match(commands[2].reg)[1]
    return replyHandle(e, '任务暂停', () => setCronStatus(id, 0))
  },
  cronLogs(e) {
    const id = e.msg.match(commands[3].reg)[1]
    return replyHandle(e, '任务日志', () => getCronLogs(id))
  },
}
