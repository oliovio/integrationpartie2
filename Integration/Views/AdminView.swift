//
//  AdminView.swift
//  Integration
//
//  Created by user268887 on 4/9/25.
//
import SwiftUI

import CoreData
 
struct AdminView: View {

    @State private var selectedSection: AdminSection?
 
    var body: some View {

        NavigationStack {

            if let section = selectedSection {

                VStack(alignment: .leading) {

                    Button(action: {

                        selectedSection = nil

                    }) {

                        Label("Retour au menu", systemImage: "chevron.left")

                            .foregroundColor(.blue)

                    }

                    .padding(.bottom)

                    Divider()

                    Group {

                        switch section {

                        case .dashboard:

                            DashboardView(selectedSection: $selectedSection)

                        case .users:

                            UserManagementView()

                        case .equipment:

                            EquipmentManagementView()

                        case .tickets:

                            TicketManagementView()

                        case .requests:

                            ServiceRequestView()


                        case .settings:

                            SettingsView()

                        case .notifications:

                            NotificationsView()

                        }

                    }

                    .navigationTitle(section.title)

                    .padding()

                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

                }

                .padding()

            } else {

                VStack(alignment: .leading, spacing: 16) {

                    ForEach(AdminSection.allCases) { section in

                        Button(action: {

                            selectedSection = section

                        }) {

                            HStack(spacing: 10) {

                                Image(systemName: section.icon)

                                Text(section.title)

                                    .fontWeight(.medium)

                            }

                            .padding(.vertical, 8)

                            .padding(.horizontal, 12)

                            .frame(maxWidth: .infinity, alignment: .leading)

                            .background(

                                RoundedRectangle(cornerRadius: 8)

                                    .fill(Color.gray.opacity(0.1))

                            )

                        }

                        .buttonStyle(PlainButtonStyle())

                    }

                    Spacer()

                }

                .padding()

                .navigationTitle("CortexIT Admin")

                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

            }

        }

    }

}
 
enum AdminSection: String, CaseIterable, Identifiable {

    case dashboard, users, equipment, tickets, requests, settings, notifications

    var id: String { rawValue }
 
    var title: String {

        switch self {

        case .dashboard: return "Dashboard"

        case .users: return "Utilisateurs"

        case .equipment: return "Équipements"

        case .tickets: return "Tickets"

        case .requests: return "Demandes"

        case .settings: return "Paramètres"

        case .notifications: return "Notifications"

        }

    }
 
    var icon: String {

        switch self {

        case .dashboard: return "chart.bar"

        case .users: return "person.3"

        case .equipment: return "desktopcomputer"

        case .tickets: return "ticket"

        case .requests: return "doc.text"

        case .settings: return "gear"

        case .notifications: return "bell"

        }

    }

}
 
struct DashboardView: View {

    @Binding var selectedSection: AdminSection?
 
    var body: some View {

        GeometryReader { geometry in

            let isCompact = geometry.size.width < 600

            let columns = isCompact ? 1 : 2

            ScrollView {

                VStack(alignment: .leading, spacing: 32) {

                    headerSection

                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 16), count: columns), spacing: 20) {

                        DashboardCard(

                            title: "Utilisateurs",

                            subtitle: "Comptes actifs",

                            icon: "person.crop.circle.badge.checkmark",

                            iconColor: .blue,

                            backgroundColor: Color.blue.opacity(0.1),

                            action: { selectedSection = .users }

                        )

                        DashboardCard(

                            title: "Équipements",

                            subtitle: "Actifs & attribués",

                            icon: "desktopcomputer",

                            iconColor: .green,

                            backgroundColor: Color.green.opacity(0.1),

                            action: { selectedSection = .equipment }

                        )

                        DashboardCard(

                            title: "Tickets ouverts",

                            subtitle: "Demandes en attente",

                            icon: "exclamationmark.triangle.fill",

                            iconColor: .orange,

                            backgroundColor: Color.orange.opacity(0.1),

                            action: { selectedSection = .tickets }

                        )

                        DashboardCard(

                            title: "Demandes de service",

                            subtitle: "En attente de validation",

                            icon: "doc.text.fill",

                            iconColor: .purple,

                            backgroundColor: Color.purple.opacity(0.1),

                            action: { selectedSection = .requests }

                        )

                    }

                    Spacer()

                }

                .padding()

            }

        }

    }
 
    private var headerSection: some View {

        VStack(alignment: .leading, spacing: 6) {

            Text("Tableau de bord")

                .font(.largeTitle).bold()

            Text("Aperçu des statistiques clés de votre système.")

                .font(.subheadline)

                .foregroundColor(.secondary)

        }

    }
 
    struct DashboardCard: View {

        let title: String

        let subtitle: String

        let icon: String

        let iconColor: Color

        let backgroundColor: Color

        let action: () -> Void
 
        var body: some View {

            Button(action: action) {

                HStack(spacing: 16) {

                    ZStack {

                        Circle()

                            .fill(iconColor)

                            .frame(width: 44, height: 44)

                        Image(systemName: icon)

                            .foregroundColor(.white)

                            .font(.system(size: 22, weight: .medium))

                    }

                    VStack(alignment: .leading, spacing: 4) {

                        Text(title)

                            .font(.headline)

                            .lineLimit(1)

                        Text(subtitle)

                            .font(.caption)

                            .foregroundColor(.secondary)

                            .lineLimit(1)

                    }

                    Spacer()

                    Image(systemName: "chevron.right")

                        .foregroundColor(.gray)

                        .font(.footnote)

                }

                .padding()

                .frame(maxWidth: .infinity, minHeight: 85)

                .background(backgroundColor)

                .cornerRadius(14)

                .shadow(color: Color.black.opacity(0.03), radius: 3, x: 0, y: 2)

            }

            .buttonStyle(.plain)

        }

    }

}
 
struct UserManagementView: View {

    @Environment(\.managedObjectContext) private var viewContext

    @FetchRequest(

        sortDescriptors: [NSSortDescriptor(keyPath: \User.name, ascending: true)],

        animation: .default

    ) private var users: FetchedResults<User>

    @State private var newUserName: String = ""

    @State private var newUserEmail: String = ""
 
    var body: some View {

        Form {

            Section("Ajouter un utilisateur") {

                TextField("Nom", text: $newUserName)

                TextField("Email", text: $newUserEmail)

                    .keyboardType(.emailAddress)

                Button("Ajouter") {

                    let user = User(context: viewContext)

                    user.id = UUID()

                    user.name = newUserName

                    user.email = newUserEmail

                    user.role = 2 // Employé par défaut

                    do {

                        try viewContext.save()

                        newUserName = ""

                        newUserEmail = ""

                    } catch {

                        print("Erreur lors de l’ajout : \(error.localizedDescription)")

                    }

                }

            }

            Section("Utilisateurs existants") {

                ForEach(users, id: \.self) { user in

                    VStack(alignment: .leading) {

                        Text(user.name ?? "Inconnu")

                            .font(.headline)

                        Text(user.email ?? "")

                            .font(.subheadline)

                            .foregroundColor(.secondary)

                    }

                }

                .onDelete(perform: deleteUser)

            }

        }

        .navigationTitle("Utilisateurs")

    }
 
    private func deleteUser(at offsets: IndexSet) {

        for index in offsets {

            viewContext.delete(users[index])

        }

        do {

            try viewContext.save()

        } catch {

            print("Erreur lors de la suppression : \(error)")

        }

    }

}
 
struct EquipmentManagementView: View {

    @Environment(\.managedObjectContext) private var viewContext

    @FetchRequest(

        entity: Equipment.entity(),

        sortDescriptors: [NSSortDescriptor(keyPath: \Equipment.name, ascending: true)]

    ) var equipments: FetchedResults<Equipment>

    @State private var newEquipmentName: String = ""
 
    var body: some View {

        Form {

            Section("Ajouter un équipement") {

                TextField("Nom de l’équipement", text: $newEquipmentName)

                Button("Ajouter") {

                    let newEquipment = Equipment(context: viewContext)

                    newEquipment.name = newEquipmentName

                    newEquipment.status = "Disponible" // ou autre par défaut

                    do {

                        try viewContext.save()

                        newEquipmentName = ""

                    } catch {

                        print("Erreur lors de l’ajout de l’équipement : \(error)")

                    }

                }

            }

            Section("Équipements") {

                ForEach(equipments, id: \.self) { equipment in

                    VStack(alignment: .leading) {

                        Text(equipment.name ?? "Équipement inconnu")

                            .font(.headline)

                        Text("Statut: \(equipment.status ?? "Non spécifié")")

                            .font(.subheadline)

                            .foregroundColor(.secondary)

                    }

                }

                .onDelete(perform: deleteEquipment)

            }

        }

        .navigationTitle("Gestion des Équipements")

    }
 
    private func deleteEquipment(at offsets: IndexSet) {

        for index in offsets {

            viewContext.delete(equipments[index])

        }

        do {

            try viewContext.save()

        } catch {

            print("Erreur lors de la suppression : \(error)")

        }

    }

}

struct TicketManagementView: View {
        @State private var showNewTicketForm = false
     
        var body: some View {

            VStack(alignment: .leading, spacing: 24) {

                Text("🎟️ Gestion des Tickets")

                    .font(.largeTitle.bold())
     
                HStack {

                    Button("Créer un nouveau ticket") {

                        showNewTicketForm = true

                    }

                    .buttonStyle(.borderedProminent)
     
                    Spacer()

                }
     
                // Liste des tickets à intégrer avec votre source de données réelle

                List {

                    // Remplacer ceci par un ForEach connecté à CoreData ou SwiftData

                    Text("Aucun ticket à afficher.")

                        .foregroundColor(.secondary)

                }

            }

            .padding()

            .sheet(isPresented: $showNewTicketForm) {

                NewTicketFormView()

            }

        }

    }
     
    struct NewTicketFormView: View {

        @Environment(\.dismiss) private var dismiss

        @State private var title: String = ""

        @State private var assignedTo: String = ""

        @State private var status: String = "Ouvert"
     
        let statuses = ["Ouvert", "En cours", "Fermé"]
     
        var body: some View {

            NavigationView {

                Form {

                    Section(header: Text("Informations")) {

                        TextField("Titre du ticket", text: $title)
     
                        TextField("Technicien assigné", text: $assignedTo)
     
                        Picker("Statut", selection: $status) {

                            ForEach(statuses, id: \.self) { stat in

                                Text(stat)

                            }

                        }

                    }
     
                    Section {

                        Button("Créer le ticket") {

                            // Appeler ici une fonction pour insérer dans la base de données

                            dismiss()

                        }

                        .disabled(title.isEmpty)

                    }

                }

                .navigationTitle("Nouveau Ticket")

                .toolbar {

                    ToolbarItem(placement: .cancellationAction) {

                        Button("Annuler") { dismiss() }

                    }

                }

            }

        }

    }

     
 
struct AddTicketView: View {

    @Environment(\.dismiss) var dismiss

    @State private var description = ""
 
    var body: some View {

        NavigationView {

            Form {

                Section(header: Text("Description")) {

                    TextField("Décrire le problème...", text: $description)

                }
 
                Section {

                    Button("Soumettre") {

                        // Enregistrement à implémenter

                        dismiss()

                    }

                }

            }

            .navigationTitle("Nouveau Ticket")

            .toolbar {

                ToolbarItem(placement: .cancellationAction) {

                    Button("Annuler") {

                        dismiss()

                    }

                }

            }

        }

    }

}
 
struct ServiceRequestView: View {

    @State private var showNewRequestForm = false
     
        var body: some View {
            VStack(alignment: .leading, spacing: 24) {
                Text("📄 Demandes de service")
                    .font(.largeTitle.bold())
     
                HStack {
                    Button("Créer une nouvelle demande") {
                        showNewRequestForm = true
                    }
                    .buttonStyle(.borderedProminent)
     
                    Spacer()
                }
     
                // Liste des demandes (à connecter à votre source de données)
                List {
                    // À remplacer par ForEach connecté à vos données
                    Text("Aucune demande à afficher.")
                        .foregroundColor(.secondary)
                }
            }
            .padding()
            .sheet(isPresented: $showNewRequestForm) {
                NewRequestFormView()
            }
        }
    }
     
    struct NewRequestFormView: View {
        @Environment(\.dismiss) private var dismiss
        @State private var subject: String = ""
        @State private var assignedTechnician: String = ""
        @State private var priority: String = "Normale"
        @State private var status: String = "Ouverte"
     
        let priorities = ["Basse", "Normale", "Élevée", "Critique"]
        let statuses = ["Ouverte", "En cours", "Résolue", "Fermée"]
     
        var body: some View {
            NavigationView {
                Form {
                    Section(header: Text("Détails de la demande")) {
                        TextField("Objet", text: $subject)
                        TextField("Technicien assigné", text: $assignedTechnician)
     
                        Picker("Priorité", selection: $priority) {
                            ForEach(priorities, id: \.self) { level in
                                Text(level)
                            }
                        }
     
                        Picker("Statut", selection: $status) {
                            ForEach(statuses, id: \.self) { state in
                                Text(state)
                            }
                        }
                    }
     
                    Section {
                        Button("Soumettre la demande") {
                            // Appeler ici une fonction pour sauvegarder dans la base de données
                            dismiss()
                        }
                        .disabled(subject.isEmpty)
                    }
                }
                .navigationTitle("Nouvelle Demande")
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Annuler") { dismiss() }
                    }
                }
            }
        }
    }
 
struct SettingsView: View {

    @AppStorage("darkMode") private var darkMode = false

    @AppStorage("notificationsEnabled") private var notificationsEnabled = true
 
    var body: some View {

        NavigationView {

            Form {

                Section(header: Text("Apparence")) {

                    Toggle("Mode sombre", isOn: $darkMode)

                }
 
                Section(header: Text("Notifications")) {

                    Toggle("Activer les notifications", isOn: $notificationsEnabled)

                }
 
                Section(header: Text("Sécurité")) {

                    Button("Changer le mot de passe") {

                        // Action future

                    }

                }
 
                Section {

                    Button("Se déconnecter", role: .destructive) {

                        // Action de déconnexion

                    }

                }

            }

            .navigationTitle("Paramètres")

        }

    }

}
 
struct NotificationsView: View {

    @State private var showCreateForm = false
     
        var body: some View {
            VStack(alignment: .leading, spacing: 24) {
                Text("🔔 Notifications")
                    .font(.largeTitle.bold())
     
                HStack {
                    Button("Créer une notification") {
                        showCreateForm = true
                    }
                    .buttonStyle(.borderedProminent)
     
                    Spacer()
                }
     
                // Liste des notifications existantes (à connecter à SwiftData/CoreData)
                List {
                    // À remplacer par ForEach avec des données réelles
                    Text("Aucune notification enregistrée.")
                        .foregroundColor(.secondary)
                }
            }
            .padding()
            .sheet(isPresented: $showCreateForm) {
                CreateNotificationFormView()
            }
        }
    }
     
    struct CreateNotificationFormView: View {
        @Environment(\.dismiss) private var dismiss
     
        @State private var message: String = ""
        @State private var audience: String = "Tous"
        @State private var frequency: String = "Temps réel"
     
        let audiences = ["Tous", "Techniciens", "Administrateurs"]
        let frequencies = ["Temps réel", "Quotidien", "Hebdomadaire"]
     
        var body: some View {
            NavigationView {
                Form {
                    Section(header: Text("Contenu de la notification")) {
                        TextEditor(text: $message)
                            .frame(minHeight: 120)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.gray.opacity(0.2))
                            )
                    }
     
                    Section(header: Text("Destinataires")) {
                        Picker("Audience", selection: $audience) {
                            ForEach(audiences, id: \.self) { Text($0) }
                        }
                    }
     
                    Section(header: Text("Fréquence")) {
                        Picker("Fréquence", selection: $frequency) {
                            ForEach(frequencies, id: \.self) { Text($0) }
                        }
                    }
     
                    Section {
                        Button("Envoyer la notification") {
                            // Logique de sauvegarde ici (vers base de données ou service)
                            dismiss()
                        }
                        .disabled(message.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    }
                }
                .navigationTitle("Nouvelle Notification")
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Annuler") { dismiss() }
                    }
                }
            }
        }
    }
struct NewServiceTypeFormView: View {

    @Environment(\.dismiss) var dismiss
 
    @State private var serviceName: String = ""

    @State private var serviceDescription: String = ""
 
    var body: some View {

        VStack(spacing: 16) {

            Text("Ajouter un nouveau type de service")

                .font(.headline)
 
            TextField("Nom du service", text: $serviceName)

                .textFieldStyle(RoundedBorderTextFieldStyle())
 
            TextField("Description du service", text: $serviceDescription)

                .textFieldStyle(RoundedBorderTextFieldStyle())
 
            HStack {

                Button("Annuler") {

                    dismiss()

                }

                .buttonStyle(.bordered)
 
                Button("Ajouter") {

                    dismiss()

                }

                .buttonStyle(.borderedProminent)

            }

        }

        .padding()

        .navigationBarTitle("Nouveau type de service", displayMode: .inline)

    }

}

 
struct AddServiceTypeView: View {

    @Environment(\.dismiss) var dismiss

    @State private var serviceName = ""
 
    var body: some View {

        NavigationView {

            Form {

                Section(header: Text("Nom du service")) {

                    TextField("Ex: Sécurité réseau", text: $serviceName)

                }
 
                Section {

                    Button("Ajouter") {

                        // Enregistrement dans la base plus tard

                        dismiss()

                    }

                }

            }

            .navigationTitle("Ajouter un type")

            .toolbar {

                ToolbarItem(placement: .cancellationAction) {

                    Button("Annuler") {

                        dismiss()

                    }

                }

            }

        }

    }

}

// MARK: - Preview

struct AdminView_Previews: PreviewProvider {

    static var previews: some View {

        AdminView()

    }

}

 
