//
//  AuthService.swift
//  Integration
//
//  Created by user268887 on 4/11/25.
//
import SwiftUI

import CoreData
 
class AuthService: ObservableObject {

    @Published var currentUser: User?

    var userRole: UserRole? {

        guard let rawRole = currentUser?.role else { return nil }

        return UserRole(rawValue: rawRole)

    }

    func login(email: String, password: String, context: NSManagedObjectContext) {

        // Rechercher l'utilisateur dans CoreData

        let request: NSFetchRequest<User> = User.fetchRequest()

        request.predicate = NSPredicate(format: "email == %@", email)

        do {

            let users = try context.fetch(request)

            if let user = users.first {

                // Simuler la connexion si l'utilisateur existe

                currentUser = user

            } else {

                // Si aucun utilisateur n'est trouvé, tu peux ajouter une logique pour gérer les erreurs ou l'enregistrement d'un nouvel utilisateur

                print("Utilisateur non trouvé.")

            }

        } catch {

            print("Erreur lors de la récupération de l'utilisateur: \(error.localizedDescription)")

        }

    }

    func logout() {

        currentUser = nil

    }

}

 
