import yaml from "yaml";
import fs from "fs";
const _PATH = process.cwd().replace(/\\/g, "/");
const PluginName_zh = "宝塔插件";
const PluginName_en = "btpanel-plugin";
const PluginPath = `${_PATH}/plugins/${PluginName_en}`;
import puppeteer from "../../../../lib/puppeteer/puppeteer.js";
import cfg from "../../../../lib/config/config.js";
import crypto from "crypto";

/**
 * 解析配置文件
 * @param {*} file 配置文件夹
 * @param {*} name 配置文件名
 * @returns
 */
function GetConfig(file, name) {
  let cfgyaml = `${_PATH}/plugins/${PluginName_en}/${file}/${name}.yaml`;
  const configData = fs.readFileSync(cfgyaml, "utf8");
  let config = yaml.parse(configData);
  return { config };
}

/**
 * 生成宝塔面板 API 签名
 * @param {string} API_SK 接口密钥
 * @returns {object} 返回 request_time 和 request_token
 */
function getBTSign(API_SK) {
  const requestTime = Math.floor(Date.now() / 1000).toString();
  const md5_API_SK = crypto.createHash('md5').update(API_SK).digest('hex');
  const requestToken = crypto.createHash('md5').update(requestTime + md5_API_SK).digest('hex');

  return {
      request_time: requestTime,
      request_token: requestToken
  };
}



/**
 * 浏览器截图
 * @param {*} e
 * @param {*} file html模板名称
 * @param {*} name
 * @param {object} obj 渲染变量，类型为对象
 * @returns
 */
async function image(e, file, name, obj) {
  let botname = cfg.package.name;
  if (cfg.package.name == `yunzai`) {
    botname = `Yunzai-Bot`;
  } else if (cfg.package.name == `miao-yunzai`) {
    botname = `Miao-Yunzai`;
  } else if (cfg.package.name == `trss-yunzai`) {
    botname = `TRSS-Yunzai`;
  } else if (cfg.package.name == `a-yunzai`) {
    botname = `A-Yunzai`;
  } else if (cfg.package.name == `biscuit-yunzai`) {
    botname = `Biscuit-Yunzai`;
  }
  let data = {
    quality: 100,
    tplFile: `./plugins/${PluginName_en}/resources/html/${file}.html`,
    ...obj,
  };
  let img = await puppeteer.screenshot(name, {
    botname,
    MiaoV: cfg.package.version,
    ...data,
  });

  return {
    img,
  };
}

export { _PATH, PluginName_zh, PluginName_en, PluginPath, GetConfig, image, getBTSign };
