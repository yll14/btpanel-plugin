import { listFtp } from './listFtp.js'
import { replyHandle } from '../../function/format.js'

const commands = [
  { reg: /^#FTP列表$/, fnc: 'listFtp', desc: '查看 FTP 用户列表' },
]

export const FtpApp = {
  rules: commands,

  listFtp(e) {
    return replyHandle(e, 'FTP列表', () => listFtp())
  },
}
