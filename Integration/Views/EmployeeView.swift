//
//  EmployeeView.swift
//  Integration
//
//  Created by user268887 on 4/9/25.
//
import SwiftUI
import CoreData
 
struct EmployeeView: View {

    @State private var selectedSection: EmployeeSection?

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

                            EmployeeDashboardView(openSection: { selectedSection = $0 })

                        case .equipment:

                            EmployeeEquipmentView()

                        case .requests:

                            EmployeeRequestsView()

                        case .notifications:

                            EmployeeNotificationsView()

                        }

                    }

                    .navigationTitle(section.title)

                    .padding()

                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

                }

                .padding()

            } else {

                VStack(alignment: .leading, spacing: 16) {

                    ForEach(EmployeeSection.allCases) { section in

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

                .navigationTitle("CortexIT Employé")

                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

            }

        }

    }

}
 
enum EmployeeSection: String, CaseIterable, Identifiable {

    case dashboard, equipment, requests, notifications

    var id: String { rawValue }

    var title: String {

        switch self {

        case .dashboard: return "Tableau de bord"

        case .equipment: return "Mes équipements"

        case .requests: return "Mes demandes"

        case .notifications: return "Notifications"

        }

    }

    var icon: String {

        switch self {

        case .dashboard: return "house"

        case .equipment: return "desktopcomputer"

        case .requests: return "doc.text"

        case .notifications: return "bell"

        }

    }

}
 
// MARK: - Employee Dashboard

struct EmployeeDashboardView: View {

    var openSection: (EmployeeSection) -> Void

    var body: some View {

        ScrollView {

            VStack(alignment: .leading, spacing: 32) {

                Text("Tableau de bord de l'employé")

                    .font(.largeTitle)

                    .bold()

                Text("Aperçu rapide de votre activité.")

                    .font(.subheadline)

                    .foregroundColor(.secondary)

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {

                    DashboardCard(

                        title: "Mes équipements",

                        subtitle: "Actuellement assignés",

                        icon: "desktopcomputer",

                        iconColor: .blue,

                        backgroundColor: Color.blue.opacity(0.1),

                        action: { openSection(.equipment) }

                    )

                    DashboardCard(

                        title: "Mes demandes",

                        subtitle: "Suivi des services",

                        icon: "doc.text.fill",

                        iconColor: .purple,

                        backgroundColor: Color.purple.opacity(0.1),

                        action: { openSection(.requests) }

                    )

                    DashboardCard(

                        title: "Notifications",

                        subtitle: "Derniers messages",

                        icon: "bell",

                        iconColor: .orange,

                        backgroundColor: Color.orange.opacity(0.1),

                        action: { openSection(.notifications) }

                    )

                }

            }

            .padding()

        }

    }

}
 
import SwiftUI
 
struct EmployeeEquipmentView: View {

    @State private var selectedFilter: String = "Tous"

    let filterOptions = ["Tous", "Ordinateur", "Téléphone", "Écran", "Autre"]
 
    var body: some View {

        VStack(alignment: .leading, spacing: 24) {

            Text("💻 Mes équipements")

                .font(.largeTitle.bold())
 
            Picker("Filtrer par type", selection: $selectedFilter) {

                ForEach(filterOptions, id: \.self) { Text($0) }

            }

            .pickerStyle(.segmented)
 
            List {

                // À connecter à SwiftData/CoreData

                Text("Aucun équipement assigné.")

                    .foregroundColor(.secondary)

            }

        }

        .padding()

    }

}
 
struct EquipmentDetailView: View {

    var equipmentName: String

    var serialNumber: String

    var brand: String

    var model: String

    var status: String
 
    var body: some View {

        Form {

            Section(header: Text("Informations")) {

                Label(equipmentName, systemImage: "desktopcomputer")

                Text("Marque : \(brand)")

                Text("Modèle : \(model)")

                Text("Numéro de série : \(serialNumber)")

                Text("Statut : \(status)")

            }
 
            Section {

                Button("Signaler un problème") {

                    // À connecter à formulaire de ticket ou demande

                }

            }

        }

        .navigationTitle(equipmentName)

    }

}

 
import SwiftUI
 
struct EmployeeRequestsView: View {

    @State private var showNewRequest = false
 
    var body: some View {

        VStack(alignment: .leading, spacing: 24) {

            Text("📄 Mes demandes")

                .font(.largeTitle.bold())
 
            Button("Faire une nouvelle demande") {

                showNewRequest = true

            }

            .buttonStyle(.borderedProminent)
 
            List {

                // À connecter à base de données

                Text("Aucune demande pour le moment.")

                    .foregroundColor(.secondary)

            }

        }

        .padding()

        .sheet(isPresented: $showNewRequest) {

            NewEmployeeRequestFormView()

        }

    }

}
 
struct NewEmployeeRequestFormView: View {

    @Environment(\.dismiss) private var dismiss
 
    @State private var subject: String = ""

    @State private var description: String = ""

    @State private var associatedEquipment: String = ""
 
    var body: some View {

        NavigationView {

            Form {

                Section(header: Text("Nouvelle demande")) {

                    TextField("Objet", text: $subject)

                    TextEditor(text: $description)

                        .frame(height: 100)
 
                    TextField("Équipement concerné (facultatif)", text: $associatedEquipment)

                }
 
                Section {

                    Button("Soumettre") {

                        // Ajouter à la base de données

                        dismiss()

                    }

                    .disabled(subject.isEmpty || description.isEmpty)

                }

            }

            .navigationTitle("Nouvelle demande")

            .toolbar {

                ToolbarItem(placement: .cancellationAction) {

                    Button("Annuler") { dismiss() }

                }

            }

        }

    }

}

 
 
struct EmployeeNotificationsView: View {

    @State private var notifications: [NotificationEmpItem] = []

    @State private var selectedCategory: String = "Toutes"
 
    let categories = ["Toutes", "Techniques", "Administratives", "Informations"]
 
    var body: some View {

        VStack(alignment: .leading, spacing: 24) {

            Text("🔔 Mes notifications")

                .font(.largeTitle.bold())
 
            Picker("Catégorie", selection: $selectedCategory) {

                ForEach(categories, id: \.self) { Text($0) }

            }

            .pickerStyle(.segmented)
 
            List {

                if notifications.isEmpty {

                    Text("Aucune notification pour le moment.")

                        .foregroundColor(.secondary)

                } else {

                    ForEach(notifications.filter {

                        selectedCategory == "Toutes" || $0.category == selectedCategory

                    }) { notif in

                        HStack {

                            VStack(alignment: .leading) {

                                Text(notif.message)

                                    .fontWeight(notif.read ? .regular : .bold)

                                Text(notif.dateFormatted)

                                    .font(.caption)

                                    .foregroundColor(.secondary)

                            }

                            Spacer()

                            if !notif.read {

                                Button("Marquer comme lu") {

                                    // Mettre à jour en base

                                }

                                .font(.caption)

                            }

                        }

                        .padding(.vertical, 4)

                    }

                }

            }

        }

        .padding()

    }

}
 
struct NotificationEmpItem: Identifiable {

    let id = UUID()

    let message: String

    let date: Date

    let category: String

    var read: Bool
 
    var dateFormatted: String {

        let formatter = DateFormatter()

        formatter.dateStyle = .medium

        formatter.timeStyle = .short

        return formatter.string(from: date)

    }

}


 struct EmployeeView_Previews: PreviewProvider {
 
    static var previews: some View {
 
        EmployeeView()
 
            .environmentObject(AuthService())
 
    }
 
}
 
 
