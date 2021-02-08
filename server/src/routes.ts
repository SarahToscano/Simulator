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

routes.post('/aerogeradores', async (request, response) =>{
    const{
        vi_vento,
        vf_vento,
        raio,
        k_somb,
        inercia_turbina,
        inercia_gerador,
        atrito_turbina,
        atrito_gerador,
        k_torcao,
        n_polos,
        freq_rotacao,
        r_estator,
        l_rotor,
        proj_itens   
    } = request.body;

    //const trx = await knex.transaction();
    
    const aeroProjItens = proj_itens.map((proj_id:number) =>{
        return{
            vi_vento,
            vf_vento,
            raio,
            k_somb,
            inercia_turbina,
            inercia_gerador,
            atrito_turbina,
            atrito_gerador,
            k_torcao,
            n_polos,
            freq_rotacao,
            r_estator,
            l_rotor,
            proj_id
        };
    })

    await knex('aerogeradores').insert(aeroProjItens);
    
    return response.json({sucess: true});

});



export default routes;