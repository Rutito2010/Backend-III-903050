import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {config} from "./index.js"


// winston funciona con niveles de criticidad siendo el mas bajo el mas critico
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "cyan"
    }
}

winston.addColors(customLevels.colors)

const logFormat = winston.format.printf(({timestamp, level, message})=>{
    return `${timestamp} [${level}] ${message}`
})


const logger = winston.createLogger({
    levels: customLevels.levels,
    level: config.isProd ? config.loggerLvl : "debug",
    format: winston.format.combine( 
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all: true}),//si se saca el objeto solo colorea el nivel de criticidad
                winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                logFormat
            )
        }),
        new DailyRotateFile({
            filename: "logs/errors-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxFiles: "14d"
        })
    ]
})

export default logger