/** *
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
export function debounce(func, wait, immediate) {
  let timer

  return function() {
    const context = this
    const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      console.log(1)
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}
