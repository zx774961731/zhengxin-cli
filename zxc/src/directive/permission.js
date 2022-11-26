function isRole(value) {
  let queryButtonList = ['a', 'b', 'c', 'd'];
  return queryButtonList.some((item) => item == value);
}
export default (el, binding) => {
  el.parentNode.removeChild(el);
};
