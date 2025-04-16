//
//  ContactView.swift
//  Integration
//
//  Created by user268887 on 3/26/25.
//

import SwiftUI
 
struct ContactView: View {

    @State private var name = ""

    @State private var email = ""

    @State private var message = ""

    @State private var showAlert = false

    @State private var alertMessage = ""

    @State private var alertTitle = ""
 
    var body: some View {

        NavigationView {

            ScrollView {

                VStack(spacing: 20) {

                    Image("logo")

                        .resizable()

                        .scaledToFit()

                        .frame(width: 100, height: 100)

                        .padding(.top)
 
                    Text("Contactez-nous")

                        .font(.title)

                        .bold()
 
                    VStack(spacing: 15) {

                        TextField("Nom", text: $name)

                            .textFieldStyle(.roundedBorder)

                            .autocapitalization(.words)
 
                        TextField("Email", text: $email)

                            .textFieldStyle(.roundedBorder)

                            .keyboardType(.emailAddress)

                            .autocapitalization(.none)
 
                        TextEditor(text: $message)

                            .frame(height: 150)

                            .padding(4)

                            .overlay(

                                RoundedRectangle(cornerRadius: 8)

                                    .stroke(Color.gray.opacity(0.5), lineWidth: 1)

                            )

                    }

                    .padding()

                    .background(Color.gray.opacity(0.1))

                    .cornerRadius(12)
 
                    Button(action: handleSend) {

                        Text("Envoyer")

                            .frame(maxWidth: .infinity)

                            .padding()

                            .background(Color(red: 0.2, green: 0.01, blue: 0.5))

                            .foregroundColor(.white)

                            .cornerRadius(10)

                    }

                }

                .padding()

            }

            .navigationTitle("Contact")

            .navigationBarTitleDisplayMode(.inline)

            .alert(isPresented: $showAlert) {

                Alert(title: Text(alertTitle), message: Text(alertMessage), dismissButton: .default(Text("OK")))

            }

        }

    }
 
    private func handleSend() {

        if name.trimmingCharacters(in: .whitespaces).isEmpty ||

            email.trimmingCharacters(in: .whitespaces).isEmpty ||

            message.trimmingCharacters(in: .whitespaces).isEmpty {

            alertTitle = "Champs requis"

            alertMessage = "Veuillez remplir tous les champs."

            showAlert = true

            return

        }
 
        name = ""

        email = ""

        message = ""
 
        alertTitle = "Succès"

        alertMessage = "Message envoyé avec succès."

        showAlert = true

    }

}
 
struct ContactView_Previews: PreviewProvider {

    static var previews: some View {

        ContactView()

    }

}

 
