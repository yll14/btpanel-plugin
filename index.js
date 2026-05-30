import fs from "node:fs";
import Init from "./lib/init/init.js";
import {
  _PATH,
  PluginName_en,
  PluginName_zh,
} from "./lib/function/function.js";
import chalk from "chalk";

const startTime = Date.now();
let initMsg = await Init.init();
logger.info(
  chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`),
);
logger.info(
  chalk.rgb(255, 107, 107)(PluginName_zh[0]) +
    chalk.rgb(255, 165, 107)(PluginName_zh[1]) +
    chalk.rgb(255, 231, 107)(PluginName_zh[2]) +
    chalk.rgb(107, 255, 150)(PluginName_zh[3]) +
    chalk.rgb(107, 200, 255)(`载`) +
    chalk.rgb(180, 107, 255)(`入`) +
    chalk.rgb(255, 107, 200)(`中`) +
    chalk.rgb(255, 107, 107)(`！`),
);

if (!initMsg.boolean) {
  throw new Error(`${PluginName_en}载入失败`);
}

if (!global.segment) {
  global.segment = (await import("oicq")).segment;
}

let ret = [];

const files = fs
  .readdirSync(`./plugins/${PluginName_en}/lib/apps`)
  .filter((file) => file.endsWith(".js"));

files.forEach((file) => {
  ret.push(import(`./lib/apps/${file}`));
});

ret = await Promise.allSettled(ret);

let apps = {};
let successCount = 0;
let failureCount = 0;

for (let i in files) {
  let name = files[i].replace(".js", "");

  if (ret[i].status != "fulfilled") {
    failureCount++;
    logger.error(chalk.red(`文件 ${files[i]} 加载失败：${ret[i].reason}`));
    if (ret[i].reason && ret[i].reason.stack) {
      console.error(chalk.red(ret[i].reason.stack));
    }
    continue;
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
  successCount++;
}

const endTime = Date.now();
const elapsedTime = endTime - startTime;

logger.info(
  chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`),
);
logger.info(
  chalk.rgb(255, 107, 107)(PluginName_zh[0]) +
    chalk.rgb(255, 165, 107)(PluginName_zh[1]) +
    chalk.rgb(255, 231, 107)(PluginName_zh[2]) +
    chalk.rgb(107, 255, 150)(PluginName_zh[3]) +
    chalk.rgb(107, 200, 255)(`载`) +
    chalk.rgb(180, 107, 255)(`入`) +
    chalk.rgb(255, 107, 200)(`完`) +
    chalk.rgb(255, 107, 107)(`成`),
);
logger.info(
  chalk.rgb(255, 107, 107)(`成`) +
    chalk.rgb(255, 165, 107)(`功`) +
    chalk.rgb(255, 231, 107)(`加`) +
    chalk.rgb(107, 255, 150)(`载`) +
    chalk.rgb(107, 200, 255)(`：`) +
    chalk.rgb(180, 107, 255)(` `) +
    chalk.rgb(255, 107, 200)(successCount) +
    chalk.rgb(255, 107, 107)(` `) +
    chalk.rgb(255, 165, 107)(`个`),
);
logger.info(
  chalk.rgb(255, 107, 107)(`加`) +
    chalk.rgb(255, 165, 107)(`载`) +
    chalk.rgb(255, 231, 107)(`失`) +
    chalk.rgb(107, 255, 150)(`败`) +
    chalk.rgb(107, 200, 255)(`：`) +
    chalk.rgb(180, 107, 255)(` `) +
    chalk.rgb(255, 107, 200)(failureCount) +
    chalk.rgb(255, 107, 107)(` `) +
    chalk.rgb(255, 165, 107)(`个`),
);
logger.info(
  chalk.rgb(255, 107, 107)(`总`) +
    chalk.rgb(255, 165, 107)(`耗`) +
    chalk.rgb(255, 231, 107)(`时`) +
    chalk.rgb(107, 255, 150)(`：`) +
    chalk.rgb(107, 200, 255)(` `) +
    chalk.rgb(180, 107, 255)(elapsedTime) +
    chalk.rgb(255, 107, 200)(` `) +
    chalk.rgb(255, 107, 107)(`毫`) +
    chalk.rgb(255, 165, 107)(`秒`),
);
logger.info(
  chalk.rgb(255, 107, 107)(`C`) +
    chalk.rgb(255, 165, 107)(`r`) +
    chalk.rgb(255, 231, 107)(`e`) +
    chalk.rgb(107, 255, 150)(`a`) +
    chalk.rgb(107, 200, 255)(`t`) +
    chalk.rgb(180, 107, 255)(`e`) +
    chalk.rgb(255, 107, 200)(`d`) +
    chalk.rgb(255, 107, 107)(` `) +
    chalk.rgb(255, 165, 107)(`B`) +
    chalk.rgb(255, 231, 107)(`y`) +
    chalk.rgb(107, 255, 150)(` `) +
    chalk.rgb(255, 107, 107)(global.BTpanelPlugin.PluginAuthor[0]) +
    chalk.rgb(255, 165, 107)(global.BTpanelPlugin.PluginAuthor[1]),
);
logger.info(
  chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`) +
    chalk.rgb(255, 107, 107)(`-`) +
    chalk.rgb(255, 165, 107)(`-`) +
    chalk.rgb(255, 231, 107)(`-`) +
    chalk.rgb(107, 255, 150)(`-`) +
    chalk.rgb(107, 200, 255)(`-`) +
    chalk.rgb(180, 107, 255)(`-`) +
    chalk.rgb(255, 107, 200)(`-`),
);

export { apps };
