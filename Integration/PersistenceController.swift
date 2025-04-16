//
//  PersistenceController.swift
//  Integration
//
//  Created by user268887 on 4/11/25.
//

import Foundation
import CoreData
 
final class PersistenceController {

    static let shared = PersistenceController()
 
    static var preview: PersistenceController = {

        let controller = PersistenceController(inMemory: true)

        return controller

    }()
 
    let container: NSPersistentContainer
 
    init(inMemory: Bool = false) {

        container = NSPersistentContainer(name: "Models") // Remplace par le nom exact de ton modèle Core Data

        if inMemory {

            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")

        }

        container.loadPersistentStores { _, error in

            if let error = error as NSError? {

                fatalError("Erreur Core Data: \(error), \(error.userInfo)")

            }

        }

    }

}

 
