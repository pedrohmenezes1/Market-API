const allRoles = {
  people: [],
  admin: ['getPeople', 'managePeople'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
