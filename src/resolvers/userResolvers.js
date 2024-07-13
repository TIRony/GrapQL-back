const {
  deleteUser,
  updateUser,
  register,
  login,
  getAllUsers,
  getUserById,
} = require("../controllers/authController");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await getUserById(id);
    },
    getUsers: async () => {
      return await getAllUsers();
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      return await login(email, password);
    },
    createUser: async (_, { name, email, password }) => {
      return await register({ name, email, password });
    },
    updateUser: async (_, { id, name, email, password }) => {
      return await updateUser(id, { name, email, password });
    },
    deleteUser: async (_, { id }) => {
      return await deleteUser(id);
    },
  },
};

module.exports = resolvers;
