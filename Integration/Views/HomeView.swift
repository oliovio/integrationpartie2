//
//  HomeView.swift
//  Integration
//
//  Created by user268887 on 3/26/25.
//
import SwiftUI
 
struct HomeView: View {

    @State private var isAuthenticated: Bool = false

    @State private var destinationTag: String? = nil

    private let primaryColor = Color(red: 0.2, green: 0.01, blue: 0.5)

    var body: some View {

        NavigationView {

            VStack(spacing: 25) {

                Image("logo")

                    .resizable()

                    .scaledToFit()

                    .frame(width: 150, height: 150)

                    .padding(.top, 30)

                Text("Bienvenue sur")

                    .font(.title2)

                    .foregroundColor(.secondary)

                Text("CortextIT")

                    .font(.largeTitle)

                    .fontWeight(.bold)

                    .foregroundColor(primaryColor)

                VStack(spacing: 15) {

                    Button(action: {

                        destinationTag = "services"

                        isAuthenticated = true

                    }) {

                        Text("Découvrez nos différents services offerts")

                            .font(.headline)

                            .multilineTextAlignment(.center)

                            .padding()

                            .frame(maxWidth: .infinity)

                            .background(primaryColor)

                            .foregroundColor(.white)

                            .cornerRadius(10)

                    }
 
                    Button(action: {

                        destinationTag = "contact"

                        isAuthenticated = true

                    }) {

                        Text("Contactez-nous")

                            .font(.headline)

                            .padding()

                            .frame(maxWidth: .infinity)

                            .background(primaryColor)

                            .foregroundColor(.white)

                            .cornerRadius(10)

                    }

                }

                .padding(.horizontal)

                Spacer()

                VStack(spacing: 10) {

                    NavigationLink(destination: LoginView()) {

                        Text("Connectez-vous maintenant")

                            .foregroundColor(primaryColor)

                            .fontWeight(.semibold)

                    }
 
                    Text("Ou")

                        .foregroundColor(.gray)
 
                    NavigationLink(destination: SignUpView()) {

                        Text("Créez un nouveau compte")

                            .foregroundColor(.blue)

                    }

                }

                .padding(.bottom, 40)

                NavigationLink(

                    destination: selectedDestination(),

                    isActive: $isAuthenticated

                ) {

                    EmptyView()

                }

            }

            .padding()

        }

    }

    @ViewBuilder

    private func selectedDestination() -> some View {

        switch destinationTag {

        case "contact":

            ContactView() 

        case "services":

            ServicesView()

        default:

            EmptyView()

        }

    }

}

 
 
struct HomeView_Previews: PreviewProvider {

    static var previews: some View {

        HomeView()

    }

}

 
