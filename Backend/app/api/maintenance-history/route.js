import { NextRequest, NextResponse } from "next/server";

/**
 * GET - Récupérer tout l'historique de maintenance
 */
export async function GET() {
    console.log('GET /api/maintenance-history');
    try {
        // Simuler une liste d'historique de maintenance
        const history = [
            { 
                id: 1, 
                equipementId: 1,
                description: "Maintenance préventive",
                date: "2025-03-03",
                technicienId: 1
            },
            { 
                id: 2, 
                equipementId: 2,
                description: "Réparation",
                date: "2025-03-02",
                technicienId: 2
            }
        ];
        return NextResponse.json(history);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération de l'historique" },
            { status: 500 }
        );
    }
}

/**
 * POST - Créer un nouvel enregistrement de maintenance
 */
export async function POST(request) {
    console.log('POST /api/maintenance-history');
    try {
        const data = await request.json();

        // Validation des champs requis
        if (!data.equipementId || !data.description || !data.date || !data.technicienId) {
            return NextResponse.json(
                { error: "Tous les champs sont requis (equipementId, description, date, technicienId)" },
                { status: 400 }
            );
        }

        // Validation du format de la date
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(data.date)) {
            return NextResponse.json(
                { error: "Format de date invalide (YYYY-MM-DD)" },
                { status: 400 }
            );
        }

        // Simuler la création d'un enregistrement
        const newRecord = {
            id: Date.now(),
            ...data
        };

        return NextResponse.json(newRecord, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de l\'enregistrement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la création de l'enregistrement" },
            { status: 500 }
        );
    }
}

/**
 * PUT - Mettre à jour un enregistrement de maintenance
 */
export async function PUT(request) {
    console.log('PUT /api/maintenance-history');
    try {
        const data = await request.json();
        
        if (!data.id) {
            return NextResponse.json(
                { error: "ID de l'enregistrement requis" },
                { status: 400 }
            );
        }

        // Validation du format de la date si fournie
        if (data.date) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(data.date)) {
                return NextResponse.json(
                    { error: "Format de date invalide (YYYY-MM-DD)" },
                    { status: 400 }
                );
            }
        }

        // Simuler la mise à jour d'un enregistrement
        const updatedRecord = {
            id: data.id,
            ...data
        };

        return NextResponse.json(updatedRecord);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enregistrement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour de l'enregistrement" },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Supprimer un enregistrement de maintenance
 */
export async function DELETE(request) {
    console.log('DELETE /api/maintenance-history');
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "ID de l'enregistrement requis" },
                { status: 400 }
            );
        }

        // Simuler la suppression
        return NextResponse.json(
            { message: `Enregistrement ${id} supprimé avec succès` }
        );
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enregistrement:', error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression de l'enregistrement" },
            { status: 500 }
        );
    }
}
