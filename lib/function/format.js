export function buildSection(title, lines) {
  const content = lines.filter(Boolean).join("\n");
  if (!content) return "";
  return `${title}\n${content}\n\n`;
}

export function formatBytes(bytes) {
  if (bytes == null || isNaN(bytes)) return "-";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = Number(bytes);
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export async function replyHandle(e, tag, fn) {
  try {
    return e.reply(await fn());
  } catch (err) {
    logger.error(`[${tag}] ${err}`);
    return e.reply(`操作失败：${err.message}`);
  }
}
