import { NextRequest, NextResponse } from "next/server";

/**
 * Route GET pour vérifier la disponibilité du service d'authentification
 */
export async function GET() {
    console.log('GET /api/auth');
    return NextResponse.json({ message: 'Service d\'authentification disponible' });
}

/**
 * Route POST pour l'inscription d'un nouvel utilisateur
 * @param {NextRequest} request 
 */
export async function POST(request) {
    console.log('POST /api/auth');

    try {
        const data = await request.json();
        
        // Validation des champs requis
        if (!data.nom || !data.email || !data.password || !data.role) {
            return NextResponse.json(
                { error: "Tous les champs sont requis (nom, email, password, role)" },
                { status: 400 }
            );
        }

        // Validation du format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: "Format d'email invalide" },
                { status: 400 }
            );
        }

        // Validation du mot de passe (minimum 6 caractères)
        if (data.password.length < 6) {
            return NextResponse.json(
                { error: "Le mot de passe doit contenir au moins 6 caractères" },
                { status: 400 }
            );
        }

        // Validation du rôle
        const rolesValides = ['admin', 'user', 'technicien'];
        if (!rolesValides.includes(data.role)) {
            return NextResponse.json(
                { error: "Rôle invalide. Les rôles autorisés sont : admin, user, technicien" },
                { status: 400 }
            );
        }

        // Simuler une inscription réussie (à remplacer par la vraie logique de base de données)
        return NextResponse.json(
            { 
                message: "Inscription réussie",
                user: {
                    nom: data.nom,
                    email: data.email,
                    role: data.role
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return NextResponse.json(
            { error: "Erreur lors de l'inscription" },
            { status: 500 }
        );
    }
}

/**
 * Route PUT - Non supportée
 */
export async function PUT() {
    console.log('PUT /api/auth');
    return NextResponse.json(
        { error: "Méthode non supportée" },
        { status: 405 }
    );
}

/**
 * Route PATCH - Non supportée
 */
export async function PATCH() {
    console.log('PATCH /api/auth');
    return NextResponse.json(
        { error: "Méthode non supportée" },
        { status: 405 }
    );
}

/**
 * Route DELETE - Non supportée
 */
export async function DELETE() {
    console.log('DELETE /api/auth');
    return NextResponse.json(
        { error: "Méthode non supportée" },
        { status: 405 }
    );
}
