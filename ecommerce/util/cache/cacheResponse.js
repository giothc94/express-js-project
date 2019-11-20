const {config}=require('../../config')

const cacheResponse = (res,seconds) => {
    if (!config.dev) {
        console.log('cargando cache')
        res.set("Cache-Control", `public, max-age=${seconds}`)
    }
}

module.exports = cacheResponse