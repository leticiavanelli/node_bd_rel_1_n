const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const Fabricante = require('./model/Fabricante')
const Produto = require('./model/Produto')
const { response } = require('express')

const PORT = 3000
const hostname = 'localhost'
//--------congid-----------//
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//-------------------------//

app.get('/fabricante', async(req,res)=>{
    const valores = req.query
    console.log(valores)
    try{
        const pesq = await Fabricante.findOne({ where: {marca: valores.marca}, raw:true})
        if(pesq === null){
            console.log('valores inexistentes')
            res.status(404).json({message: 'valores inexistentes'})
        }else if(pesq.marca == valores.marca){
            console.log(pesq.marca)
            res.status(200).json(pesq)
        }
    }catch(err){
        console.error('Não foi possivel gravar os dados',err)
        res.status(200).json({message: 'Não foi possivel gravar os dados'})
    }
})

app.post('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    res.status(200).json(valores)
    try{
        const pesq = await Fabricante.create(valores, { raw: true})
        res.status(200).json(pesq)
    }catch(err){
        console.error('Não foi possivel gravar os dados',err)
        res.status(200).json({message: 'Não foi possivel gravar os dados'})
    }
})



app.get('/', (req,res)=>{
    res.status(200).json('servidor ativo')
})
//------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.error('erro no servidor')
})