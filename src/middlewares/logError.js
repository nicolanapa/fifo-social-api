import process from "process";
import { appendFile } from "node:fs/promises";

async function logError(err, req, res, next) {
    const actualDate = new Date().toISOString();
    const customMessage = actualDate + " " + req.path + " " + err.message;

    if (process.env.PRETTY_LOGGING) {
        console.error(customMessage);
    } else {
        console.error(err);
    }

    if (process.env.WRITE_ERROR_TO_FILE) {
        const actualDate = new Date();
        const fileName =
            "./logs/" +
            actualDate.getUTCFullYear() +
            "-" +
            actualDate.getUTCMonth() +
            "-" +
            actualDate.getUTCDate() +
            "-log.txt";

        await appendFile(fileName, customMessage + "\n", (error) => {
            if (error) throw error;
        });
    }

    next(err);
}

export { logError };
