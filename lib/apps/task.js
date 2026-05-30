import plugin from "../../../../lib/plugins/plugin.js";
import { TaskApp } from './task/index.js'
import { bindApp } from '../function/bindApp.js'

export class TaskPlugin extends plugin {
  constructor() {
    super({
      name: '宝塔:后台任务',
      dsc: '宝塔面板后台任务队列',
      event: 'message',
      priority: 5000,
      rule: TaskApp.rules
    })
  }
}

bindApp(TaskPlugin, TaskApp)
