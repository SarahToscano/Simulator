import knex from '../database/connection'
import {Response, Request} from 'express';

class Itens_controller{

    async index (request:Request, response:Response) {
        const itens = await knex('itens').select('*');
        
        const serializeditens = itens.map( item=>{
            return {
                id: item.id,
                tipo: item.tipo,
                image_url: `http://localhost:8080/uploads/${item.image}`,
             };
        });
        return response.json(itens);
    }
}

export default Itens_controller;