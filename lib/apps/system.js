import plugin from "../../../../lib/plugins/plugin.js";
import { SystemApp } from './system/index.js'
import { bindApp } from '../function/bindApp.js'

export class SystemPlugin extends plugin {
  constructor() {
    super({
      name: '宝塔:系统管理',
      dsc: '服务器系统状态及管理',
      event: 'message',
      priority: 5000,
      rule: SystemApp.rules
    })
  }
}

bindApp(SystemPlugin, SystemApp)
