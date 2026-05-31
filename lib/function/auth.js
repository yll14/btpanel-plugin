/**
 * 校验是否为主人，非主人则回复提示
 */
export function checkMaster(e, msg = "仅主人可用此命令") {
  if (!e.isMaster) {
    e.reply(msg);
    return false;
  }
  return true;
}
