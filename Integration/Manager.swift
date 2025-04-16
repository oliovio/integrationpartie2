//
//  Manager.swift
//  Integration
//
//  Created by user268887 on 4/3/25.
//

import Foundation
import CoreData

import Combine
 
// MARK: - Gestionnaire de base
 
class BaseManager {

    let context: NSManagedObjectContext

    init(context: NSManagedObjectContext) {

        self.context = context

    }

    func saveContext() {

        do {

            try context.save()

            print("Contexte sauvegardé avec succès.")

        } catch {

            print("Erreur lors de la sauvegarde du contexte : \(error.localizedDescription)")

        }

    }

}
 
// MARK: - Gestionnaire d'équipements
 
class EquipmentManager: BaseManager {

    @discardableResult

    func addEquipment(name: String, status: String) -> Result<Equipment, Error> {

        let equipment = Equipment(context: context)

        equipment.id = UUID()

        equipment.name = name

        equipment.status = status

        do {

            try context.save()

            print("Équipement ajouté : \(equipment)")

            return .success(equipment)

        } catch {

            print("Erreur lors de l'ajout de l'équipement : \(error.localizedDescription)")

            return .failure(error)

        }

    }

}
 
// MARK: - Gestionnaire de rapports
 
class ReportManager: BaseManager {

    func generateReport(for user: User) -> Result<[Report], Error> {

        let request: NSFetchRequest<Report> = Report.fetchRequest()

        request.predicate = NSPredicate(format: "user == %@", user)

        do {

            let reports = try context.fetch(request)

            return .success(reports)

        } catch {

            print("Erreur lors de la génération du rapport : \(error.localizedDescription)")

            return .failure(error)

        }

    }

}
 
// MARK: - Gestionnaire d'affectation de technicien
 
class TechnicianAssignmentManager: BaseManager {

    func assignTechnician(to serviceRequest: Service, technician: User) -> Result<Void, Error> {

        if let technicianID = technician.id?.uuidString {

            serviceRequest.technician = technician

        } else {

            return .failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "L'identifiant du technicien est manquant"]))

        }

        do {

            try context.save()

            print("Technicien assigné avec succès.")

            return .success(())

        } catch {

            print("Erreur lors de l'assignation du technicien : \(error.localizedDescription)")

            return .failure(error)

        }

    }

}
 
// MARK: - Gestionnaire Administrateur
 
class AdminManager: BaseManager {

    func deleteUser(user: User) -> Result<Void, Error> {

        context.delete(user)

        do {

            try context.save()

            print("Utilisateur supprimé avec succès.")

            return .success(())

        } catch {

            print("Erreur lors de la suppression de l'utilisateur : \(error.localizedDescription)")

            return .failure(error)

        }

    }

}

 
