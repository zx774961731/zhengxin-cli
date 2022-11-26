const program = require('commander');
const {
  createAction,
  addPageAction,
  createOptionsAction
} = require('./actions');

const createProject = () => {
  program
    .command('new')
    .description('创建一个项目 zx new')
    .action(createOptionsAction); //createAction返回的也是promise结果

  program
    .command('create <project> [others...]')
    .description('创建一个项目:zx create xx项目 参数')
    .action(createAction); //createAction返回的也是promise结果

  program
    .command('addPage <name> [others...]')
    .description('创建一个新页面:zx add 路由页面 参数')
    .action(addPageAction); //createAction返回的也是promise结果
};

module.exports = {
  createProject
};
