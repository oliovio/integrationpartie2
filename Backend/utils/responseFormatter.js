/**
 * Formatte une réponse réussie
 * @param {string} message - Message de succès
 * @param {*} data - Données à renvoyer
 * @param {number} statusCode - Code de statut HTTP (défaut: 200)
 */
export const successResponse = (message, data = null, statusCode = 200) => {
    const response = {
        success: true,
        message
    };

    if (data !== null) {
        response.data = data;
    }

    return {
        statusCode,
        body: response
    };
};

/**
 * Formatte une réponse d'erreur
 * @param {string} message - Message d'erreur
 * @param {*} errors - Détails des erreurs
 * @param {number} statusCode - Code de statut HTTP (défaut: 400)
 */
export const errorResponse = (message, errors = null, statusCode = 400) => {
    const response = {
        success: false,
        message
    };

    if (errors !== null) {
        response.errors = errors;
    }

    return {
        statusCode,
        body: response
    };
};

/**
 * Formatte une réponse de pagination
 * @param {string} message - Message de succès
 * @param {Array} data - Données à paginer
 * @param {number} page - Page actuelle
 * @param {number} limit - Nombre d'éléments par page
 * @param {number} total - Nombre total d'éléments
 */
export const paginatedResponse = (message, data, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    
    return {
        statusCode: 200,
        body: {
            success: true,
            message,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }
    };
};
