import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { serviceAccountAuth } from "#services/googlesheets.js";
import { getCurrentDateISO } from "#utils/dateISO.js";
import { logger } from "#utils/logger.js";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function updateSheetsJob(): Promise<void> {
    const spreadIds = await knex.select("*").from("spreadsheets");
    if (spreadIds.length === 0) return;

    const tariffs = await getLastTariffs();
    const header = [
        "updated_at",
        "date_from",
        "date_to",
        "warehouse_name",
        "delivery_and_storage_expr",
        "delivery_base",
        "delivery_per_liter",
        "storage_base",
        "storage_per_liter",
    ];

    const values = tariffs.map((t) => [
        t.updated_at.toISOString().split("T")[0],
        t.date_from,
        t.date_to,
        t.warehouse_name,
        t.delivery_and_storage_expr.toString(),
        t.delivery_base.toString(),
        t.delivery_per_liter.toString(),
        t.storage_base.toString(),
        t.storage_per_liter.toString(),
    ]);

    for (const spreadId of spreadIds) {
        const doc = new GoogleSpreadsheet(spreadId.spreadsheet_id, serviceAccountAuth);
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle[env.GOOGLE_SHEET_TITLE];
        if (!sheet) {
            sheet = await doc.addSheet({ title: env.GOOGLE_SHEET_TITLE, headerValues: header });
        } else {
            await sheet.clear();
            await sheet.setHeaderRow(header);
            // const rows = await sheet.getRows();

            // Works tooooo slow
            // for (const row of rows) {
            //     if (row.get("updated_at") === getCurrentDateISO()) {
            //         await row.delete();
            //     }
            // }
        }

        await sheet.addRows(values, { raw: true, insert: true });
    }
    logger.info("Spreadsheets updated succesfuly!");
}

async function getLastTariffs() {
    return knex("tariffs").select("*").whereRaw("DATE(updated_at) = ?", getCurrentDateISO()).orderBy("delivery_and_storage_expr", "asc");
}
