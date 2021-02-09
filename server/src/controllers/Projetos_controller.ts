import knex from '../database/connection'
import {Request, Response} from 'express';
 
class Projetos_controller{

    async show (request : Request, response : Response){
        const id = request.params.id;

        const projeto = await knex('projetos').where('id', id).first();

        if(!projeto){
            return response.status(400).json({message: 'Projeto não cadastrado'})
        }

        const itens = await knex('itens')
            .join('proj_itens', 'itens.id', '=', 'proj_itens.item_id')
            .where('proj_itens.proj_id', id)
            .select('itens.tipo');

        return response.json({projeto,itens} );
    };

    async index (request : Request, response : Response){
        //aerogerador //painel  //barra {Query Params}
        const {autor, itens} = request.query;

        const parsedItens = String(itens)
            .split(',')
            .map(item=> Number(item.trim()))

        const projetos = await knex('projetos')
            .join('proj_itens','projetos.id', '=', 'proj_itens.proj_id')
            .whereIn('proj_itens.item_id', parsedItens)
            .where('projetos.autor', String(autor))
            .distinct() 
            .select('projetos.*'); 

            return response.json(projetos);
    }

    async create (request :Request, response :Response) {
        const{
            projeto_nome,
            autor,
            itens
        } = request.body;

        const trx = await knex.transaction();
        const projeto = {    
            projeto_nome,
            autor
        }

        const insertedIds = await trx('projetos').insert(projeto);
        const proj_id = insertedIds[0];

        //Relacionamento entre tabelas
        const projItens = itens.map((item_id:number) =>{
            return{
                item_id,
                proj_id,
            };
        })
        await trx('proj_itens').insert(projItens);

        await trx.commit();

        return response.json({
            id: proj_id,
            ...projeto 
        });

    };
}

export default Projetos_controller; 