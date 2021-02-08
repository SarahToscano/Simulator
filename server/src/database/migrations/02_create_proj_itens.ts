import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('proj_itens', table=>{
        table.increments('id').primary();

        table.integer('proj_id')
            .notNullable()
            .references('id')
            .inTable('projetos');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('itens');
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('proj_itens');
}