import { fetchBoxTariffsJob } from "#jobs/fetchBoxTariffs.js";
import { updateSheetsJob } from "#jobs/updateSheets.js";
import { migrate, seed } from "#postgres/knex.js";
import { schedule } from "node-cron";

await migrate.latest();
await seed.run();

// schedule("0 * * * *", () => {
//     console.log("Scheduled fetchBoxTariffs start");
//     fetchBoxTariffsJob();
// });

// schedule("0 */2 * * *", () => {
//     console.log("Scheduled updateSheets start");
//     updateSheetsJob();
// });

async function hourlyJob() {
    try {
        // await fetchBoxTariffsJob();
        await updateSheetsJob();
    } catch (e) {
        console.error("Ошибка при выполнении работы:", e);
    }
}

// setInterval(hourlyJob, 5 * 60 * 60 * 1000);
await hourlyJob();
console.log("All migrations and seeds have been run");
