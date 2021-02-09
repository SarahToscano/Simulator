import express from 'express';
import knex from './database/connection';
import Projetos_controller from './controllers/Projetos_controller';
import Itens_controller from './controllers/Itens_controller';
import Aero_controller from './controllers/Aero_controller';
 
const routes = express.Router();
const projetos_controller = new Projetos_controller();
const itens_controller = new Itens_controller();
const aero_controller = new Aero_controller();

// index, show, delete, update, create
routes.get('/itens', itens_controller.index);

routes.post('/projetos', projetos_controller.create);
routes.get('/projetos', projetos_controller.index);
routes.get('/projetos/:id', projetos_controller.show);

routes.post('/aerogeradores', aero_controller.create );

export default routes;