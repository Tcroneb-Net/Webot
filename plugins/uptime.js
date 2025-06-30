
import { runtime } from '../lib/functions.js';
import { config } from '../config.js';

export default {
  name: "uptime",
  alias: ["up", "runtime"],
  description: "Show website uptime",
  category: "system",
  run: () => {
    const uptime = runtime(performance.now() / 1000);
    const startTime = new Date(Date.now() - performance.now());

    return `
⏱️ <b>Uptime Report</b><br><br>
🟢 Running: <b>${uptime}</b><br>
📅 Since: <b>${startTime.toLocaleString()}</b><br><br>
<i>${config.DESCRIPTION}</i>`;
  }
};
