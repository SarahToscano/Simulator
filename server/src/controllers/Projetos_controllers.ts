import knex from '../database/connection'
import {Request, Response} from 'express';
 
class Projetos_controller{

    async create (request :Request, response :Response) {
        const{
            projeto_nome,
            autor,
            itens
        } = request.body;

        const projeto = {    
            projeto_nome,
            autor
        }

        const insertedIds = await knex('projetos').insert(projeto);
        const proj_id = insertedIds[0];

        //Relacionamento entre tabelas
        const projItens = itens.map((item_id:number) =>{
            return{
                item_id,
                proj_id,
            };
        })
        await knex('proj_itens').insert(projItens);
        return response.json({
            id: proj_id,
            ...projeto 
        });

    };
}

export default Projetos_controller; 