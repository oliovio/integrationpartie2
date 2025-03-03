import { NextRequest, NextResponse } from "next/server";

/**
 * GET - Récupérer tous les départements
 */
export async function GET() {
    console.log('GET /api/departments');
    try {
        // Simuler une liste de départements
        const departments = [
            { id: 1, nom: "Informatique", description: "Service informatique" },
            { id: 2, nom: "RH", description: "Ressources humaines" }
        ];
        return NextResponse.json(departments);
    } catch (error) {
        console.error('Erreur lors de la récupération des départements:', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des départements" },
            { status: 500 }
        );
    }
}

/**
 * POST - Créer un nouveau département
 */
export async function POST(request) {
    console.log('POST /api/departments');
    try {
        const data = await request.json();

        // Validation des champs requis
        if (!data.nom || !data.description) {
            return NextResponse.json(
                { error: "Tous les champs sont requis (nom, description)" },
                { status: 400 }
            );
        }

        // Simuler la création d'un département
        const newDepartment = {
            id: Date.now(),
            ...data
        };

        return NextResponse.json(newDepartment, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création du département:', error);
        return NextResponse.json(
            { error: "Erreur lors de la création du département" },
            { status: 500 }
        );
    }
}

/**
 * PUT - Mettre à jour un département
 */
export async function PUT(request) {
    console.log('PUT /api/departments');
    try {
        const data = await request.json();
        
        if (!data.id) {
            return NextResponse.json(
                { error: "ID du département requis" },
                { status: 400 }
            );
        }

        // Simuler la mise à jour d'un département
        const updatedDepartment = {
            id: data.id,
            ...data
        };

        return NextResponse.json(updatedDepartment);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du département:', error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du département" },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Supprimer un département
 */
export async function DELETE(request) {
    console.log('DELETE /api/departments');
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID du département requis" },
                { status: 400 }
            );
        }

        // Simuler la suppression
        return NextResponse.json(
            { message: `Département ${id} supprimé avec succès` }
        );
    } catch (error) {
        console.error('Erreur lors de la suppression du département:', error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression du département" },
            { status: 500 }
        );
    }
}
