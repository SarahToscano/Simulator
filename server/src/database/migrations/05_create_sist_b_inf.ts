import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('b_inf', table=>{
        table.increments('id').primary();
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('b_inf');
}