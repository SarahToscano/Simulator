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

    var list_old_Id = [-1];

    console.log(list_old_Id);
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
        
    console.log(projItensIds)
      Outputs:
      //select `id` from `proj_itens` where 
      //`item_id` is equal to 'aeroCode'
      //and  whereNotIn 'id' in 
      //(select `projItensIds` from `aerogeradores`)
    
      

    
    
    //knex('accounts').where('id', 'not in', subquery)
    //Outputs:
    //select * from `accounts` where `id` not in (select `id`
    //where not `votes` > 100 and `status` = 'active' or `name` = 'John')

    
    var aeroProjIds_list = await knex('proj_itens')
        .from('proj_itens')
        .select('proj_id')
        .where('item_id', aeroCode)

    var size = Object.keys(projItensIds).length;
    var list_old_Id = [-1];

    for (let i = 0; i < size; i++) {
        var a = Object.values(projItensIds[i]);
        if(i==0){
            list_old_Id[i]=(Number(a));
        }
        else{
            list_old_Id.push(Number(a));
        }
    }
    console.log(Object.values(projItensIds[size-1]));
    const obg = Object.values(projItensIds[size-1]);


    



    const n = Object.keys(aeroProjIds_list).length;
    const code = Object.values(aeroProjIds_list[0]);
    console.log(code)

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