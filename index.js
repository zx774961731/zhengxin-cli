#!/usr/bin/env node
// commander工具库
const program = require('commander');
// 引入help
const help = require('./lib/core/help');
help();

// 引入create项目
const { createProject } = require('./lib/core/create');
createProject();

// 配置版本号
program.version(require('./package.json').version, '-v,--version');
// 使用配置;
program.parse(process.argv);
