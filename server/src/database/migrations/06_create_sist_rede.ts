import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('rede', table=>{
        table.increments('id').primary();
        table.integer('n_bars').notNullable();
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('rede');
}