export interface User {
    ID: number
    RoleId: number
    Email: string
    PhoneNumber: number
    IsActivated: boolean
    LoginMethod: string
    Provider?: string
    IsMfaEnabled: boolean
    CreatedAt?: Date
    UpdatedAt?: Date
}

export function NewUser(id: number): User {
    return {
        ID: id,
        RoleId: 1,
        Email:"prosper.abouar@gmail.com",
        PhoneNumber: 237690909090,
        IsActivated: true,
        LoginMethod: "default",
        IsMfaEnabled: false,
    }
}

export function NewUserList(size: number): Array<User> {
    return Array.from({length: size}).map((_, index) => (
        NewUser(index)
    ))
}
