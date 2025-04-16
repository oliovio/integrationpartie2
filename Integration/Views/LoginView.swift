//
//  LoginView.swift
//  Integration
//
//  Created by user268887 on 3/26/25.
//
import SwiftUI

import CoreData
 
struct LoginView: View {

    @EnvironmentObject var authService: AuthService

    @Environment(\.managedObjectContext) private var context  // Remplace "modelContext" par "managedObjectContext"

    @State private var email: String = ""

    @State private var password: String = ""

    @State private var isAuthenticated: Bool = false

    @State private var errorMessage: String = ""

    @State private var userRole: UserRole = .employee
 
    var body: some View {

        NavigationView {

            VStack {

                // Logo et Titre

                HStack {

                    Image("logo")

                        .resizable()

                        .frame(width: 100, height: 100)
 
                    Text("CortexIT")

                        .font(.title)

                }

                .padding(.bottom, 40)
 
                // Titres de bienvenue

                Text("Bienvenue")

                    .font(.largeTitle)

                    .bold()

                    .padding(.bottom, 10)
 
                Text("Connectez-vous")

                    .font(.title2)

                    .bold()

                    .padding(.bottom, 30)
 
                // Email

                TextField("Email", text: $email)

                    .padding()

                    .textFieldStyle(RoundedBorderTextFieldStyle())

                    .keyboardType(.emailAddress)

                    .autocapitalization(.none)
 
                // Mot de passe

                SecureField("Mot de passe", text: $password)

                    .padding()

                    .textFieldStyle(RoundedBorderTextFieldStyle())
 
                // Message d'erreur

                if !errorMessage.isEmpty {

                    Text(errorMessage)

                        .foregroundColor(.red)

                        .padding(.top, 10)

                }
 
                // Bouton de connexion

                Button(action: {

                    authenticateUser()

                }) {

                    Text("Se connecter")

                        .font(.headline)

                        .padding()

                        .frame(maxWidth: .infinity)

                        .background(Color(red: 0.2, green: 0.01, blue: 0.5))

                        .foregroundColor(.white)

                        .cornerRadius(10)

                        .padding(.top, 20)

                }
 
                // Lien vers l'inscription

                VStack {

                    Text("Vous ne possédez pas de compte?")

                        .foregroundColor(.gray)

                        .padding(.top, 20)
 
                    NavigationLink("Créez-en un maintenant!", destination: SignUpView())

                }
 
                Spacer()

            }

            .padding()

            .background(

                NavigationLink(

                    destination: destinationView(),

                    isActive: $isAuthenticated

                ) {

                    EmptyView()

                }

            )

        }

    }
 
    // Fonction d’authentification

    private func authenticateUser() {

        if email.isEmpty || password.isEmpty {

            errorMessage = "Veuillez remplir tous les champs."

            return

        }
 
        // Appelle AuthService pour simuler une connexion

        authService.login(email: email.lowercased(), password: password, context: context)
 
        if let user = authService.currentUser {

            userRole = UserRole(rawValue: user.role) ?? .employee

            isAuthenticated = true

            errorMessage = ""

        } else {

            errorMessage = "Email ou mot de passe incorrect."

        }

    }
 
    // Redirection selon le rôle

    private func destinationView() -> some View {

        switch userRole {

        case .admin:

            return AnyView(AdminView())

        case .technician:

            return AnyView(TechnicianView())

        case .employee:

            return AnyView(EmployeeView())

        }

    }

}
 
struct LoginView_Previews: PreviewProvider {

    static var previews: some View {

        LoginView()

            .environmentObject(AuthService())

            .environment(\.managedObjectContext, PersistenceController.preview.container.viewContext) // Ajout du contexte pour la prévisualisation

    }

}

 
