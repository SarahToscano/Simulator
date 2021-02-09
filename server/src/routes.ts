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
    const aeroCode =1;

    const subquery = await knex('aerogeradores')
    .from('aerogeradores')
    .select('projItensIds');

    var projItensIds = await knex('proj_itens')
        .from('proj_itens')
        .select('id')
        .where('item_id', aeroCode)
        .where('item_id', 'not in', subquery)
        //.whereNotIn('id', function() {
        //  this.select('projItensIds').from('aerogeradores');
            
    var size = Object.keys(projItensIds).length;

    const obg = Object.values(projItensIds[size-1]);
    console.log("Id do item-projeto")
    console.log(obg)

    const subquery_2 = await knex('aerogeradores')
    .from('aerogeradores')
    .select('projItensIds');

    let numero  = obg as unknown as number;

    var id_proj_aero = await knex('proj_itens')
        .from('proj_itens')
        .select('proj_id')
        .where('id', numero)

    console.log('Id do projeto:');
    console.log(id_proj_aero);
    


    const code = Object.values(id_proj_aero[0]);
    console.log("number");
    console.log(code);

    const aero_data = proj_itens.map((id:number) =>{
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
            aeroProjIds: code,
            projItensIds: obg
        };
    })

    await knex('aerogeradores').insert(aero_data);
    
    return response.json({sucess: true});

});

export default routes;