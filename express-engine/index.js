const express = require('express')

const app = express()

const expressJsx = require('./expressJsx')

app.engine('jsx',expressJsx)

app.set('views','./views')
app.set('view engine','jsx')

app.get('/',(req,res)=>{
    res.render('index',{hello:'hola',world:'mundo genial'})
})

const server = app.listen(8000,()=>{
    console.log(`Listening http://localhost:${server.address().port}`)
})