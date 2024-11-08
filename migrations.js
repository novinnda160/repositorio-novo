exports.up = function(knex) {
    return knex.schema.createTable('administradores', function(table) {
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('senha', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('administradores');
};
