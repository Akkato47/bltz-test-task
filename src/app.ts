import { fetchBoxTariffsJob } from "#jobs/fetchBoxTariffs.js";
import { updateSheetsJob } from "#jobs/updateSheets.js";
import { migrate, seed } from "#postgres/knex.js";
import { logger } from "#utils/logger.js";
import { schedule } from "node-cron";

await migrate.latest();
await seed.run();
logger.info("All migrations and seeds have been run");

// 0 * * * * - Every hour
schedule("0 * * * *", async () => {
    try {
        await fetchBoxTariffsJob();
        await updateSheetsJob();
    } catch (error) {
        logger.error(`Ошибка при выполнении работы:\n${error}`);
    }
});
