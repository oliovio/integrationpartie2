//
//  UserManager.swift
//  Integration
//
//  Created by user268887 on 4/11/25.
//

import Foundation
import CoreData
 
enum UserRegistrationError: LocalizedError {

    case duplicateEmail

    case coreDataError(Error)
 
    var errorDescription: String? {

        switch self {

        case .duplicateEmail:

            return "Un utilisateur avec cet e-mail existe déjà."

        case .coreDataError(let error):

            return error.localizedDescription

        }

    }

}
 
class UserManager: ObservableObject {

    private let context: NSManagedObjectContext
 
    init(context: NSManagedObjectContext) {

        self.context = context

    }
 
    func registerUser(name: String, email: String, password: String, role: Int64) -> Result<User, Error> {

        // Vérifie si l'utilisateur existe déjà

        let fetchRequest: NSFetchRequest<User> = User.fetchRequest()

        fetchRequest.predicate = NSPredicate(format: "email == %@", email)
 
        do {

            let existingUsers = try context.fetch(fetchRequest)

            if !existingUsers.isEmpty {

                return .failure(UserRegistrationError.duplicateEmail)

            }
 
            // Crée un nouvel utilisateur

            let newUser = User(context: context)

            newUser.id = UUID()

            newUser.name = name

            newUser.email = email

            newUser.password = password

            newUser.role = role
 
            // Sauvegarde

            try context.obtainPermanentIDs(for: [newUser])

            try context.save()
 
            return .success(newUser)
 
        } catch {

            print("Erreur Core Data : \(error.localizedDescription)")

            return .failure(UserRegistrationError.coreDataError(error))

        }

    }
 
    func fetchUser(byEmail email: String, andPassword password: String) -> User? {

        let request: NSFetchRequest<User> = User.fetchRequest()

        request.predicate = NSPredicate(format: "email == %@ AND password == %@", email, password)
 
        do {

            let result = try context.fetch(request)

            return result.first

        } catch {

            print("Erreur lors de la récupération de l'utilisateur : \(error.localizedDescription)")

            return nil

        }

    }
 
    func fetchAllUsers() -> [User] {

        let request: NSFetchRequest<User> = User.fetchRequest()

        do {

            return try context.fetch(request)

        } catch {

            print("Erreur lors du fetch des utilisateurs : \(error.localizedDescription)")

            return []

        }

    }

}

 
