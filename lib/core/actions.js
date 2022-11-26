// 引入node自带promise
const { promisify } = require('util');
const fs = require('fs');
const mkdirFile = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

// 引入下载github下载模块 并用promisify包裹
const download = promisify(require('download-git-repo'));
// 打开游览器
const open = require('open');
// 引入选项卡
const inquirer = require('inquirer');

// 引入地址
const { cliRepo, viteRepo } = require('../config/repo');
// 引入控制台命令工具
const { commandSpawn } = require('../utils/terminal');
// 引入ejs编译
const { compile } = require('../utils');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const createOptionsAction = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'type',
      message: '选择模板',
      choices: ['cli', 'vite']
    }
  ]);
  const project = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '输入项目名称'
    }
  ]);

  console.log('clone项目');
  if (type == 'cli') await download(cliRepo, project.name, { clone: true });
  if (type == 'vite') await download(viteRepo, project.name, { clone: true });

  console.log('安装依赖');
  await commandSpawn(npm, ['install'], { cwd: `./${project.name}` });

  console.log('运行项目');
  commandSpawn(npm, ['run', 'serve'], { cwd: `./${project.name}` });
};

const createAction = async (project) => {
  // console.log('下载仓库');
  // // 1.clone项目
  await download(cliRepo, project, { clone: true });
  // // 2.下载依赖
  // console.log('安装依赖');
  await commandSpawn(npm, ['install'], { cwd: `./${project}` });
  // 3启动项目 这个进程不会结束
  console.log('启动项目');
  commandSpawn(npm, ['run', 'serve'], { cwd: `./${project}` });
  // 4打开游览器
  open('http://localhost:9002/');
};

const addPageAction = async (name) => {
  const resVue = await compile('components.vue.ejs', { name });
  const resRoute = await compile('route.vue.js.ejs', { name });

  await mkdirFile(`src/views/${name}`);
  await writeFile(`src/views/${name}/index.vue`, resVue);
  await writeFile(`src/views/${name}/route.js`, resRoute);
  // writeFile(`src/views/${name}/index.vue`, res);
  // ejs模板
  // 编译ejs得到res
  // 将res写入.vue
  // 放到对应文件夹
};

module.exports = {
  createAction,
  addPageAction,
  createOptionsAction
};
