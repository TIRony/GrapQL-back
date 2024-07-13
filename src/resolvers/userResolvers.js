const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error("Error retrieving user");
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error("Error retrieving users");
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      try {
        const user = new User({ name, email, password });
        await user.save();

        const token = generateToken(user._id);
        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error("Error creating user: " + err.message);
      }
    },
    updateUser: async (_, { id, name, email, password }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { name, email, password },
          { new: true }
        );
        return user;
      } catch (err) {
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error("Error deleting user");
      }
    },
  },
};

module.exports = resolvers;
