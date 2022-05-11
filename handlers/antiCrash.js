module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection Error')
        console.log(reason, p)
    })

    process.on('uncaughtException', (err, origin) => {
        console.log('Uncaught Exception Error')
        console.log(error, origin)
    })

    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log('Uncaught Exception Error')
        console.log(error, origin)
    })

    process.on('multipleResolves', (type, promise, reason) => {
        console.log('Multiple Resolves Error')
        console.log(type, promise, reason)
    })
}