import logger from '../config/logger.js';

export const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log la requête entrante
    logger.info(`Incoming ${req.method} request to ${req.url}`);
    
    // Capture la réponse
    const oldSend = res.send;
    res.send = function(data) {
        const duration = Date.now() - start;
        
        // Log la réponse
        logger.info(`Request completed in ${duration}ms with status ${res.statusCode}`);
        
        // Appel de la fonction send originale
        oldSend.apply(res, arguments);
    };
    
    next();
};
