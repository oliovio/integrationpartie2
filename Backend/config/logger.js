const getTimestamp = () => {
    return new Date().toISOString();
};

const logger = {
    info: (message, ...args) => {
        if (process.env.LOG_LEVEL === 'info' || process.env.NODE_ENV === 'development') {
            console.log(`[${getTimestamp()}] INFO: ${message}`, ...args);
        }
    },

    error: (message, ...args) => {
        console.error(`[${getTimestamp()}] ERROR: ${message}`, ...args);
    },

    warn: (message, ...args) => {
        if (process.env.LOG_LEVEL !== 'error') {
            console.warn(`[${getTimestamp()}] WARN: ${message}`, ...args);
        }
    },

    debug: (message, ...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[${getTimestamp()}] DEBUG: ${message}`, ...args);
        }
    }
};

export default logger;
