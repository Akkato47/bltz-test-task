/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "1IArdEOf-0HuTs00UYLsyCaRnvV9WS-BSlBWz2eYY91w" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
