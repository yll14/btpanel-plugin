import { listTasks } from './service.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#后台任务$/, fnc: 'listTasks', desc: '查看面板后台任务队列' },
]

export const TaskApp = {
  rules: commands,

  listTasks(e) {
    return replyHandle(e, '后台任务', () => listTasks())
  },
}
