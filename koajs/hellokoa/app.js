require('babel-polyfill')
require('babel-register')

const Koa = require('koa')
const app = new Koa()

app.context.testA = () => {
    console.log('testA')
}

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    console.log('1111')
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
    ctx.testA()
})

app.use(async ctx => {
    ctx.body = 'hello koa'
})

app.listen(3000)