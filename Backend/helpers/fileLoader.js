import multer from "multer";

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    // Définition du dossier de destination pour les fichiers téléchargés
    destination: './public/images',

    // Personnalisation du nom du fichier téléchargé
    filename: function (req, file, cb) {
        // Le nom du fichier sera constitué de l'identifiant du champ (fieldname), du prénom de l'utilisateur (donné dans le body),
        // et de l'extension du fichier (extraction de l'extension à partir du nom original du fichier)
        const fileExtension = file.originalname.split('.').pop();  // Extraction de l'extension du fichier
        cb(null, `${file.fieldname}-${req.body.prenom}.${fileExtension}`); // Construction du nom final
    }
});

// Filtre de type pour accepter uniquement certains types de fichiers
const fileFilter = (req, file, cb) => {
    // Types de fichiers acceptés : images uniquement
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (acceptedTypes.includes(file.mimetype)) {
        cb(null, true); // Le fichier est accepté
    } else {
        cb(null, false); // Le fichier est rejeté
    }
};

// Configuration de Multer pour gérer les fichiers téléchargés
const upload = multer({
    storage: storage,              // Le stockage défini plus haut
    limits: {                      // Limites sur la taille du fichier
        fileSize: 10 * 1024 * 1024, // Limite de taille à 10MB
    },
    fileFilter: fileFilter         // Application du filtre de types de fichiers
});

export default upload;
