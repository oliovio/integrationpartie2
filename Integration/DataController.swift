//
//  DataController.swift
//  Integration
//
//  Created by user268887 on 3/27/25.
//
import Foundation

import CoreData
 
// MARK: - Classe DataController
 
public class DataController: ObservableObject {
    
   // @StateObject var userManager = UserManager()

    // 1 - Nom du modèle Core Data, il doit correspondre au nom de votre fichier .xcdatamodeld

    let container: NSPersistentContainer

    // Initialisation du DataController

    init(inMemory: Bool = false) {

        // 2 - Chargement de la base de données physique en mémoire pour l'utilisation sécurisée dans la variable "container"

        container = NSPersistentContainer(name: "Models") // Remplacez "Models" par le nom de votre modèle

        if inMemory {

            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null") // Utilise un store en mémoire

        }

        loadPersistentStores()

    }

    // MARK: - Méthode pour charger les magasins persistants

    private func loadPersistentStores() {

        container.loadPersistentStores { (description, error) in

            if let error = error as NSError? {

                // Gestion des erreurs lors du chargement des magasins persistants

                fatalError("Impossible de charger les magasins persistants: \(error), \(error.userInfo)")

            } else {

                print("Magasin persistant chargé avec succès: \(description)")

            }

        }

    }

    // MARK: - Classe UserManager

    class UserManager: ObservableObject {

        // Le contexte de gestion des objets persistants

        private var context: NSManagedObjectContext

        // Liste des utilisateurs récupérés

        @Published var users: [User] = []

        // Initialisation avec un contexte de Core Data

        init(context: NSManagedObjectContext) {

            self.context = context

            fetchUsers()

        }

        // Méthode pour récupérer tous les utilisateurs

        func fetchUsers() {

            let request: NSFetchRequest<User> = User.fetchRequest()

            do {

                users = try context.fetch(request)

            } catch {

                print("Erreur lors de la récupération des utilisateurs: \(error.localizedDescription)")

            }

        }

        // Méthode pour créer un utilisateur

        func createUser(name: String, email: String, password: String, role: Role) -> User? {

            let newUser = User(context: context)

            newUser.id = UUID()

            newUser.name = name

            newUser.email = email

            newUser.password = password

            newUser.role = role.permissions

            do {

                try context.save()

                fetchUsers() // Met à jour la liste des utilisateurs après ajout

                return newUser

            } catch {

                print("Erreur lors de la création de l'utilisateur: \(error.localizedDescription)")

                return nil

            }

        }

        // Méthode pour supprimer un utilisateur

        func deleteUser(user: User) {

            context.delete(user)

            do {

                try context.save()

                fetchUsers() // Met à jour la liste des utilisateurs après suppression

            } catch {

                print("Erreur lors de la suppression de l'utilisateur: \(error.localizedDescription)")

            }

        }

        // Méthode pour authentifier un utilisateur

        func authenticateUser(email: String, password: String) -> User? {

            return users.first { $0.email?.lowercased() == email.lowercased() && $0.password == password }

        }

        // Méthode pour mettre à jour le mot de passe d'un utilisateur

        func updatePassword(for user: User, newPassword: String) {

            user.password = newPassword

            do {

                try context.save()

                fetchUsers() // Met à jour la liste des utilisateurs après modification

            } catch {

                print("Erreur lors de la mise à jour du mot de passe: \(error.localizedDescription)")

            }

        }

    }

    // MARK: - Méthode pour obtenir le contexte de la vue

    var viewContext: NSManagedObjectContext {

        return container.viewContext

    }

    // MARK: - Méthode pour sauvegarder le contexte

    func saveContext() {

        if viewContext.hasChanges {

            do {

                try viewContext.save()

                print("Contexte sauvegardé avec succès.")

            } catch {

                let nsError = error as NSError

                print("Erreur lors de la sauvegarde du contexte: \(nsError), \(nsError.userInfo)")

            }

        }

    }

    // MARK: - Méthode pour réinitialiser le contexte (utile pour les tests)

    func resetContext() {

        viewContext.rollback()

        print("Contexte réinitialisé.")

    }

    // MARK: - Méthode pour la prévisualisation

    static var preview: DataController = {

        let controller = DataController(inMemory: true) // Utilisation d'un store en mémoire pour la prévisualisation

        let viewContext = controller.container.viewContext

        return controller

    }()

}

 
