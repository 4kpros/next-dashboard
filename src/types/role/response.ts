interface Role {
  key?: number;
  ID: number;
  Name: string;
  Description: string;
}
function newRole(id: number): Role {
  return {
    key: id,
    ID: id,
    Name: "role name",
    Description: "Description",
  };
}

function newRoleList(size: number): Array<Role> {
  return Array.from({ length: size }).map((_, index) => newRole(index));
}

export { type Role, newRole, newRoleList };
