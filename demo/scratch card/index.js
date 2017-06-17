let canvas = document.querySelector('#canvas'),
    ctx =canvas.getContext('2d')

// 添加刮奖层
ctx.globalCompositeOperation = "destination-over"
ctx.beginPath()
ctx.fillStyle = '#ccc'
ctx.fillRect(0, 0, 300, 200)
ctx.closePath()

// 添加鼠标事件
canvas.addEventListener('mousedown', handleMouseDown, false)
canvas.addEventListener('mouseup', handleMouseUp, false)

// 添加移动端手指滑动时间
canvas.addEventListener('touchmove', handleTouchMove, false)

// 事件处理函数
function handleMouseDown(e) {
    console.log('down')
    canvas.addEventListener('mousemove', handleMouseMove, false)
}
function handleMouseUp(e) {
    console.log('up')
    canvas.removeEventListener('mousemove', handleMouseMove, false)
}
function handleMouseMove(e) {
    console.log('move')
    earse(e.offsetX, e.offsetY)
}

// 移动端滑动处理函数
function handleTouchMove(e) {
    console.log('touchmove')
    // 避免屏幕滚动
    e.preventDefault()

    const target = e.targetTouches[0]
    const x = target.pageX - canvas.offsetLeft
    const y = target.pageY - canvas.offsetTop
    earse(x, y)
}

// 刮卡功能函数
function earse(x ,y) {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, 2 * Math.PI, true)
    // ctx.cleatRect(x, y, 12, 12)
    ctx.fill()
    ctx.closePath()
}