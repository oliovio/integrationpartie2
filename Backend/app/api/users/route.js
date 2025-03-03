import { NextRequest, NextResponse } from "next/server";

/**
 * GET - Récupérer tous les utilisateurs
 */
export async function GET() {
    console.log('GET /api/users');
    try {
        // Simuler une liste d'utilisateurs
        const users = [
            { id: 1, nom: "User 1", email: "user1@example.com", role: "user" },
            { id: 2, nom: "User 2", email: "user2@example.com", role: "admin" }
        ];
        return NextResponse.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des utilisateurs" },
            { status: 500 }
        );
    }
}

/**
 * POST - Créer un nouvel utilisateur
 */
export async function POST(request) {
    console.log('POST /api/users');
    try {
        const data = await request.json();

        // Validation des champs requis
        if (!data.nom || !data.email || !data.role) {
            return NextResponse.json(
                { error: "Tous les champs sont requis (nom, email, role)" },
                { status: 400 }
            );
        }

        // Simuler la création d'un utilisateur
        const newUser = {
            id: Date.now(),
            ...data
        };

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return NextResponse.json(
            { error: "Erreur lors de la création de l'utilisateur" },
            { status: 500 }
        );
    }
}

/**
 * PUT - Mettre à jour un utilisateur
 */
export async function PUT(request) {
    console.log('PUT /api/users');
    try {
        const data = await request.json();
        
        if (!data.id) {
            return NextResponse.json(
                { error: "ID de l'utilisateur requis" },
                { status: 400 }
            );
        }

        // Simuler la mise à jour d'un utilisateur
        const updatedUser = {
            id: data.id,
            ...data
        };

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour de l'utilisateur" },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Supprimer un utilisateur
 */
export async function DELETE(request) {
    console.log('DELETE /api/users');
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID de l'utilisateur requis" },
                { status: 400 }
            );
        }

        // Simuler la suppression
        return NextResponse.json(
            { message: `Utilisateur ${id} supprimé avec succès` }
        );
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression de l'utilisateur" },
            { status: 500 }
        );
    }
}
