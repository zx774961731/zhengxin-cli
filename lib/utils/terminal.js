/* 
执行终端命令
*/
// 新建一个线程
const { spawn } = require('child_process');

const commandSpawn = (...arg) => {
  return new Promise((resolve, rejects) => {
    // 执行控制台命令
    const childProcess = spawn(...arg);
    // 将子线程控制台打印信息放在主进程里面
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 监听子线程结束回调
    childProcess.on('close', () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn
};
