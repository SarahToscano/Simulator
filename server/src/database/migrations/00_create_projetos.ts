import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('projetos', table=>{
        table.increments('id').primary();
        table.string('projeto_nome').notNullable();
        table.string('autor').notNullable();
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('projetos');
}