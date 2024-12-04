interface User {
  key?: number;
  ID: number;
  RoleId: number;
  Email: string;
  PhoneNumber: number;
  IsActivated: boolean;
  LoginMethod: string;
  Provider?: string;
  IsMfaEnabled: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
function newUser(id: number): User {
  return {
    key: id,
    ID: id,
    RoleId: 1,
    Email: "prosper.abouar@gmail.com",
    PhoneNumber: 237690909090,
    IsActivated: true,
    LoginMethod: "default",
    IsMfaEnabled: false,
  };
}

function newUserList(size: number): Array<User> {
  return Array.from({ length: size }).map((_, index) => newUser(index));
}

export { type User, newUser, newUserList };
