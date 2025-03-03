import { NextRequest, NextResponse } from "next/server";

/**
 * GET - Récupérer tous les équipements
 */
export async function GET() {
    console.log('GET /api/equipements');
    try {
        // Simuler une liste d'équipements
        const equipements = [
            { id: 1, nom: "PC Portable", type: "Ordinateur", statut: "Disponible", departmentId: 1 },
            { id: 2, nom: "Imprimante", type: "Périphérique", statut: "En maintenance", departmentId: 2 }
        ];
        return NextResponse.json(equipements);
    } catch (error) {
        console.error('Erreur lors de la récupération des équipements:', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des équipements" },
            { status: 500 }
        );
    }
}

/**
 * POST - Créer un nouvel équipement
 */
export async function POST(request) {
    console.log('POST /api/equipements');
    try {
        const data = await request.json();

        // Validation des champs requis
        if (!data.nom || !data.type || !data.statut || !data.departmentId) {
            return NextResponse.json(
                { error: "Tous les champs sont requis (nom, type, statut, departmentId)" },
                { status: 400 }
            );
        }

        // Simuler la création d'un équipement
        const newEquipement = {
            id: Date.now(),
            ...data
        };

        return NextResponse.json(newEquipement, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de l\'équipement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la création de l'équipement" },
            { status: 500 }
        );
    }
}

/**
 * PUT - Mettre à jour un équipement
 */
export async function PUT(request) {
    console.log('PUT /api/equipements');
    try {
        const data = await request.json();
        
        if (!data.id) {
            return NextResponse.json(
                { error: "ID de l'équipement requis" },
                { status: 400 }
            );
        }

        // Simuler la mise à jour d'un équipement
        const updatedEquipement = {
            id: data.id,
            ...data
        };

        return NextResponse.json(updatedEquipement);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'équipement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour de l'équipement" },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Supprimer un équipement
 */
export async function DELETE(request) {
    console.log('DELETE /api/equipements');
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID de l'équipement requis" },
                { status: 400 }
            );
        }

        // Simuler la suppression
        return NextResponse.json(
            { message: `Équipement ${id} supprimé avec succès` }
        );
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'équipement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression de l'équipement" },
            { status: 500 }
        );
    }
}
