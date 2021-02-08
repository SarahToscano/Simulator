import Knex from'knex';

export async function seed(knex: Knex) {
    await knex('itens').insert([
        { tipo: 'Aerogerador', image:'icon_turbina.svg' },
        { tipo: 'Painel Solar', image:'icon_pv.svg' },
        { tipo: 'Barra Infinita', image:'icon_barra-inf.svg' },
        { tipo: 'Rede Elétrica', image:'icon_rede.svg' },
    ]);
}