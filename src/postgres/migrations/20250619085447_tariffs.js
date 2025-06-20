/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("tariffs", (table) => {
        table.increments("id").primary();

        table.string("date_from").notNullable();
        table.string("date_to").notNullable();

        table.string("warehouse_name").notNullable();

        table.decimal("delivery_and_storage_expr", 10, 2).notNullable();
        table.decimal("delivery_base", 10, 2).notNullable();
        table.decimal("delivery_per_liter", 10, 2).notNullable();
        table.decimal("storage_base", 10, 2).notNullable();
        table.decimal("storage_per_liter", 10, 2).notNullable();

        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("tariffs");
}
