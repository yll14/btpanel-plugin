import plugin from "../../../../lib/plugins/plugin.js";
import { FtpApp } from './ftp/index.js'
import { bindApp } from '../function/bindApp.js'

export class FtpPlugin extends plugin {
  constructor() {
    super({
      name: '宝塔:FTP管理',
      dsc: '宝塔面板 FTP 管理',
      event: 'message',
      priority: 5000,
      rule: FtpApp.rules
    })
  }
}

bindApp(FtpPlugin, FtpApp)
