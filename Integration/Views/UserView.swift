//
//  UserView.swift
//  Integration
//
//  Created by user268887 on 4/9/25.
//

import SwiftUI
import CoreData
 
struct UserViews: View {
    @Environment(\.managedObjectContext) private var context
    @FetchRequest(
        entity: User.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \User.name, ascending: true)],
        animation: .default
    ) private var users: FetchedResults<User>
    @State private var showAddUser = false
    @State private var selectedUser: User?
    var body: some View {
        NavigationStack {
            List {
                ForEach(users) { user in
                    Button(action: {
                        selectedUser = user
                    }) {
                        VStack(alignment: .leading) {
                            Text(user.name ?? "Nom inconnu")
                                .font(.headline)
                            Text(user.email ?? "Email inconnu")
                                .font(.subheadline)
                        }
                    }
                }
                .onDelete { indexSet in
                    for index in indexSet {
                        let user = users[index]
                        context.delete(user)
                    }
                    try? context.save()
                }
            }
            .navigationTitle("Utilisateurs")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showAddUser = true }) {
                        Label("Ajouter", systemImage: "plus")
                    }
                }
            }
            .sheet(item: $selectedUser) { user in
                EditUserView(user: user)
            }
            .sheet(isPresented: $showAddUser) {
                AddUserView()
            }
        }
    }
}
 
struct AddUserView: View {
    @Environment(\.managedObjectContext) private var context
    @Environment(\.dismiss) private var dismiss
    @State private var name = ""
    @State private var email = ""
    @State private var role: Int64 = 2
    var body: some View {
        NavigationStack {
            Form {
                TextField("Nom", text: $name)
                TextField("Email", text: $email)
                Picker("Rôle", selection: $role) {
                    Text("Administrateur").tag(0)
                    Text("Technicien").tag(1)
                    Text("Employé").tag(2)
                }
            }
            .navigationTitle("Ajouter un utilisateur")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Enregistrer") {
                        let newUser = User(context: context)
                        newUser.id = UUID()
                        newUser.name = name
                        newUser.email = email
                        newUser.role = role
                        try? context.save()
                        dismiss()
                    }
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Annuler", role: .cancel) {
                        dismiss()
                    }
                }
            }
        }
    }
}
 
struct EditUserView: View {

    @Environment(\.managedObjectContext) private var context

    @Environment(\.dismiss) private var dismiss

    @ObservedObject var user: User

    var body: some View {

        NavigationStack {

            Form {

                TextField("Nom", text: Binding(

                    get: { user.name ?? "" },

                    set: { user.name = $0 }

                ))

                TextField("Email", text: Binding(

                    get: { user.email ?? "" },

                    set: { user.email = $0 }

                ))

                Picker("Rôle", selection: $user.role) {

                    Text("Administrateur").tag(0)

                    Text("Technicien").tag(1)

                    Text("Employé").tag(2)

                }

            }

            .navigationTitle("Modifier l'utilisateur")

            .toolbar {

                ToolbarItem(placement: .confirmationAction) {

                    Button("Sauvegarder") {

                        try? context.save()

                        dismiss()

                    }

                }

                ToolbarItem(placement: .destructiveAction) {

                    Button("Supprimer", role: .destructive) {

                        context.delete(user)

                        try? context.save()

                        dismiss()

                    }

                }

            }

        }

    }

}

 
