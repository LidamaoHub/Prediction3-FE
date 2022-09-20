/*
 * @Author: zhangxue
 * @Date: 2020/8/13
 * @LastEditTime: 10:53
 * @Description: 自定义指令，实现点击某个元素以外的区域
 * @FilePath: select
*/

const derections = {
  // 点击除了指定区域外执行对应函数操作指令
  clickOutside: {
    bind(el, binding) {
      function clickHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
        return true;
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.vueClickOutside = clickHandler;
      document.addEventListener('click', clickHandler);
    },
    unbind(el) {
      // 解除事件监听
      document.removeEventListener('click', el.vueClickOutside);
      delete el.vueClickOutside;
    },
  },
};
export default derections;