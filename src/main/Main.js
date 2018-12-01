const activeWin = require('active-win');

console.reset = function () {
  return process.stdout.write('\033c');
}

const info = {}

const interval = setInterval(async () => {
  let {title} = await activeWin();

  if (info[title]) {
    info[title] = info[title] + 1
  } else {
    info[title] = 1
  }

  process.stdout.write('\033c');
  console.log(JSON.stringify(info, null, 4));
}, 1 * 1000);
