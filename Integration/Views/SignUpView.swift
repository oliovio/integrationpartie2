//
//  SignUpView.swift
//  Integration
//
//  Created by user268887 on 3/26/25.
//
import SwiftUI
 
struct SignUpView: View {

    @EnvironmentObject var userManager: UserManager
 
    @State private var name: String = ""

    @State private var email: String = ""

    @State private var password: String = ""

    @State private var confirmPassword: String = ""

    @State private var selectedRole: UserRole = .employee
 
    @State private var errorMessage: String = ""

    @State private var isUserRegistered: Bool = false
 
    var body: some View {

        NavigationView {

            VStack {

                // Logo et titre

                HStack {

                    Image("logo")

                        .resizable()

                        .frame(width: 100, height: 100)
 
                    Text("CortexIT")

                        .font(.title)

                }

                .padding(.bottom, 10)
 
                Text("Créer un compte")

                    .font(.largeTitle)

                    .bold()

                    .padding(.bottom, 30)
 
                // Champs de formulaire

                Group {

                    TextField("Nom", text: $name)

                        .padding()

                        .textFieldStyle(RoundedBorderTextFieldStyle())
 
                    TextField("Email", text: $email)

                        .padding()

                        .textFieldStyle(RoundedBorderTextFieldStyle())

                        .keyboardType(.emailAddress)

                        .autocapitalization(.none)
 
                    SecureField("Mot de passe", text: $password)

                        .padding()

                        .textFieldStyle(RoundedBorderTextFieldStyle())
 
                    SecureField("Confirmer le mot de passe", text: $confirmPassword)

                        .padding()

                        .textFieldStyle(RoundedBorderTextFieldStyle())

                }
 
                // Sélection du rôle

                VStack(alignment: .leading) {

                    Text("Sélectionnez un rôle:")

                        .font(.subheadline)

                        .foregroundColor(.gray)
 
                    Picker("Rôle", selection: $selectedRole) {

                        ForEach(UserRole.allCases, id: \.self) { role in

                            Text(role.roleName).tag(role)

                        }

                    }

                    .pickerStyle(SegmentedPickerStyle())

                }

                .padding()
 
                // Message d'erreur

                if !errorMessage.isEmpty {

                    Text(errorMessage)

                        .foregroundColor(.red)

                        .padding(.top, 10)

                }
 
                // Bouton d'inscription

                Button(action: {

                    registerUser()

                }) {

                    Text("S'inscrire")

                        .font(.headline)

                        .padding()

                        .frame(maxWidth: .infinity)

                        .background(Color(red: 0.2, green: 0.01, blue: 0.5))

                        .foregroundColor(.white)

                        .cornerRadius(10)

                        .padding(.top, 20)

                }
 
                // Lien vers connexion

                VStack {

                    Text("Vous avez déjà un compte?")

                        .padding(.top, 20)

                        .foregroundColor(.gray)
 
                    NavigationLink("Connectez-vous ici", destination: LoginView())

                }
 
                Spacer()

            }

            .padding()

            .background(

                NavigationLink(destination: destinationView(), isActive: $isUserRegistered) {

                    EmptyView()

                }

                .hidden()

            )

        }

    }
 
    private func registerUser() {

        // Validation

        guard !name.isEmpty, !email.isEmpty, !password.isEmpty, !confirmPassword.isEmpty else {

            errorMessage = "Tous les champs doivent être remplis."

            return

        }
 
        guard password == confirmPassword else {

            errorMessage = "Les mots de passe ne correspondent pas."

            return

        }
 
        let result = userManager.registerUser(name: name, email: email.lowercased(), password: password, role: selectedRole.rawValue)
 
        switch result {

        case .success(_):

            isUserRegistered = true

            errorMessage = ""

        case .failure(let error):

            let nsError = error as NSError

            errorMessage = "Erreur : \(nsError.localizedDescription)"

        }

    }
 
    private func destinationView() -> some View {

        switch selectedRole {

        case .admin:

            return AnyView(AdminView())

        case .technician:

            return AnyView(TechnicianView())

        case .employee:

            return AnyView(EmployeeView())

        }

    }

}
 
struct SignUpView_Previews: PreviewProvider {

    static var previews: some View {

        let context = PersistenceController.preview.container.viewContext

        let userManager = UserManager(context: context)

        return SignUpView()

            .environmentObject(userManager)

    }

}

 
