Instalar:
$ npm install ts-node-dev -D
$ npm install knex
$ npm install sqlite3
$ npx knex migrate:latest --knexfile knexfile.ts migrate:latest


Executar:
$npm run dev


Inicilaizar base de dados:
$ npm run knex:migrate
$ npm run knex:seed

/*const{
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
    */
    //Relacionamento entre tabelas
    //const projAero = proj_itens.map((item_id:number) =>{
    //   if(item_id==1){
    //        return{
    //            proj_itens.select("")
    //        };
    //    }; 
    //});
