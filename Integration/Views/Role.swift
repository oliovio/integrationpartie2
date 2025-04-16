//
//  Role.swift
//  Integration
//
//  Created by user268887 on 4/9/25.
//

import Foundation
enum UserRole: Int64, CaseIterable, Identifiable {

    case admin = 0

    case technician = 1

    case employee = 2
 
    var id: Int64 { self.rawValue }
 
    var roleName: String {

        switch self {

        case .admin: return "Admin"

        case .technician: return "Technicien"

        case .employee: return "Employé"

        }

    }
 
    static func from(intValue: Int64) -> UserRole {

        return UserRole(rawValue: intValue) ?? .employee

    }

}

 
