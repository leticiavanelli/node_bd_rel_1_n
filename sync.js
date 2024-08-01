const { Fabricante, Produto } = require('./model/associacao')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas e banco sincronizados');
    }catch(err){
        console.error('erro de sincronizção com o banco!',err)
    }finally{
        conn.close()
        console.log("conexão do banco fechada ");
    }
}

syncDataBase()