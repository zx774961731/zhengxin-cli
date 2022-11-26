const program = require('commander');

const helpOptions = () => {
  program.option('-w --why', '这是一个test');
  program.option('-d <dest>', '命令后面带参数.例如:-d /src/components');

  program.on('--help', function () {
    console.log(''); //换行
    console.log('Other:'); //提示
    console.log('正文');
  });
};

module.exports = helpOptions;
