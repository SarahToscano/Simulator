import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('aerogeradores', table=>{
        table.increments('id').primary();
        table.decimal('vi_vento').notNullable();
        table.decimal('vf_vento').notNullable();
        table.decimal('raio').notNullable();
        table.decimal('k_somb').notNullable();
        table.decimal('inercia_turbina').notNullable();
        table.decimal('inercia_gerador').notNullable();
        table.decimal('atrito_turbina').notNullable();
        table.decimal('atrito_gerador').notNullable();
        table.decimal('k_torcao').notNullable();
        table.decimal('n_polos').notNullable();
        table.decimal('freq_rotacao').notNullable();
        table.decimal('r_estator').notNullable();
        table.decimal('l_rotor').notNullable();

        //table.integer('proj_id')
        //.notNullable()
        //.references('proj_id')
        //.inTable('proj_itens');


//Falta adicionar os parâmetros de controle (ADD em uma tabela separada ou aqui msm?
// Analisar a situação depois)
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('aerogeradores');
}