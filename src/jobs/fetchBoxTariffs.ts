import knex from "#postgres/knex.js";
import { getBoxTariffs } from "#services/wb.js";

function parseNumber(str: string): number {
    return parseFloat(str.replace(",", "."));
}

export async function fetchBoxTariffsJob() {
    const data = await getBoxTariffs();

    const { dtNextBox, dtTillMax, warehouseList } = data;

    for (const warehouse of warehouseList) {
        const { boxDeliveryAndStorageExpr, boxDeliveryBase, boxDeliveryLiter, boxStorageBase, boxStorageLiter, warehouseName } = warehouse;

        const row = {
            date_from: dtNextBox,
            date_to: dtTillMax,
            warehouse_name: warehouseName,
            delivery_and_storage_expr: parseNumber(boxDeliveryAndStorageExpr),
            delivery_base: parseNumber(boxDeliveryBase),
            delivery_per_liter: parseNumber(boxDeliveryLiter),
            storage_base: parseNumber(boxStorageBase),
            storage_per_liter: parseNumber(boxStorageLiter),
            updated_at: new Date(),
        };

        // upsert по date_from + warehouse_name
        await knex("tariffs").insert(row).onConflict(["date_from", "warehouse_name"]).merge();
    }

    console.log("Success");
}
