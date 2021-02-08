import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('itens', table=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('tipo').notNullable();
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('itens');
}
