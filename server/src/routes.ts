import express from 'express';
import knex from './database/connection';
import Projetos_controller from './controllers/Projetos_controllers';
import Itens_controller from './controllers/Itens_controller';
import Aero_controller from './controllers/Aero_controllers';
 
const routes = express.Router();
const projetos_controller = new Projetos_controller();
const itens_controller = new Itens_controller();
const aero_controller = new Aero_controller();

routes.get('/itens', itens_controller.index);

routes.post('/projetos', projetos_controller.create);

routes.post('/aerogeradores', aero_controller.create );

export default routes;