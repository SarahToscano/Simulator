import express from 'express';
import knex from './database/connection';
 
const routes = express.Router();

routes.get('/itens', async (request, response) =>{
    const itens = await knex('itens').select('*');
    
    const serializeditens = itens.map( item=>{
        return {
            id: item.id,
            tipo: item.tipo,
            image_url: `http://localhost:8080/uploads/${item.image}`,
         };
    });

    return response.json(itens);

});

routes.post('/projetos', async (request, response) =>{
    const{
        projeto_nome,
        autor,
        itens
    } = request.body;

    //const trx = await knex.transaction();

    //ids salva a lista de ID dos projetos
    const insertedIds = await knex('projetos').insert({ 
        projeto_nome,
        autor
    });
    const proj_id = insertedIds[0];

    //Relacionamento entre tabelas
    const projItens = itens.map((item_id:number) =>{
        return{
            item_id,
            proj_id,
        };
    })
    await knex('proj_itens').insert(projItens);

    return response.json({sucess: true});

});



export default routes;