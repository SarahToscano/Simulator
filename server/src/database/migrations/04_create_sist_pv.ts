import Knex from 'knex';

export async function up(knex: Knex){
//CRIAR TABELA
    return knex.schema.createTable('pv', table=>{
        table.increments('id').primary();
        table.decimal('rs').notNullable();
        table.decimal('rp').notNullable();
        table.decimal('fator_ideal').notNullable();
        table.decimal('temp').notNullable();
        table.decimal('irradiancia').notNullable();
    });
}

export async function down(knex: Knex) {
//DESFAZER
    return knex.schema.dropTable('pv');
}