import { createLogger, format, transports } from "winston";

const logFormat = format.combine(
    format.timestamp({
        format: () => {
            const date = new Date();
            const utcOffset = 3 * 60 * 60 * 1000; // +3 UTC
            const localDate = new Date(date.getTime() + utcOffset);
            return localDate.toISOString().replace("T", " ").substring(0, 19);
        },
    }),
    format.printf((info) => `[${info.timestamp}] - [${info.level.toUpperCase()}] - ${info.message}`),
    format.colorize({ all: true }),
);

export const logger = createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "app.log",
        }),
    ],
});
