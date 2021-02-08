import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('aerogeradores', table=>{
        table.increments('id').primary();
        table.decimal('vi_vento');
        table.decimal('vf_vento');
        table.decimal('raio');
        table.decimal('k_somb');
        table.decimal('inercia_turbina');
        table.decimal('inercia_gerador');
        table.decimal('atrito_turbina');
        table.decimal('atrito_gerador');
        table.decimal('k_torcao');
        table.decimal('n_polos');
        table.decimal('freq_rotacao');
        table.decimal('r_estator');
        table.decimal('l_rotor');

        table.integer('aeroProjIds')
        .references('proj_id')
        .inTable('proj_itens');

        table.integer('projItensIds')
        .references('id')
        .inTable('proj_itens');


//Falta adicionar os parâmetros de controle (ADD em uma tabela separada ou aqui msm?
// Analisar a situação depois)
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('aerogeradores');
}