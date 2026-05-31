/**
 * 将 App 对象上的命令处理方法绑定到 Plugin 类原型
 */
export function bindApp(PluginClass, App) {
  for (const cmd of App.rules) {
    const fnc = cmd.fnc;
    if (App[fnc]) {
      PluginClass.prototype[fnc] = function (e) {
        return App[fnc](e);
      };
    }
  }
}
