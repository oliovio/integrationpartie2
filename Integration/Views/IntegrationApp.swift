//
//  IntegrationApp.swift
//  Integration
//
//  Created by user268887 on 3/26/25.
//
import SwiftUI
 
@main
struct IntegrationApp: App {
    @StateObject private var authService = AuthService()
    @StateObject private var userManager = UserManager(context: PersistenceController.shared.container.viewContext)
 
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, PersistenceController.shared.container.viewContext)
                .environmentObject(authService)
                .environmentObject(userManager)
        }
    }
}
 
 


