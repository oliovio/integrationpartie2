import SwiftUI

import CoreData
 
// MARK: - Vue principale du Technicien

struct TechnicianView: View {

    @State private var selectedSection: TechnicianSection?
 
    var body: some View {

        NavigationStack {

            if let section = selectedSection {

                VStack(alignment: .leading) {

                    Button {

                        selectedSection = nil

                    } label: {

                        Label("Retour au menu", systemImage: "chevron.left")

                            .foregroundColor(.blue)

                    }

                    .padding(.bottom)
 
                    Divider()
 
                    Group {

                        switch section {

                        case .dashboard: TechnicianDashboardView(selectedSection: $selectedSection)

                        case .equipment: TechnicianEquipmentManagementView()

                        case .tickets: TechnicianTicketManagementView()

                        case .requests: TechnicianServiceRequestView()

                        case .notifications: TechnicianNotificationsView()

                        }

                    }

                    .navigationTitle(section.title)

                    .navigationBarTitleDisplayMode(.inline)

                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

                }

                .padding()

            } else {

                VStack(alignment: .leading, spacing: 20) {

                    Text("Choisissez une section pour commencer.")

                        .foregroundColor(.secondary)
 
                    ForEach(TechnicianSection.allCases) { section in

                        Button {

                            selectedSection = section

                        } label: {

                            HStack(spacing: 12) {

                                Image(systemName: section.icon)

                                    .frame(width: 24, height: 24)

                                    .foregroundColor(.blue)

                                Text(section.title)

                                    .font(.headline)

                            }

                            .padding()

                            .frame(maxWidth: .infinity, alignment: .leading)

                            .background(RoundedRectangle(cornerRadius: 12).fill(Color.gray.opacity(0.1)))

                        }

                        .buttonStyle(PlainButtonStyle())

                    }
 
                    Spacer()

                }

                .padding()

                .navigationTitle("CortexIT - Technicien")

            }

        }

    }

}
 
enum TechnicianSection: String, CaseIterable, Identifiable {

    case dashboard, equipment, tickets, requests, notifications
 
    var id: String { rawValue }
 
    var title: String {

        switch self {

        case .dashboard: return "Tableau de bord"

        case .equipment: return "Gestion des équipements"

        case .tickets: return "Gestion des tickets"

        case .requests: return "Demandes de service"

        case .notifications: return "Notifications"

        }

    }
 
    var icon: String {

        switch self {

        case .dashboard: return "chart.bar"

        case .equipment: return "desktopcomputer"

        case .tickets: return "ticket"

        case .requests: return "doc.text"

        case .notifications: return "bell"

        }

    }

}
 
// MARK: - Dashboard

struct TechnicianDashboardView: View {

    @Binding var selectedSection: TechnicianSection?
 
    var body: some View {

        ScrollView {

            VStack(alignment: .leading, spacing: 32) {

                Text("Tableau de bord du technicien")

                    .font(.system(size: 36, weight: .bold, design: .rounded))
 
                Text("Aperçu rapide de vos tâches.")

                    .font(.title2)

                    .foregroundColor(.secondary)
 
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 16) {

                    DashboardCard(title: "Tickets à traiter", subtitle: "Voir les tickets en cours", icon: "wrench.and.screwdriver", iconColor: .orange, backgroundColor: .orange.opacity(0.1)) {

                        selectedSection = .tickets

                    }

                    DashboardCard(title: "Équipements gérés", subtitle: "Voir les équipements suivis", icon: "desktopcomputer", iconColor: .green, backgroundColor: .green.opacity(0.1)) {

                        selectedSection = .equipment

                    }

                    DashboardCard(title: "Demandes reçues", subtitle: "Voir les demandes de service", icon: "doc.plaintext", iconColor: .blue, backgroundColor: .blue.opacity(0.1)) {

                        selectedSection = .requests

                    }

                }

                .padding(.top, 16)

            }

            .padding()

        }

    }

}
 
struct DashboardCard: View {

    var title: String

    var subtitle: String

    var icon: String

    var iconColor: Color

    var backgroundColor: Color

    var action: () -> Void
 
    var body: some View {

        Button(action: action) {

            VStack(alignment: .leading, spacing: 8) {

                Image(systemName: icon)

                    .font(.title)

                    .foregroundColor(iconColor)
 
                Text(title)

                    .font(.title3.bold())
 
                Text(subtitle)

                    .font(.subheadline)

                    .foregroundColor(.secondary)

            }

            .padding()

            .frame(maxWidth: .infinity)

            .background(backgroundColor)

            .cornerRadius(12)

            .shadow(radius: 5)

        }

        .buttonStyle(.plain)

    }

}
 
// MARK: - Gestion des équipements

struct TechnicianEquipmentManagementView: View {

    var body: some View {

        List {

            NavigationLink("📋 Liste des équipements", destination: EquipmentListView())

            NavigationLink("➕ Ajouter / Modifier un équipement", destination: EditEquipmentView())

            NavigationLink("🛠️ Planifier une maintenance", destination: MaintenanceSchedulerView())

        }

        .navigationTitle("Gestion des équipements")

    }

}
 
struct EquipmentListView: View {

    @State private var selectedFilter = "Tous"

    let filters = ["Tous", "En service", "En maintenance", "Hors service"]
 
    var body: some View {

        VStack(alignment: .leading) {

            Text("📋 Tous les équipements")

                .font(.title2.bold())
 
            Picker("Filtrer par état", selection: $selectedFilter) {

                ForEach(filters, id: \.self) { Text($0) }

            }

            .pickerStyle(.segmented)

            .padding(.vertical)
 
            List {

                Text("Aucun équipement affiché.")

                    .foregroundColor(.secondary)

            }

        }

        .padding()

        .navigationTitle("Liste des équipements")

        .navigationBarTitleDisplayMode(.inline)

    }

}
 
struct EquipmenttechDetailView: View {

    var equipmentName: String

    var serialNumber: String

    var status: String

    var assignedUser: String
 
    var body: some View {

        Form {

            Section(header: Text("Informations générales")) {

                Text("Nom : \(equipmentName)")

                Text("Numéro de série : \(serialNumber)")

                Text("Statut : \(status)")

                Text("Assigné à : \(assignedUser)")

            }
 
            Section(header: Text("Historique de maintenance")) {

                Text("Aucune entrée disponible.")

                    .foregroundColor(.secondary)

            }

        }

        .navigationTitle(equipmentName)

    }

}
 
struct EditEquipmentView: View {

    @State private var name = ""

    @State private var serial = ""

    @State private var status = "En service"

    @State private var assignedUser = ""

    let statusOptions = ["En service", "En maintenance", "Hors service"]
 
    var body: some View {

        Form {

            Section(header: Text("Modifier un équipement")) {

                TextField("Nom", text: $name)

                TextField("Numéro de série", text: $serial)

                Picker("Statut", selection: $status) {

                    ForEach(statusOptions, id: \.self) { Text($0) }

                }

                TextField("Assigné à (email ou nom)", text: $assignedUser)

            }
 
            Section {

                Button("Sauvegarder les modifications") {

                    // À connecter à la BDD

                }

                .disabled(name.isEmpty || serial.isEmpty)

            }

        }

        .navigationTitle("Modifier équipement")

    }

}
 
struct MaintenanceSchedulerView: View {

    @State private var equipmentID = ""

    @State private var description = ""

    @State private var date = Date()
 
    var body: some View {

        Form {

            Section(header: Text("Maintenance à planifier")) {

                TextField("ID ou nom de l’équipement", text: $equipmentID)

                TextEditor(text: $description).frame(height: 100)

                DatePicker("Date d'intervention", selection: $date, displayedComponents: [.date, .hourAndMinute])

            }
 
            Section {

                Button("Planifier") {

                    // À connecter à la BDD

                }

                .disabled(equipmentID.isEmpty || description.isEmpty)

            }

        }

        .navigationTitle("Planifier une maintenance")

    }

}

struct TechnicianTicketManagementView: View {

    var body: some View {

        NavigationStack {

            List {

                NavigationLink("📋 Liste des tickets", destination: TicketListView())

                NavigationLink("➕ Nouveau ticket", destination: AddTicketView())

            }

            .navigationTitle("Gestion des tickets")

        }

    }

}
 
// MARK: - Liste des tickets

struct TicketListView: View {

    @State private var selectedFilter = "Tous"

    let filters = ["Tous", "Assignés", "Non assignés", "Résolus"]
 
    var body: some View {

        VStack(alignment: .leading) {

            Text("📋 Tickets")

                .font(.title2.bold())
 
            Picker("Filtrer", selection: $selectedFilter) {

                ForEach(filters, id: \.self) { Text($0) }

            }

            .pickerStyle(.segmented)

            .padding(.vertical)
 
            List {

                // À remplacer par des données dynamiques

                NavigationLink("Ticket #001 - Problème réseau") {

                    TicketDetailView(ticketID: "001", status: "En cours", assignedTo: "Non assigné")

                }

            }
 
            Spacer()

        }

        .padding()

        .navigationTitle("Liste des tickets")

        .navigationBarTitleDisplayMode(.inline)

    }

}
 
// MARK: - Détail d’un ticket

struct TicketDetailView: View {

    let ticketID: String

    @State var status: String

    @State var assignedTo: String

    @State private var comment = ""
 
    let statusOptions = ["Ouvert", "En cours", "Résolu"]
 
    var body: some View {

        Form {

            Section(header: Text("Informations")) {

                Text("ID : #\(ticketID)")

                Text("Statut : \(status)")

                Text("Assigné à : \(assignedTo)")

            }
 
            Section(header: Text("Mettre à jour")) {

                Picker("Nouveau statut", selection: $status) {

                    ForEach(statusOptions, id: \.self) { Text($0) }

                }
 
                TextField("Technicien assigné", text: $assignedTo)
 
                Button("Enregistrer") {

                    // Sauvegarde réelle ici

                }

            }
 
            Section(header: Text("Commentaires de suivi")) {

                TextEditor(text: $comment)

                    .frame(height: 80)

                Button("Ajouter un commentaire") {

                    // Ajouter un commentaire

                    comment = ""

                }

            }

        }

        .navigationTitle("Ticket #\(ticketID)")

    }

}
 
// MARK: - Modifier un ticket (optionnel si intégré dans détail)

struct EditTicketView: View {

    @State private var ticketID = ""

    @State private var newStatus = "En cours"

    @State private var newTechnician = ""
 
    let statuses = ["Ouvert", "En cours", "Résolu"]
 
    var body: some View {

        Form {

            Section(header: Text("Modifier un ticket")) {

                TextField("ID du ticket", text: $ticketID)
 
                Picker("Statut", selection: $newStatus) {

                    ForEach(statuses, id: \.self) { Text($0) }

                }
 
                TextField("Nouveau technicien", text: $newTechnician)
 
                Button("Enregistrer les modifications") {

                    // Mise à jour réelle

                }

            }

        }

        .navigationTitle("Modifier Ticket")

    }

}
 
// MARK: - Créer un ticket

struct AddtechTicketView: View {

    @State private var subject = ""

    @State private var description = ""

    @State private var associatedEquipment = ""
 
    var body: some View {

        Form {

            Section(header: Text("Nouveau ticket")) {

                TextField("Objet", text: $subject)

                TextEditor(text: $description).frame(height: 100)

                TextField("Équipement associé (facultatif)", text: $associatedEquipment)

            }
 
            Section {

                Button("Créer le ticket") {

                    // Créer dans la base

                }

                .disabled(subject.isEmpty || description.isEmpty)

            }

        }

        .navigationTitle("Nouveau ticket")

    }

}


struct TechnicianNotificationsView: View {

    @State private var notifications: [NotificationItem] = []

    @State private var selectedCategory = "Toutes"
 
    let categories = ["Toutes", "Tickets", "Demandes", "Maintenance", "Autre"]
 
    var body: some View {

        VStack(alignment: .leading, spacing: 20) {

            Text("🔔 Notifications technicien")

                .font(.largeTitle.bold())
 
            Picker("Catégorie", selection: $selectedCategory) {

                ForEach(categories, id: \.self) { Text($0) }

            }

            .pickerStyle(.segmented)
 
            List {

                if notifications.isEmpty {

                    Text("Aucune notification disponible.")

                        .foregroundColor(.secondary)

                } else {

                    ForEach(filteredNotifications) { notif in

                        NotificationRow(notification: notif)

                    }

                }

            }

        }

        .padding()

        .navigationTitle("Notifications")

    }
 
    var filteredNotifications: [NotificationItem] {

        selectedCategory == "Toutes"

            ? notifications

            : notifications.filter { $0.category == selectedCategory }

    }

}
 
struct NotificationItem: Identifiable {

    let id = UUID()

    let message: String

    let date: Date

    let category: String

    var isRead: Bool = false

}
 
struct NotificationRow: View {

    @State var notification: NotificationItem
 
    var body: some View {

        HStack {

            VStack(alignment: .leading) {

                Text(notification.message)

                    .fontWeight(notification.isRead ? .regular : .bold)

                Text(notification.date, style: .time)

                    .font(.caption)

                    .foregroundColor(.gray)

            }

            Spacer()

            if !notification.isRead {

                Button("Marquer comme lu") {

                    notification.isRead = true

                }

                .font(.caption)

            }

        }

        .padding(.vertical, 4)

    }

}

 struct TechnicianServiceRequestView: View {

    var body: some View {

        List {

            NavigationLink {

                ServiceRequestDetailView(requestID: "SR001", title: "Remplacer clavier", status: "En attente", employeeName: "Jean Dupont")

            } label: {

                VStack(alignment: .leading) {

                    Text("SR001 - Remplacer clavier")

                        .font(.headline)

                    Text("Statut : En attente")

                        .font(.caption)

                        .foregroundColor(.secondary)

                }

            }

        }

        .navigationTitle("Demandes de service")

    }

}
 
struct ServiceRequestDetailView: View {

    var requestID: String

    @State var title: String

    @State var status: String

    var employeeName: String
 
    let statusOptions = ["En attente", "En cours", "Terminée", "Rejetée"]
 
    var body: some View {

        Form {

            Section(header: Text("Demande")) {

                Text("ID : \(requestID)")

                Text("Titre : \(title)")

                Text("Employé : \(employeeName)")

            }
 
            Section(header: Text("Mise à jour")) {

                Picker("Statut", selection: $status) {

                    ForEach(statusOptions, id: \.self) { Text($0) }

                }

                Button("Mettre à jour") {

                    // Logique ici

                }

            }
 
            Section {

                Button("Créer un ticket associé") {

                    // Logique de création

                }

            }

        }

        .navigationTitle("SR: \(title)")

    }

}

 

 // MARK: - Aperçu
 
struct TechnicianView_Previews: PreviewProvider {

    static var previews: some View {

        TechnicianView()

    }

}

 
