/**
 * 注册事件
 * @param el
 * @param type
 * @param listener
 * @param options
 */
export function addDomEvent(el, type, listener, options) {
  el.addEventListener(type, listener, options);
}

/**
 * 获取页面url上的参数
 */
export function getPageParams() {
  let params = {},
    search = window.location.search.replace(/^\?/, '').split('&');

  search.forEach((str) => {
    let [key, value] = str.split('=');
    params[key] = value;
  });

  return params;
}

/**
 * 根据指定字符串生成唯一ID
 * @param str
 */
export function genUid(...str) {
  return Symbol.for(
    str
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        } else {
          let str;
          try {
            str = JSON.stringify(item);
          } catch (e) {
            str = String(item);
          }
          return str;
        }
      })
      .join('')
  );
}

/**
 * 下划线(_)或分割符(-)转换驼峰
 **/
export function toHump(str) {
  return str.replace(/(_(\w)|-(\w))/g, (all, letter) =>
    letter[1].toUpperCase()
  );
}

/**
 *  驼峰转换下划线
 * @param {*} name
 * @returns
 */
export function toLine(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 将rgb颜色转成hex,opacity
 * @param color
 * @returns
 */
export function colorRGBToHex(color) {
  const rgb = color.split(',');
  let opacity = 1;
  if (rgb.length === 1 || color.indexOf('#') !== -1) {
    return {
      hex: color.toUpperCase(),
      opacity
    };
  }
  const r = parseInt(rgb[0].split('(')[1]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2].split(')')[0]);
  opacity = parseFloat(rgb[3] ? rgb[3].split(')')[0] : '1');

  const hex =
    '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return {
    hex,
    opacity
  };
}
/**
 * 将hex颜色转成rgb
 * @param hex
 * @param opacity
 * @returns
 */
export function hexToRgba(hex, opacity) {
  const RGBA =
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')';
  return {
    red: parseInt('0x' + hex.slice(1, 3)),
    green: parseInt('0x' + hex.slice(3, 5)),
    blue: parseInt('0x' + hex.slice(5, 7)),
    rgba: RGBA
  };
}

export function hexToRgb(hex) {
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (hex && reg.test(hex)) {
    if (hex.length === 4) {
      let hexNew = '#';
      for (let i = 1; i < 4; i += 1) {
        hexNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
      }
      hex = hexNew;
    }
    //处理六位的颜色值
    let hexChange = [];
    for (let i = 1; i < 7; i += 2) {
      hexChange.push(parseInt('0x' + hex.slice(i, i + 2)));
    }
    return 'RGB(' + hexChange.join(',') + ')';
  }
  return hex;
}

/**
 * 获取自定义样式
 * @param config
 * @param selectItem
 * @returns
 */
export function getLayoutStyle(config, selectItem) {
  if (!config) {
    return {};
  }
  let sizeObject;
  const width = getSizeAndPixe(config.width);
  const height = getSizeAndPixe(config.height);
  if (selectItem === 'header' || selectItem === 'footer') {
    sizeObject = {
      width: '100%',
      height
    };
  } else if (selectItem === 'sider') {
    sizeObject = {
      width,
      height: '100%',
      'min-width': width
    };
  } else {
    sizeObject = {
      width,
      height
    };
  }
  return {
    ...sizeObject,
    color: config.color,
    background: config.background
  };
}

function getSizeAndPixe(size) {
  if (Number(size)) {
    size = size + 'px';
  }
  return size;
}

// 命名：模块-元素-修饰
// eg: page-text   page-text__disabled   header-logo__active
export function bem(block, element, describe = null) {
  if (describe) {
    return `${block}-${element}__${describe}`;
  } else {
    return `${block}-${element}`;
  }
}
// 处理服务版本号
export function versionTrans(number) {
  let reg = /^[1-9][0-9]{2,3}$/;
  if (reg.test(number)) {
    let str = number.toString();
    let res = '';
    if (str.length === 3) {
      res = str.substr(0, 1) + '.' + str.substr(1, 1) + '.' + str.substr(2, 1);
    }
    if (str.length === 4) {
      if (parseInt(str.substr(2, 1)) === 0) {
        res =
          str.substr(0, 1) + '.' + str.substr(1, 1) + '.' + str.substr(3, 1);
      } else {
        res =
          str.substr(0, 1) +
          '.' +
          str.substr(1, 1) +
          '.' +
          str.substr(2, 1) +
          str.substr(3, 1);
      }
    }
    return res;
  } else {
    return number;
  }
}

/**
 * 获取标准分页数据
 * @param  {Object} data 源数据
 * @return {Object}      标准分页数据
 */
export function getPageData(data) {
  return {
    current: data.currentPage && Number(data.currentPage),
    total: data.totalNum && Number(data.totalNum),
    pageSize: data.pageSize && Number(data.pageSize),
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: function (total) {
      return `共有 ${total} 项数据`;
    },
    pageSizeOptions: ['10', '50', '100']
  };
}
// 硬件分类转Tree
export function handleTree(data, node) {
  data.forEach((children) => {
    const pid = children.pid;
    children[node.value] = children.id;
    children[node.label] = children.name;
    if (pid !== '0') {
      data.forEach((parent) => {
        if (parent.id === pid) {
          parent.children = parent.children || [];
          parent.children.push(children);
        }
      });
    }
  });
  return data.filter((n) => n.pid === '0');
}

// 图片获取
export function getIcon(path) {
  return `${
    process.env.VUE_APP_BASE_URL
  }tacos-cloud-storage/file/getFile?fileName=&filePath=${encodeURIComponent(
    path
  )}`;
}
