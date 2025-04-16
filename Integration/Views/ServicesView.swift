//
//  ServicesView.swift
//  Integration
//
//  Created by user268887 on 4/12/25.
//

import SwiftUI
 
struct ServicesView: View {

    var body: some View {

        ScrollView {

            VStack(alignment: .leading, spacing: 25) {

                Text("Nos Services")

                    .font(.largeTitle)

                    .bold()

                    .padding(.top)
 
                ServiceCard(

                    icon: "gearshape.fill",

                    title: "Gestion des Équipements",

                    description: "Enregistrement, modification et suivi des équipements informatiques : numéros de série, dates d’acquisition, responsables, etc."

                )
 
                ServiceCard(

                    icon: "wrench.and.screwdriver.fill",

                    title: "Suivi des Maintenances",

                    description: "Gestion des pannes, interventions de maintenance, alertes préventives et rapports d'intervention."

                )
 
                ServiceCard(

                    icon: "chart.bar.xaxis",

                    title: "Rapports et Statistiques",

                    description: "Générez automatiquement des rapports sur l’état, l’utilisation, et les coûts des équipements."

                )
 
                ServiceCard(

                    icon: "lock.shield.fill",

                    title: "Sécurité des Données",

                    description: "Gestion des droits d’accès, sauvegardes automatiques, et chiffrement des données sensibles."

                )
 
                ServiceCard(

                    icon: "person.3.fill",

                    title: "Support Utilisateur",

                    description: "Support technique disponible par téléphone, courriel, et système de ticket pendant les heures de bureau."

                )
 
                ServiceCard(

                    icon: "location.circle.fill",

                    title: "Géolocalisation",

                    description: "Suivi de la localisation des équipements sur une carte grâce à l'intégration de Google Maps API."

                )
 
                ServiceCard(

                    icon: "bell.fill",

                    title: "Système de Notifications",

                    description: "Alertes push via FCM, notifications email et SMS pour assurer un suivi en temps réel."

                )
 
                Spacer(minLength: 40)

            }

            .padding(.horizontal)

        }

        .navigationTitle("Services")

    }

}
 
struct ServiceCard: View {

    var icon: String

    var title: String

    var description: String
 
    var body: some View {

        HStack(alignment: .top, spacing: 16) {

            Image(systemName: icon)

                .resizable()

                .scaledToFit()

                .frame(width: 40, height: 40)

                .foregroundColor(.accentColor)
 
            VStack(alignment: .leading, spacing: 6) {

                Text(title)

                    .font(.headline)

                Text(description)

                    .font(.subheadline)

                    .foregroundColor(.secondary)

            }

        }

        .padding()

        .background(Color(.secondarySystemBackground))

        .cornerRadius(12)

        .shadow(color: .gray.opacity(0.1), radius: 4, x: 0, y: 2)

    }

}
 
struct ServicesView_Previews: PreviewProvider {

    static var previews: some View {

        NavigationView {

            ServicesView()

        }

    }

}

 
