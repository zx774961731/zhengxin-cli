// 导入ejs
const ejs = require('ejs');
const path = require('path');

const compile = (name, data) => {
  const templatePath = path.resolve(__dirname, `../template/${name}`);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, {}, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  compile
};
